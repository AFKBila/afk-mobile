import { create } from "zustand";
import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";

// Define the User interface
export interface UserProfile {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  name?: string;
  username?: string;
  profileImage?: string;
  gender?: string;
  dateOfBirth?: string;
  dob?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
  clerkId?: string;
  clerkData?: any;
  location?: string;
  bio?: string;
}

// Define the store state interface
interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile | null) => void;
  updateUser: (userData: Partial<UserProfile>) => void;
  clearUser: () => void;
}

// Create the auth store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  updateUser: (userData) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : userData,
    })),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}));
