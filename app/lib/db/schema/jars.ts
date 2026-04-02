import { relations } from "drizzle-orm";
import { int, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import type { SelectJarNote } from "./jar-notes";

import { user } from "./auth";
import { jarNotes } from "./jar-notes";
import { shelves } from "./shelves";

export const jars = sqliteTable("jars", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  shelf: int().references(() => shelves.id),
  userId: int().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
}, t => [
  unique().on(t.name, t.userId),
]);

export const InsertJar = createInsertSchema(jars, {
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional().nullable(),
}).pick({
  name: true,
  description: true,
});

export const JarsRelations = relations(jars, ({ one, many }) => ({
  shelf: one(shelves),
  jarNotes: many(jarNotes),
}));

export type InsertJar = z.infer<typeof InsertJar>;
export type SelectJar = typeof jars.$inferSelect;
export type SelectJarWithNotes = SelectJar & {
  jarNotes: SelectJarNote[];
};
