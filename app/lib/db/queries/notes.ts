import { and, eq } from "drizzle-orm";

import type { InsertJarNote } from "../schema";

import db from "..";
import { jarNotes } from "../schema";

export async function insertJarNote(jarId: number, insertable: InsertJarNote, userId: number) {
  const [inserted] = await db.insert(jarNotes).values({
    ...insertable,
    jarId,
    userId,
  }).returning();

  return inserted;
}

export async function findNote(noteId: number, userId: number) {
  return db.query.jarNotes.findFirst({
    where: and(
      eq(jarNotes.id, noteId),
      eq(jarNotes.userId, userId),
    ),
  });
}

export async function removeNoteById(noteId: number, userId: number) {
  const [deleted] = await db.delete(jarNotes).where(
    and(
      eq(jarNotes.id, noteId),
      eq(jarNotes.userId, userId),
    ),
  ).returning();
  return deleted;
}
