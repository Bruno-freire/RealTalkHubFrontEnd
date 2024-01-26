import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod'
import userServices from './app/lib/userServices';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email().trim(), password: z.string().min(8).trim() })
          .safeParse(credentials);
        
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await userServices.login({email, password});
          
          if(!user) return null;

          return user
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});