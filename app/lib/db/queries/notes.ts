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
