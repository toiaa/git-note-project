import mongoose from "mongoose";

let isConnected = false;
export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) throw new Error("Missing MONGODB_URL");
  if (isConnected) {
    console.log("Mongo DB is connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "gitNote",
    });
    isConnected = true;
    console.log("MongoDB connected succesfully :)");
  } catch (error) {
    console.log(`Error with db connection: ${error}`);
  }
};
