import type { NextAuthConfig } from 'next-auth';

/*
You can use the `pages` option to specify the route for custom sign-in, sign-out, and error pages.

This is not required,
but [the next statement causes] the user [to] be redirected to our custom login page,
rather than the NextAuth.js default page.
*/
export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
} satisfies NextAuthConfig;
