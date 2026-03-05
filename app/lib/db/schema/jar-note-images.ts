import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { jarNotes } from "./jar-notes";

export const jarNoteImages = sqliteTable("jarNoteImages", {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull(),
  jarNoteId: int().notNull().references(() => jarNotes.id),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
