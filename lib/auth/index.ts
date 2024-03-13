import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail, signInAction } from "@/lib/actions/user.actions";
import User from "../database/user.models";
import { SessionType } from "@/types/next-auth";

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
        const authentication = await signInAction(credentials);
        return authentication;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    async session({ session }: { session: SessionType }) {
      // define type here and in the functiom below
      session.user.test = "test";
      // save more data from user to session here

      return session;
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      // define type here
      console.log({
        user,
        account,
        profile,
        email,
        credentials,
      }); // delete
      try {
        if (account.provider === "github" || account.provider === "google") {
          const { email, name } = profile;
          const userFound = await findUserByEmail(email);
          if (!userFound) {
            const userCreated = await User.create({
              email,
              name,
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
