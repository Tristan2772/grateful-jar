import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  event.context.user = session?.user;

  const protectedRoutes = ["/dashboard"];

  const isProtected = protectedRoutes.some(route =>
    event.path.startsWith(route),
  );

  if (isProtected) {
    if (!session?.user) {
      await sendRedirect(event, "/", 302);
    }
  }
});
