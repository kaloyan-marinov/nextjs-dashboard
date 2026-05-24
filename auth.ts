/*
[This project's mechanism for] seeding [the] database
[utilizes] a package called `bcrypt` to hash the user's password before storing it in the database.

[That same package will be used to verify] that
the password entered by the user matches the one in the database.

[This] separate file for the `bcrypt` package [needs to be created,]
because `bcrypt` relies on Node.js APIs not available in Next.js Proxy.
*/

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
      },
    }),
  ],
});
