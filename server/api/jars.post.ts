import type { DrizzleError } from "drizzle-orm";

import slugify from "slug";

import { InsertJar } from "~/lib/db/schema";

import { findJarByName, findUniqueSlug, insertJar } from "../../app/lib/db/queries/jars";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }
  const result = await readValidatedBody(event, InsertJar.safeParse);

  if (!result.success) {
    const statusMessage = result
      .error
      .issues
      .map(issue => `${issue.path.join("")}: ${issue.message}`)
      .join("; ");

    const data = result
      .error
      .issues
      .reduce((errors, issue) => {
        errors[issue.path.join("")] = issue.message;
        return errors;
      }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  const existingJar = await findJarByName(result.data, event.context.user.id);
  if (existingJar) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A location with that name already exists",
    }));
  }

  const slug = await findUniqueSlug(slugify(result.data.name));

  try {
    return insertJar(result.data, slug, event.context.user.id);
  }
  catch (e) {
    const error = e as DrizzleError;
    if (error.message === "SQLITE_CONSTRAINT: SQLite error: UNIQUE constraint failed: location.slug") {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: "Slug must be unique (the slug is generated using the jar name).",
      }));
    }
    throw error;
  }
});
