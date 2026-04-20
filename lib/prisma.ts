import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Singleton Prisma Client (anti reconnect issue di Vercel)
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}