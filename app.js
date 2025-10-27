import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import authRouter from "./routes/auth.route.js";
import { PORT } from "./config/env.js";
import { connectToDatabase } from "./database/mongodb.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.listen(PORT, async () => {
  console.log(`server run on port https://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;
