import type { jars } from "~/lib/db/schema/jars";

import type { userWithId } from "./auth";

declare module "h3" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: userWithId;
  }
}

export type Jar = typeof jars.$inferSelect;
// export type Jar = {
//   id: number;
//   name: string;
//   description: string | null;
//   to?: RouteLocationRaw;
// };
