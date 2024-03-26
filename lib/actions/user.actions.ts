"use server";
import User from "../database/user.models";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../database/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { Error } from "mongoose";

const saltRounds = 10;
const saltRoundsRandom = bcrypt.genSaltSync(saltRounds);

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  try {
    await connectToDatabase();
    const encryptedPassword = await bcrypt.hash(password, saltRoundsRandom);
    const user = await User.create({
      name,
      email,
      picture: "",
      password: encryptedPassword,
    });
    const userData = JSON.parse(JSON.stringify(user));
    return userData;
  } catch (err) {
    console.log(err);
    throw new Error("Error creating user");
  }
}

export async function findUserByEmail(email: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({
      email,
    }).lean();
    return user;
  } catch (err) {
    throw new Error("Error finding user by email");
  }
}

export async function signInAction(
  credentials: Record<"email" | "password", string> | undefined,
) {
  if (!credentials) throw new Error("Missing credentials");
  const { email, password } = credentials;
  if (!email || !password) throw new Error("Missing email or password");
  const userFound = await findUserByEmail(email);
  if (!userFound || !userFound.password) {
    return null;
  }
  const isAuthenticated = await bcrypt.compareSync(
    password,
    userFound.password,
  );
  if (!isAuthenticated) return null;
  if (isAuthenticated) return userFound;
  return userFound;
}

export async function userUpdate(values: any, imgUrl: string | any) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);
    console.log("session", session?.user.id);
    if (!session?.user.id) throw new Error("You are not logged in!");
    const id = session?.user.id;
    console.log("URL from new next-cloudinary", imgUrl);
    const { name, portfolio, goals, levels, stack, available, start, end } =
      values;
    console.log(id);
    const user = await User.findOneAndUpdate(
      { id },
      {
        name,
        picture: imgUrl,
        portfolio,
        goals,
        levels,
        stack,
        available,
        start,
        end,
        onboardingCompleted: true,
      },
      { new: true },
    ).lean();
    console.log("user returned from mongo db", user);
    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    console.log(err);
    throw new Error("Error updating user");
  }
}
