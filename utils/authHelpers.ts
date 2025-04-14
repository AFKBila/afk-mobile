import { toast } from "sonner-native";
import { router } from "expo-router";
import { useAuthStore } from "@/store/useAuthStore";
import { Platform } from "react-native";

type OAuthResult = {
  createdSessionId?: string;
  status?: string;
  signUp?: {
    status: string | null;
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

export const handleAuthResult = (
  result: OAuthResult | undefined,
  isSignUp: boolean = false
): boolean => {
  if (!result) {
    toast.error("Authentication was canceled");
    return false;
  }

  console.log("Auth result:", JSON.stringify(result, null, 2));

  // Check for session creation
  if (result.createdSessionId) {
    // Store user data from social login
    if (result.userData) {
      const { updateUser } = useAuthStore.getState();

      updateUser({
        id: result.userData.id,
        email: result.userData.emailAddresses?.[0]?.emailAddress,
        firstName: result.userData.firstName,
        lastName: result.userData.lastName,
        fullName: `${result.userData.firstName || ""} ${
          result.userData.lastName || ""
        }`.trim(),
        profileImage: result.userData.imageUrl,
        username: result.userData.username,
        createdAt: new Date().toISOString(),
      });
    }

    // Success path - session created
    const isNewUser =
      isSignUp &&
      (result.signUp?.status === "complete" || result.status === "complete");

    if (isNewUser) {
      toast.success("Account created successfully!");

      // Add a small delay before navigation to ensure routes are registered
      setTimeout(() => {
        router.push("/(auth)/profile-setup");
      }, 300);

      return true;
    } else {
      toast.success(isSignUp ? "Welcome to AfroKabila!" : "Welcome back!");

      // Add a small delay before navigation
      setTimeout(() => {
        router.push("/(home)/(tabs)/explore");
      }, 300);

      return true;
    }
  }
  // Check for verification needed
  else if (
    result.status === "complete" ||
    result.signUp?.status === "complete"
  ) {
    // Sometimes the session is created but createdSessionId isn't returned directly
    toast.success(
      isSignUp ? "Account created successfully!" : "Authentication successful!"
    );
    router.push(isSignUp ? "/(auth)/profile-setup" : "/(home)/(tabs)/explore");
    return true;
  }
  // Handle other statuses
  else {
    if (result.status === "needs_second_factor") {
      toast.info("Please complete two-factor authentication");
    } else if (result.status === "needs_identifier") {
      toast.info("Additional information needed");
    } else if (result.status === "needs_verification") {
      toast.info("Please verify your email");
    } else {
      console.error("Authentication failed with status:", result.status);
      toast.error("Could not complete authentication");
    }
    return false;
  }
};

// import { toast } from "sonner-native";
// import { router } from "expo-router";
// import { useAuthStore } from "@/store/useAuthStore";
// import { useOAuth } from "@clerk/clerk-expo";
// import { Platform } from "react-native";

// type OAuthResult = {
//   createdSessionId?: string;
//   status?: string;
//   signUp?: {
//     status: string | null;
//   };
//   userData?: {
//     id?: string;
//     emailAddresses?: Array<{ emailAddress: string }>;
//     firstName?: string;
//     lastName?: string;
//     imageUrl?: string;
//     username?: string;
//     // Add other fields as needed
//   };
// };

// export const handleAuthResult = (
//   result: OAuthResult | undefined,
//   isSignUp: boolean = false
// ): boolean => {
//   if (!result) {
//     toast.error("Authentication was canceled");
//     return false;
//   }

//   console.log("Auth result:", JSON.stringify(result, null, 2)); // Debug log

//   // Check for session creation
//   if (result.createdSessionId) {
//     // Store user data from social login
//     if (result.userData) {
//       const { updateUser } = useAuthStore.getState();

//       updateUser({
//         id: result.userData.id,
//         email: result.userData.emailAddresses?.[0]?.emailAddress,
//         firstName: result.userData.firstName,
//         lastName: result.userData.lastName,
//         fullName: `${result.userData.firstName || ""} ${
//           result.userData.lastName || ""
//         }`.trim(),
//         profileImage: result.userData.imageUrl,
//         username: result.userData.username,
//         createdAt: new Date().toISOString(),
//       });
//     }

//     // Success path - session created
//     const isNewUser =
//       isSignUp &&
//       (result.signUp?.status === "complete" || result.status === "complete");

//     if (isNewUser) {
//       toast.success("Account created successfully!");
//       router.push("/(auth)/profile-setup");
//       return true;
//     } else {
//       toast.success(isSignUp ? "Welcome to AfroKabila!" : "Welcome back!");
//       router.push("/(home)/home");
//       return true;
//     }
//   }
//   // Check for verification needed
//   else if (
//     result.status === "complete" ||
//     result.signUp?.status === "complete"
//   ) {
//     // Sometimes the session is created but createdSessionId isn't returned directly
//     toast.success(
//       isSignUp ? "Account created successfully!" : "Authentication successful!"
//     );
//     router.push(isSignUp ? "/(auth)/profile-setup" : "/(home)/home");
//     return true;
//   }
//   // Handle other statuses
//   else {
//     if (result.status === "needs_second_factor") {
//       toast.info("Please complete two-factor authentication");
//     } else if (result.status === "needs_identifier") {
//       toast.info("Additional information needed");
//     } else if (result.status === "needs_verification") {
//       toast.info("Please verify your email");
//     } else {
//       console.error("Authentication failed with status:", result.status);
//       toast.error("Could not complete authentication");
//     }
//     return false;
//   }
// };

// // Define the OAuth functions outside of handleSocialLogin
// export const signInWithGoogle = async (isSignUp: boolean = false) => {
//   try {
//     const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
//     const result = await startOAuthFlow({
//       redirectUrl: Platform.select({
//         ios: "com.yourdomain.afrokabila://clerk/oauth-native-callback",
//         android: "com.yourdomain.afrokabila://clerk/oauth-native-callback",
//         default: "exp://localhost:8081/--/clerk/oauth-native-callback",
//       }),
//     });
//     console.log("Google OAuth result:", JSON.stringify(result, null, 2));
//     return result;
//   } catch (err) {
//     console.error("Google OAuth error:", err);
//     throw err;
//   }
// };

// export const signInWithApple = async (isSignUp: boolean = false) => {
//   try {
//     const { startOAuthFlow } = useOAuth({ strategy: "oauth_apple" });
//     const result = await startOAuthFlow({
//       redirectUrl: Platform.select({
//         ios: "com.yourdomain.afrokabila://clerk/oauth-native-callback",
//         android: "com.yourdomain.afrokabila://clerk/oauth-native-callback",
//         default: "exp://localhost:8081/--/clerk/oauth-native-callback",
//       }),
//     });
//     console.log("Apple OAuth result:", JSON.stringify(result, null, 2));
//     return result;
//   } catch (err) {
//     console.error("Apple OAuth error:", err);
//     throw err;
//   }
// };

// export const signInWithTwitter = async (isSignUp: boolean = false) => {
//   try {
//     const { startOAuthFlow } = useOAuth({ strategy: "oauth_twitter_v2" });
//     const result = await startOAuthFlow({
//       redirectUrl: Platform.select({
//         ios: "com.yourdomain.afrokabila://clerk/oauth-native-callback",
//         android: "com.yourdomain.afrokabila://clerk/oauth-native-callback",
//         default: "exp://localhost:8081/--/clerk/oauth-native-callback",
//       }),
//     });
//     console.log("Twitter OAuth result:", JSON.stringify(result, null, 2));
//     return result;
//   } catch (err) {
//     console.error("Twitter OAuth error:", err);
//     throw err;
//   }
// };

// // This function should be used in your component, not in this file
// export const createHandleSocialLogin = (
//   setProvider: (provider: string) => void,
//   setLoading: (loading: boolean) => void,
//   isSignUp: boolean = false
// ) => {
//   return async (providerName: string) => {
//     setProvider(providerName);
//     setLoading(true);

//     try {
//       let result;

//       switch (providerName) {
//         case "Google":
//           result = await signInWithGoogle(isSignUp);
//           break;
//         case "Apple":
//           result = await signInWithApple(isSignUp);
//           break;
//         case "Twitter":
//           result = await signInWithTwitter(isSignUp);
//           break;
//         default:
//           throw new Error(`Unsupported provider: ${providerName}`);
//       }

//       return handleAuthResult(result, isSignUp);
//     } catch (error) {
//       console.error(`Authentication failed:`, error);
//       toast.error(`Failed to authenticate with ${providerName}`);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };
// };
