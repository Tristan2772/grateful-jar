import { findJarByName, updateJarBySlug } from "~/lib/db/queries/jars";
import { findShelfById } from "~/lib/db/queries/shelves";
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
    return createError({
      statusCode: 409,
      statusMessage: "A jar with that name already exists",
    });
  }

  if (typeof result.data.shelf === "number") {
    const shelf = await findShelfById(result.data.shelf, event.context.user.id);
    if (!shelf) {
      return createError({
        statusCode: 400,
        statusMessage: "Invalid shelf selected",
      });
    }
  }

  return updateJarBySlug(result.data, slug, event.context.user.id);
});
