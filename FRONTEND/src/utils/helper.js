import { getCurrentUser } from "../api/user.api.js";
import { login } from "../store/slice/authSlice.js";
import { redirect } from "@tanstack/react-router";

export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;
    const data = await queryClient.fetchQuery({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });

    console.log(data);
    if (!data) return false;
    store.dispatch(login(data));
    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) return false;
    return true;
  } catch (error) {
    console.log(error);
    return redirect({ to: "/auth" });
  }
};
