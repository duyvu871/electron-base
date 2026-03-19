import { app } from 'electron'
import Database from 'better-sqlite3'
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { existsSync } from 'node:fs'
import { isAbsolute, join, resolve } from 'node:path'
import 'bindings'
import 'file-uri-to-path'

import * as schema from './schema'

type DatabaseBundle = {
    sqlite: Database.Database
    db: BetterSQLite3Database<typeof schema>
    dbPath: string
}

let databaseBundle: DatabaseBundle | null = null

const parseFileDatabaseUrl = (databaseUrl: string): string => {
    if (!databaseUrl.startsWith('file:')) {
        throw new Error(`DATABASE_URL must use SQLite file: scheme. Received: ${databaseUrl}`)
    }

    const rawPath = databaseUrl.slice(5)
    if (!rawPath) {
        throw new Error('DATABASE_URL file path is empty.')
    }

    if (rawPath === ':memory:') {
        return rawPath
    }

    return isAbsolute(rawPath) ? rawPath : resolve(process.cwd(), rawPath)
}

const resolveRuntimeDatabasePath = (): string => {
    if (process.env.DATABASE_URL) {
        return parseFileDatabaseUrl(process.env.DATABASE_URL)
    }

    return join(app.getPath('userData'), 'app.db')
}

const resolveMigrationsFolder = (): string => {
    const devMigrationsPath = resolve(process.cwd(), 'drizzle')
    if (!app.isPackaged) {
        return devMigrationsPath
    }

    return join(process.resourcesPath, 'drizzle')
}

export const initializeDatabase = (): DatabaseBundle => {
    if (databaseBundle) {
        return databaseBundle
    }

    const dbPath = resolveRuntimeDatabasePath()
    const sqlite = new Database(dbPath)
    sqlite.pragma('journal_mode = WAL')
    sqlite.pragma('foreign_keys = ON')

    const db = drizzle(sqlite, { schema })
    const migrationsFolder = resolveMigrationsFolder()
    if (!existsSync(migrationsFolder)) {
        throw new Error(`Drizzle migrations folder not found at: ${migrationsFolder}`)
    }

    migrate(db, { migrationsFolder })
    databaseBundle = { sqlite, db, dbPath }

    return databaseBundle
}

export const getDatabase = (): DatabaseBundle => {
    if (!databaseBundle) {
        throw new Error('Database has not been initialized. Call initializeDatabase() first.')
    }

    return databaseBundle
}

export const getDatabaseHealth = (): { path: string; healthy: boolean } => {
    const { sqlite, dbPath } = getDatabase()
    const result = sqlite.prepare('SELECT 1 AS ok').get() as { ok: number }

    return {
        path: dbPath,
        healthy: result.ok === 1
    }
}

export const closeDatabase = (): void => {
    if (!databaseBundle) {
        return
    }

    databaseBundle.sqlite.close()
    databaseBundle = null
}
