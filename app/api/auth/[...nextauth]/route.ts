import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import Credentials  from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
          email: {label: 'Email', type: 'email',placeholder: 'email'},
          password: {label: 'Password', type: 'password',placeholder: 'password'}
      },
      async authorize(credentials,req) {
          if (!credentials?.email || !credentials?.password) return null;
          const user = await prisma.user.findUnique({
              where: {email: credentials.email}
          })
          if(!user) return null;

          const passwordsMatch = await bcrypt.compare(credentials.password , user.hashedPassword!);

          return passwordsMatch ? user : null;
      }
  }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
