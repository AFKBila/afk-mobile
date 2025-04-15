import { toast } from "sonner-native";
import { router } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";
import { Platform } from "react-native";

type OAuthResult = {
  createdSessionId?: string;
  status?: string;
  signUp?: {
    status: string | null;
    createdUserId?: string;
    emailAddress?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
  };
  signIn?: {
    userId?: string;
    identifier?: string;
  };
  userData?: {
    id?: string;
    emailAddresses?: Array<{ emailAddress: string }>;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    username?: string;
  };
};

export const handleAuthResult = async (
  result: OAuthResult | undefined,
  isSignUp: boolean = false
) => {
  try {
    if (!result) {
      console.log("=== AUTH CANCELED ===");
      toast.error("Authentication was canceled");
      return false;
    }

    console.log("=== AUTH RESULT DATA ===", JSON.stringify(result, null, 2));

    if (!result.createdSessionId) {
      console.log("=== NO SESSION CREATED ===");
      throw new Error("No session created");
    }

    const { updateUser } = useAuthStore.getState();
    const userData = {
      id: result.signUp?.createdUserId || result.signIn?.userId,
      clerkId: result.signUp?.createdUserId || result.signIn?.userId,
      email: result.signUp?.emailAddress || result.signIn?.identifier,
      firstName: result.signUp?.firstName || "",
      lastName: result.signUp?.lastName || "",
      fullName: `${result.signUp?.firstName || ""} ${
        result.signUp?.lastName || ""
      }`.trim(),
      profileImage: "",
      username: result.signUp?.username || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      bio: "May we be guided by eternal grace ✨",
      location: "Ghana",
      followersCount: 0,
      followingCount: 0,
    };

    console.log("=== STORING USER DATA ===", userData);
    await updateUser(userData);

    // Navigation with error handling
    try {
      if (isSignUp) {
        console.log("=== NAVIGATING TO PROFILE SETUP ===");
        await router.replace("/(auth)/profile-setup");
      } else {
        console.log("=== NAVIGATING TO EXPLORE ===");
        await router.replace("/(home)/(tabs)/explore");
      }
      return true;
    } catch (navError) {
      console.error("Navigation failed:", navError);
      throw navError;
    }
  } catch (error) {
    console.error("Auth result handling failed:", error);
    toast.error("Authentication failed");
    return false;
  }
};
