import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";

export const jars = sqliteTable("jars", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  userId: int().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
