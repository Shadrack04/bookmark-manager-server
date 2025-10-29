import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token;
    const authHeaders = req.headers.authorization;

    if (authHeaders && authHeaders.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized no token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized token" });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    req.user = user;
    console.log(req);

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default authMiddleware;
