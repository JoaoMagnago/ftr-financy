import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { env } from '../../config/env.js'

const adapter = new PrismaBetterSqlite3({
  url: env.databaseUrl,
})

const globalForPrisma = globalThis as {
  prisma?: PrismaClient
}

export const prismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prismaClient
}
