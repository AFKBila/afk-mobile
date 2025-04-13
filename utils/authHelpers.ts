import { toast } from "sonner-native";
import { router } from "expo-router";

type OAuthResult = {
  createdSessionId?: string;
  status?: string;
  signUp?: {
    status: string | null;
  };
};

export const handleAuthResult = (
  result: OAuthResult | undefined,
  isSignUp: boolean = false
): boolean => {
  if (!result) {
    toast.error("Authentication was canceled");
    return false;
  }

  if (result.createdSessionId) {
    // Check if this is a new user or first-time sign-in
    const isNewUser =
      isSignUp &&
      (result.signUp?.status === "complete" || result.status === "complete");

    if (isNewUser) {
      toast.success("Account created successfully!");
      // New user - continue with profile setup
      router.push("/(auth)/profile-setup");
      return true;
    } else {
      toast.success(isSignUp ? "Welcome to AfroKabila!" : "Welcome back!");
      // Existing user - go directly to main app
      router.push("/(home)/home");
      return true;
    }
  } else {
    // Handle other statuses
    if (result.status === "needs_second_factor") {
      toast.info("Please complete two-factor authentication");
    } else if (result.status === "needs_identifier") {
      toast.info("Additional information needed");
    } else {
      toast.error("Could not complete authentication");
    }
    return false;
  }
};
