import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import authRouter from "./routes/auth.route.js";
import { PORT } from "./config/env.js";
import { connectToDatabase } from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import bookmarkRouter from "./routes/bookmark.route.js";
import authMiddleware from "./middlewares/auth.middleware.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bookmark", authMiddleware, bookmarkRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`server run on port https://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;
