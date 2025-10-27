import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI)
  throw new Error(
    "provide database connection uri in .env.<development/production>.local"
  );

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(`connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("error connection to database", error);
  }
};
