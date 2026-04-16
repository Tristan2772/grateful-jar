import { removeNoteById } from "~/lib/db/queries/notes";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const deleted = await removeNoteById(Number(id), event.context.user.id);

  if (!deleted) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: "Note not found",
    }));
  }

  setResponseStatus(event, 204);
});
