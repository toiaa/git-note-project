import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "@/lib/actions/user.actions";
import bcrypt from "bcrypt";
if (!process.env.AUTH_SECRET) throw new Error("Please provide an auth secret");
if (!process.env.GITHUB_ID) throw new Error("Please provide an auth secret");
if (!process.env.GITHUB_SECRET)
  throw new Error("Please provide an auth secret");
if (!process.env.GOOGLE_ID) throw new Error("Please provide an auth secret");
if (!process.env.GOOGLE_SECRET)
  throw new Error("Please provide an auth secret");
export const authOptions = {
  // Configure one or more authentication providers
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
        username: {
          label: "Username",
          type: "text",
          placeholder: "user@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;
        if (!username || !password)
          throw new Error("Missing email or password");
        const userFound = await findUserByEmail({ email: username });
        if (!userFound) {
          console.log("userFound", userFound);
          throw new Error("User not found");
        }
        const isAuthenticated = await bcrypt.compareSync(
          password,
          userFound.password,
        );
        if (!isAuthenticated) return null;
        if (isAuthenticated) return userFound;
        return userFound;
      },
    }),
  ],
  /*  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log values and check which provider is the one im using and decide what to do in the callback
      // if user exists
      // if user is new
      // create user without password(google, github)
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // ALLOWED TO SIGN IN
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  }, */
  pages: {
    signIn: "/login",
    signUp: "/signup",
  },
};

export default NextAuth(authOptions);
