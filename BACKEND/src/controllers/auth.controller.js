import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const register_user = wrapAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const { token, user } = await registerUser(name, email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ message: "User registered successfully" });
});

export const login_user = wrapAsync(async (req, res, next) => {
  console.log("inside the login_user in controller");
  const { email, password } = req.body;
  console.log("while login providing email and password is ", email, password);

  const { token, user } = await loginUser(email, password);
  console.log("token after login", token);
  req.user = user;
  console.log("user after login", user);
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ user: user, message: "User logged in successfully" });
});

export const logout_user = wrapAsync(async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.status(200).json({ message: "User logged out successfully" });
});

export const get_current_user = wrapAsync(async (req, res) => {
  res.status(200).json({ user: req.user });
});
