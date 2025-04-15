import { router } from "expo-router";

export const ROUTES = {
  AUTH: {
    GET_STARTED: "/(auth)/get-started",
    SIGNUP: "/(auth)/signup",
    LOGIN: "/(auth)/login",
    PROFILE_SETUP: "/(auth)/profile-setup",
    PHOTO: "/(auth)/photo",
    FINAL_SIGNUP: "/(auth)/final-signup",
  },
  HOME: {
    TABS: {
      PROFILE: "/(home)/(tabs)/profile",
      EXPLORE: "/(home)/(tabs)/explore",
    },
  },
} as const;

type Routes = typeof ROUTES;
type RouteValues =
  | Routes["HOME"]["TABS"][keyof Routes["HOME"]["TABS"]]
  | Routes["AUTH"][keyof Routes["AUTH"]];

export const navigate = (route: RouteValues) => {
  router.replace(route);
};
