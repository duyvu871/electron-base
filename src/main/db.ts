import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '@prisma/client'
import { app } from 'electron'
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'

let prisma: PrismaClient | null = null

const resolveDatabaseUrl = (): string => {
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL
    }

    const dbDirectory = join(app.getPath('userData'), 'db')

    if (!existsSync(dbDirectory)) {
        mkdirSync(dbDirectory, { recursive: true })
    }

    return `file:${join(dbDirectory, 'app.db')}`
}

export const getPrisma = (): PrismaClient => {
    if (prisma) {
        return prisma
    }

    const adapter = new PrismaBetterSqlite3({
        url: resolveDatabaseUrl()
    })

    prisma = new PrismaClient({ adapter })

    return prisma
}

export const initializeDatabase = async (): Promise<void> => {
    const client = getPrisma()

    await client.$connect()

    const tableExists = await client.$queryRaw<Array<{ name: string }>>`
            SELECT name
            FROM sqlite_master
            WHERE type = 'table' AND name = 'AppSetting'
        `

    if (tableExists.length === 0) {
        await client.$executeRawUnsafe(`
                    CREATE TABLE IF NOT EXISTS "AppSetting" (
                        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                        "key" TEXT NOT NULL,
                        "value" TEXT NOT NULL,
                        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                    )
                `)

        await client.$executeRawUnsafe(`
                    CREATE UNIQUE INDEX IF NOT EXISTS "AppSetting_key_key"
                    ON "AppSetting"("key")
                `)
    }
}

export const getAppSetting = async (key: string): Promise<string | null> => {
    const client = getPrisma()
    const setting = await client.appSetting.findUnique({ where: { key } })

    return setting?.value ?? null
}

export const setAppSetting = async (key: string, value: string): Promise<void> => {
    const client = getPrisma()

    await client.appSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
    })
}

export const disconnectDatabase = async (): Promise<void> => {
    if (!prisma) {
        return
    }

    await prisma.$disconnect()
    prisma = null
}
