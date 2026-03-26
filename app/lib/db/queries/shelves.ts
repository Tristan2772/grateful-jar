import { and, eq } from "drizzle-orm";

import type { InsertShelf } from "../schema";

import db from "..";
import { shelves } from "../schema";

export async function findAllShelves(userId: number) {
  return db.query.shelves.findMany({
    where: eq(shelves.userId, userId),
  });
}

export async function findShelfByName(existing: InsertShelf, userId: number) {
  return db.query.shelves.findFirst({
    where: and(
      eq(shelves.name, existing.name),
      eq(shelves.userId, userId),
    ),
  });
}

export async function insertShelf(insertable: InsertShelf, userId: number) {
  const [created] = await db.insert(shelves).values({
    ...insertable,
    userId,
  }).returning();
  return created;
}
