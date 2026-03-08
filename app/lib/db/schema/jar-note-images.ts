import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth";
import { jarNotes } from "./jar-notes";

export const jarNoteImages = sqliteTable("jarNoteImages", {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  jarNoteId: int().notNull().references(() => jarNotes.id),
  userId: int().notNull().references(() => user.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
