import { findAllJars } from "~/lib/db/queries/jars";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  return findAllJars(event.context.user.id);
});
