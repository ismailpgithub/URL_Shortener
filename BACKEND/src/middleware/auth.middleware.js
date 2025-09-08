import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const authMiddleware = async (req, res, next) => {
  console.log("Inside the authMiddle");
  const token = req.cookies.accessToken;
  console.log("Token extracted:", token);
  if (!token)
    return res.status(401).json({ message: "Unauthorized - no token" });
  try {
    const decoded = verifyToken(token);
    const user = await findUserById(decoded.id);

    if (!user)
      return res.status(401).json({ message: "Unauthorized -no user" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized - invalid token" });
  }
};
