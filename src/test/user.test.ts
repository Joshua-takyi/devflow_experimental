import request from "supertest";
import { it, expect, describe, vi } from "vitest";
import { PrismaClient } from "../generated/prisma/client";
import { mockDeep } from "vitest-mock-extended";
// Mock must be defined BEFORE importing app/prisma
vi.mock("../lib/prisma.ts", () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

vi.mock("../utils/security.ts", () => ({
  __esModule: true,
  ComparePassword: vi.fn(),
  HashPassword: vi.fn(),
}));

import app from "../app";
import { prismaMock } from "../test/prismaMock";
import { ComparePassword, HashPassword } from "../utils/security";
describe("user authentication", () => {
  it("should return 201 when the user is created successfully", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body).toBe("api is healthy");
  });

  it("should create a user to the database", async () => {
    const newUser = {
      id: "1",
      email: "test@example.com",
      password: "hashedPassword",
      firstName: null,
      lastName: null,
      phone: null,
      avatar: null,
      bio: null,
      skillLevel: "BEGINNER" as const,
      codingHours: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue(newUser);
    (HashPassword as any).mockResolvedValue("hashedPassword");

    const res = await request(app).post("/api/v1/users").send({
      email: "test@example.com",
      password: "PASSword123!",
    });
    console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email", "test@example.com");
  });

  it("should return 400 when the user already exists", async () => {
    const existingUser = {
      id: "1",
      email: "test@example.com",
      password: "HASHEDpassword123!",
      firstName: null,
      lastName: null,
      phone: null,
      bio: null,
      skillLevel: "BEGINNER" as const,
      codingHours: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    prismaMock.user.findUnique.mockResolvedValue(existingUser);

    const res = await request(app).post("/api/v1/users").send({
      email: "test@example.com",
      password: "HASHEDpassword123!",
    });
    expect(res.status).toBe(409);
    expect(res.body).toHaveProperty("message", "User already exists");
  });

  it("should return invalid email format", async () => {
    const res = await request(app).post("/api/v1/users").send({
      email: "testexample",
      password: "HASHEDpassword123!",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors", [
      { field: "email", message: "Invalid email address" },
    ]);
  });

  it("should return user sign in successfully", async () => {
    const existingUser = {
      id: "1",
      email: "test@example.com",
      password: "HASHEDpassword123!",
      firstName: null,
      lastName: null,
      phone: null,
      bio: null,
      skillLevel: "BEGINNER" as const,
      codingHours: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.user.findUnique.mockResolvedValue(existingUser);
    (ComparePassword as any).mockResolvedValue(true);

    const req = await request(app).post("/api/v1/users/login").send({
      email: "test@example.com",
      password: "HASHEDpassword123!",
    });
    console.log(req.body);
    expect(req.status).toBe(200);
    expect(req.body).toHaveProperty("id");
    expect(req.body).toHaveProperty("email", "test@example.com");
  });

  it("should return user update successfully", async () => {
    const existingUser = {
      id: "1",
      email: "test@example.com",
      password: "HASHEDpassword123!",
      firstName: null,
      lastName: null,
      avatar: null,
      phone: null,
      bio: null,
      skillLevel: "BEGINNER" as const,
      codingHours: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.user.findUnique.mockResolvedValue(existingUser);
    (ComparePassword as any).mockResolvedValue(true);

    const req = await request(app).post("/api/v1/users/profile").send({
      id: "1",
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      bio: "I am a developer",
    });
    console.log(req.body);
    expect(req.status).toBe(200);
    expect(req.body).toHaveProperty("id");
    expect(req.body).toHaveProperty("email", "test@example.com");
  });
});
