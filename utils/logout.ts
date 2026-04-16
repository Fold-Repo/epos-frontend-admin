import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/types";
import { clearCookie } from "./cookies";
import { clearProfile } from "@/store/slice";
import { persistor, store } from "@/store";

export const logout = async () => {
  store.dispatch(clearProfile());
  await persistor.purge();
  clearCookie(AUTH_TOKEN_KEY);
  clearCookie(REFRESH_TOKEN_KEY);
};
