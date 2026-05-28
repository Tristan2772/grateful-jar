import { findShelfById } from "~/lib/db/queries/shelves";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const shelfId = Number(getRouterParam(event, "id"));
  const shelf = await findShelfById(shelfId, event.context.user.id);
  if (!shelf) {
    return createError({
      statusCode: 404,
      statusMessage: "Shelf not found.",
    });
  }

  return shelf;
});
