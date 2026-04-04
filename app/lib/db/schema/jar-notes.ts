import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

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

export const JarNotesRelations = relations(jarNotes, ({ one }) => ({
  jar: one(jars, {
    fields: [jarNotes.jarId],
    references: [jars.id],
  }),
}));

const BaseInsertJarNote = createInsertSchema(jarNotes, {
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional().nullable(),
}).omit({
  id: true,
  userId: true,
  jarId: true,
  createdAt: true,
  updatedAt: true,
});

export const InsertJarNote = BaseInsertJarNote.superRefine((values, context) => {
  if (values.startedAt > values.endedAt || values.endedAt < values.startedAt) {
    context.addIssue({
      code: "custom",
      message: "Start date must be before end date",
      path: ["startedAt"],
    });
    context.addIssue({
      code: "custom",
      message: "End date must be after start date",
      path: ["endedAt"],
    });
  }
});

export type SelectJarNote = typeof jarNotes.$inferSelect;
export type InsertJarNote = z.infer<typeof InsertJarNote>;
