import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root.js";
import AuthPage from "../pages/AuthPage";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: AuthPage,
});
