import { create } from "zustand";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

// Define the User interface
interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImage: string;
  dob: string;
  gender: string;
  country: string;
  nationality: string;
  isVerified: boolean;
}

// Define the store state interface
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
}

// Create the auth store
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  setUser: (user: User) => {
    set({
      user,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({
        user: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  },
}));
