import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod'
import server from './app/lib/userServices';

 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await server.login({email, password});

          if(!user) throw new AuthError({message: "Invalid credentials"});
          return user
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});