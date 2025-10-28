import mongoose from "mongoose";
import User from "../models/user.model.js";

export const signUpHandler = async (req, res, next) => {
  const session = mongoose.startSession();

  (await session).startTransaction();

  try {
    const { name, email, password } = req.body;

    const existingUser = User.findOne({ email });

    if (existingUser) throw new Error("User already exist. Try login in");

    // const newUser = User.create([{ name, email, password: hashedPassword }], {
    //   session,
    // });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction;
    await session.endSession();
    next(error);
  }
};
