import { homePageRoute } from "./homepage.js";
import { dashboardRoute } from "./dashboard.js";
import { authRoute } from "./auth.route.js";
import { rootRoute } from "./root.js";

export const routeTree = rootRoute.addChildren([
  homePageRoute,
  authRoute,
  dashboardRoute,
]);
