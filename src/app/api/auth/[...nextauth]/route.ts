import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

async function authorizeUser(userId: string, password: string) {
  if (userId != "admin") {
    throw new Error("Wrong credentials.");
  }
  const isPasswordValid = await bcrypt.compare(
    password,
    "$2b$12$58nZrqlWQecZC6D8saKakuxiEScvSDjUhLYi/YJyXVMNmxETq21vq"
  );
  if (!isPasswordValid) {
    throw new Error(`Wrong credentials.`);
  }
  return { name: "admin", id: "1" };
}

const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: { label: "User ID", placeholder: "ID goes here", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials?.userId && credentials?.password) {
          try {
            const user = await authorizeUser(
              credentials?.userId,
              credentials?.password
            );
            revalidatePath("/");
            return user;
          } catch (error) {
            throw error;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.name = token.name;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
