import { findJarByName, updateJarBySlug } from "~/lib/db/queries/jars";
import { InsertJar } from "~/lib/db/schema";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";
import sendZodError from "~/utils/send-zod-error";

export default defineAuthenticatedEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug") as string;
  const result = await readValidatedBody(event, InsertJar.safeParse);

  if (!result.success) {
    return sendZodError(event, result.error);
  }

  const existingJar = await findJarByName(result.data, event.context.user.id);
  if (existingJar && existingJar.slug !== slug) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "A jar with that name already exists",
    }));
  }

  return updateJarBySlug(result.data, slug, event.context.user.id);
});
