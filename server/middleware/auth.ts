import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  const protectedRoutes = ["/dashboard"];

  const isProtected = protectedRoutes.some(route =>
    event.path.startsWith(route),
  );

  if (isProtected) {
    const session = await auth.api.getSession({
      headers: event.headers,
    });
    if (!session?.user) {
      await sendRedirect(event, "/", 302);
    }
  }
});
