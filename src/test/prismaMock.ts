import { mockDeep, mockReset, type DeepMockProxy } from "vitest-mock-extended";
import { beforeEach } from "vitest";

import { prisma } from "../lib/prisma.ts";
import { PrismaClient } from "../generated/prisma/client.ts";

// 3. Export the mock with the correct type
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

// 2. Reset the mock before each test
beforeEach(() => {
  mockReset(prismaMock);
});
