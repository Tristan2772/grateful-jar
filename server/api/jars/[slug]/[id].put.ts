import { findNoteByName, updateNoteById } from "~/lib/db/queries/notes";
import { InsertJarNote } from "~/lib/db/schema";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";
import sendZodError from "~/utils/send-zod-error";

export default defineAuthenticatedEventHandler(async (event) => {
  const noteId = Number(getRouterParam(event, "id"));
  const result = await readValidatedBody(event, InsertJarNote.safeParse);

  if (!result.success) {
    return sendZodError(event, result.error);
  }

  const existingNote = await findNoteByName(result.data, event.context.user.id);
  if (existingNote && existingNote.id !== noteId) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A note with that name already exists",
    }));
  }

  return updateNoteById(result.data, noteId, event.context.user.id);
});
