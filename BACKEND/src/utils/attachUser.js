import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
  console.log("inside the attachUser.js");

  const token = req.cookies.accessToken;
  if (!token) return next();
  try {
    const decoded = verifyToken(token);
    const user = await findUserById(decoded.id);
    if (!user) return next();
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return next();
  }
};
