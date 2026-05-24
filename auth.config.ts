import type { NextAuthConfig } from 'next-auth';

/*
You can use the `pages` option to specify the route for custom sign-in, sign-out, and error pages.

This is not required,
but [the next statement causes] the user [to] be redirected to our custom login page,
rather than the NextAuth.js default page.
*/
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    /*
    The following function is used to verify if the request is authorized to access a page with [Next.js Proxy](
      https://nextjs.org/docs/app/api-reference/file-conventions/proxy
    ).

    It is called before a request is completed,
    and it receives an object with the destructured properties.
    (
    The `auth` property contains the user's session,
    and the `request` property contains the incoming request.
    )
    */
    authorized({
      auth,
      request: { nextUrl },
    }) {
      // Explicitly convert the optional user object to a boolean -
      // by using «the dobule bang operator» aka «the double NOT operator» in JavaScript/TypeScript.
      // (
      // Recall:
      // The `?.` is «optional chaining» —
      // it safely accesses `user` without throwing an error if `auth` is `null`/`undefined`.
      // )
      const isLoggedIn = !!auth?.user;

      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      
      return true;
    },
  },
  /*
  The following array specifies different login options.
  */
  providers: [],
} satisfies NextAuthConfig;
