import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

console.log("=== PRISMA DEBUG ===");
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

console.log("Prisma adapter created");

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

console.log("Prisma client created");

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}