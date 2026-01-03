import mongoose from "mongoose";
import { KEYS } from "../config/keys.js";

export async function connectDb() {
  if (!KEYS.mongodb.uri || KEYS.mongodb.uri.includes("USERNAME:PASSWORD")) {
    console.warn("[DB] Please set KEYS.mongodb.uri in apps/api/src/config/keys.js");
  }
  mongoose.set("strictQuery", true);
  await mongoose.connect(KEYS.mongodb.uri);
  console.log("[DB] connected");
}
