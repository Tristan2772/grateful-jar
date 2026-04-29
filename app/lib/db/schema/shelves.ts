import { relations } from "drizzle-orm";
import { int, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { user } from "./auth";
import { jars } from "./jars";

export const shelves = sqliteTable("shelves", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  userId: int().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
}, t => [
  unique().on(t.name, t.userId),
]);

export const InsertShelf = createInsertSchema(shelves, {
  name: z.string().min(1).max(100),
}).pick({
  name: true,
});

export type InsertShelf = z.infer<typeof InsertShelf>;
export type SelectShelf = typeof shelves.$inferSelect;

export const shelvesRelations = relations(shelves, ({ many }) => ({
  jars: many(jars),
}));
