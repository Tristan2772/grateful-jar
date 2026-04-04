import { removeJarBySlug } from "~/lib/db/queries/jars";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug") as string;

  const deleted = await removeJarBySlug(slug, event.context.user.id);

  if (!deleted) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: "Jar not found",
    }));
  }

  setResponseStatus(event, 204);
});
