import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const appSettingsTable = sqliteTable('app_settings', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    key: text('key').notNull().unique(),
    value: text('value').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull()
})

export type AppSetting = typeof appSettingsTable.$inferSelect
export type NewAppSetting = typeof appSettingsTable.$inferInsert
