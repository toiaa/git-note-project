import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail, signInAction } from "@/lib/actions/user.actions";
import User from "../database/user.models";

if (!process.env.AUTH_SECRET) throw new Error("Please provide an auth secret");
if (!process.env.GITHUB_ID) throw new Error("Please provide an auth secret");
if (!process.env.GITHUB_SECRET)
  throw new Error("Please provide an auth secret");
if (!process.env.GOOGLE_ID) throw new Error("Please provide an auth secret");
if (!process.env.GOOGLE_SECRET)
  throw new Error("Please provide an auth secret");

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await signInAction(credentials);
        if (!user) return null;
        return { ...user, id: user._id };
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (token.id) return token;
      const ourUser = await User.findOne({ email: token.email });
      if (ourUser) {
        token.id = ourUser.id;
      }

      return token;
    },
    async session({ session, token }) {
      console.log(token);
      // define type here and in the functiom below
      if (!session.user) return session;

      const ourUser = await User.findById(token.id);

      if (!ourUser) return session;
      if (!ourUser?.picture) return session;
      session.user.image = ourUser?.picture;
      session.user.name = ourUser?.name;
      session.user.email = ourUser?.email;

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // define type here
      console.log({
        user,
        account,
        profile,
        email,
        credentials,
      }); // delete
      try {
        if (account?.provider === "github" || account?.provider === "google") {
          if (!profile) return false;

          const { email, name, image } = profile;

          if (!email) return false;

          const userFound = await findUserByEmail(email);
          if (!userFound) {
            const userCreated = await User.create({
              email,
              name,
              image,
            });
            if (!userCreated) {
              return false;
            }
            return true;
          }
          return true;
        }
        return true;
      } catch (error) {
        console.error("Error on sign in callback", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
