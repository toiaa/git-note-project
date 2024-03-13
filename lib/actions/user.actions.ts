"use server";
import User from "../database/user.models";
import bcrypt from "bcrypt";

import { connectToDatabase } from "../database/mongoose";

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
    });
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
  if (!userFound) {
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
