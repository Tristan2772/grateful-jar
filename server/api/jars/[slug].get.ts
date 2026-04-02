import { findJar } from "~/lib/db/queries/jars";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const slug = getRouterParam(event, "slug") as string;
  const jar = await findJar(slug, event.context.user.id);
  if (!jar) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: "Jar not found.",
    }));
  }

  return jar;
});
