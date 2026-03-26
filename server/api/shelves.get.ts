import { findAllShelves } from "~/lib/db/queries/shelves";
import defineAuthenticatedEventHandler from "~/utils/define-authenticated-event-handler";

export default defineAuthenticatedEventHandler(async (event) => {
  return findAllShelves(event.context.user.id);
});
