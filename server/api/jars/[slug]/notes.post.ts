import { findJar } from "~/lib/db/queries/jars";
import { insertJarNote } from "~/lib/db/queries/notes";
import { InsertJarNote } from "~/lib/db/schema";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";
import sendZodError from "~/utils/send-zod-error";

export default defineAuthenticatedEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug") as string;
  const jar = await findJar(slug, event.context.user.id);
  if (!jar) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: "Jar not found.",
    }));
  }

  const result = await readValidatedBody(event, InsertJarNote.safeParse);

  if (!result.success) {
    return sendZodError(event, result.error);
  }

  return insertJarNote(jar.id, result.data, event.context.user.id);
});
