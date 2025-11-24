import request from "supertest";
import { it, expect, describe, vi } from "vitest";
import { PrismaClient } from "../generated/prisma/client";
import { mockDeep } from "vitest-mock-extended";

// Mock must be defined BEFORE importing app/prisma
vi.mock("../lib/prisma.ts", () => ({
  __esModule: true,
  prisma: mockDeep<PrismaClient>(),
}));

import app from "../app";
import { prismaMock } from "../test/prismaMock";
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
      bio: null,
      skillLevel: "BEGINNER" as const,
      codingHours: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue(newUser);

    const res = await request(app).post("/api/v1/users").send({
      email: "test@example.com",
      password: "password123",
    });
    console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email", "test@example.com");
  });
});
