import type { DrizzleError } from "drizzle-orm";

import { InsertShelf } from "~/lib/db/schema";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

import { findShelfByName, insertShelf } from "../../app/lib/db/queries/shelves";

export default defineAuthenticatedEventHandler(async (event) => {
  const result = await readValidatedBody(event, InsertShelf.safeParse);

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

  const existingShelf = await findShelfByName(result.data, event.context.user.id);
  if (existingShelf) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A shelf with that name already exists.",
    }));
  }

  try {
    return insertShelf(result.data, event.context.user.id);
  }
  catch (e) {
    const error = e as DrizzleError;
    throw error;
  }
});
