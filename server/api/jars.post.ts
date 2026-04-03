import type { DrizzleError } from "drizzle-orm";

import slugify from "slug";

import { InsertJar } from "~/lib/db/schema";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

import { findJarByName, findUniqueSlug, insertJar } from "../../app/lib/db/queries/jars";
import sendZodError from "../../app/utils/send-zod-error";

export default defineAuthenticatedEventHandler(async (event) => {
  const result = await readValidatedBody(event, InsertJar.safeParse);

  if (!result.success) {
    return sendZodError(event, result.error);
  }

  const existingJar = await findJarByName(result.data, event.context.user.id);
  if (existingJar) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A jar with that name already exists",
    }));
  }

  const slug = await findUniqueSlug(slugify(result.data.name));

  try {
    return insertJar(result.data, slug, event.context.user.id);
  }
  catch (e) {
    const error = e as DrizzleError;
    if (error.message === "SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: jars.slug") {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: "Slug must be unique (the slug is generated using the jar name).",
      }));
    }
    throw error;
  }
});
