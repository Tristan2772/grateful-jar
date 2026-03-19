import { int, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { user } from "./auth";

export const jars = sqliteTable("jars", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  // startedAt: int(),
  // endedAt: int(),
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

export type InsertJar = z.infer<typeof InsertJar>;
