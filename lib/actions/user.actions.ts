"use server";
import User from "../database/user.models";
import bcrypt from "bcrypt";

import { connectToDatabase } from "../database/mongoose";

const saltRounds = 10;
const saltRoundsRandom = bcrypt.genSaltSync(saltRounds);

export async function createUser(
  fullName: string,
  email: string,
  password: string,
) {
  console.log("GOT VALUES in actions", email, password, fullName);
  try {
    await connectToDatabase();
    const encryptedPassword = await bcrypt.hash(password, saltRoundsRandom);
    const user = await User.create({
      fullName,
      email,
      password: encryptedPassword,
    });
    return user;
  } catch (err) {
    console.log(`error creating user: ${err}`);
    throw new Error("Error creating user");
  }
}

export async function findUserByEmail(email: string) {
  console.log(email, "GOT email, password, in actions, find");

  try {
    await connectToDatabase();
    const user = await User.findOne({
      email,
    });
    return user;
  } catch (err) {
    console.log(`error finding user by email: ${err}`);
    throw new Error("Error finding user by email");
  }
}
