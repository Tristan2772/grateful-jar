import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";
import { jars } from "./jars";

export const jarNotes = sqliteTable("jarNotes", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  startedAt: int().notNull(),
  endedAt: int().notNull(),
  jarId: int().notNull().references(() => jars.id),
  userId: int().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
