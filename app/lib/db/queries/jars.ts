import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import type { InsertJar } from "../schema";

import db from "..";
import { jars } from "../schema";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

export async function findAllJars(userId: number) {
  return db.query.jars.findMany({
    where: eq(jars.userId, userId),
  });
}

export async function findJarByName(existing: InsertJar, userId: number) {
  return db.query.jars.findFirst({
    where: and(
      eq(jars.name, existing.name),
      eq(jars.userId, userId),
    ),
  });
}

export async function findJarBySlug(slug: string) {
  return db.query.jars.findFirst({
    where: eq(jars.slug, slug),
  });
}

export async function findUniqueSlug(slug: string) {
  let existing = !!(await findJarBySlug(slug));
  while (existing) {
    const id = nanoid();
    const idSlug = `${slug}-${id}`;
    existing = !!(await findJarBySlug(idSlug));
    if (!existing) {
      return idSlug;
    }
  }
  return slug;
}

export async function insertJar(insertable: InsertJar, slug: string, userId: number) {
  const [created] = await db.insert(jars).values({
    ...insertable,
    slug,
    userId,
  }).returning();
  return created;
}
