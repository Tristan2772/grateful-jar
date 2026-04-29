import { findShelfByName, updateShelfById } from "~/lib/db/queries/shelves";
import { InsertShelf } from "~/lib/db/schema";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";
import sendZodError from "~/utils/send-zod-error";

export default defineAuthenticatedEventHandler(async (event) => {
  const shelfId = Number(getRouterParam(event, "id"));
  const result = await readValidatedBody(event, InsertShelf.safeParse);

  if (!result.success) {
    return sendZodError(event, result.error);
  }

  const existingShelf = await findShelfByName(result.data, event.context.user.id);
  if (existingShelf && existingShelf.id !== shelfId) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A shelf with that name already exists",
    }));
  }

  return updateShelfById(result.data, shelfId, event.context.user.id);
});
