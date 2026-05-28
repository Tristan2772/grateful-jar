import { deleteShelfById } from "~/lib/db/queries/shelves";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const deleted = await deleteShelfById(Number(id), event.context.user.id);

  if (!deleted) {
    throw createError({
      statusCode: 404,
      statusMessage: "Shelf not found",
    });
  }

  setResponseStatus(event, 204);
});
