import { create } from "zustand";

// Define visibility type
type VisibilityLevel = "everyone" | "following" | "none";

// Define privacy settings interface
interface PrivacySettings {
  mentions: VisibilityLevel;
  birthdayVisibility: VisibilityLevel;
  onlineStatus: VisibilityLevel;
  hideFollowers: boolean;
  hideFollowing: boolean;
}

// Define the store state interface
interface PrivacyState {
  privacySettings: PrivacySettings;
  blockedProfiles: string[];
  updatePrivacy: <K extends keyof PrivacySettings>(
    key: K,
    value: PrivacySettings[K]
  ) => void;
  blockProfile: (uid: string) => void;
  unblockProfile: (uid: string) => void;
}

// Create the privacy store
export const usePrivacyStore = create<PrivacyState>((set) => ({
  privacySettings: {
    mentions: "everyone",
    birthdayVisibility: "following",
    onlineStatus: "everyone",
    hideFollowers: false,
    hideFollowing: false,
  },
  blockedProfiles: [],

  updatePrivacy: (key, value) => {
    set((state) => ({
      privacySettings: {
        ...state.privacySettings,
        [key]: value,
      },
    }));
  },

  blockProfile: (uid: string) => {
    set((state) => ({
      blockedProfiles: [...state.blockedProfiles, uid],
    }));
  },

  unblockProfile: (uid: string) => {
    set((state) => ({
      blockedProfiles: state.blockedProfiles.filter((id) => id !== uid),
    }));
  },
}));
