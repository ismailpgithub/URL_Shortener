import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
  console.log("inside the attachUser.js");

  const token = req.cookies.accessToken;
  console.log("In attachuser.js - Token extracted: ", token);
  if (!token) return next();
  try {
    const decoded = verifyToken(token);
    console.log("In attachuser.js - decoded extracted: ", decoded);
    const user = await findUserById(decoded.id);
    console.log("In attachuser.js - user extracted: ", user);
    if (!user) return next();
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return next();
  }
};
