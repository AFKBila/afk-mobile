import { create } from "zustand";

// Define deep link data type
type DeepLinkType = "post" | "profile";

interface DeepLinkData {
  type: DeepLinkType;
  id: string;
}

// Define the store state interface
interface AppState {
  isAppReady: boolean;
  deepLinkData: DeepLinkData | null;
  setAppReady: (state: boolean) => void;
  setDeepLinkData: (data: DeepLinkData | null) => void;
}

// Create the app store
export const useAppStore = create<AppState>((set) => ({
  isAppReady: false,
  deepLinkData: null,

  setAppReady: (state: boolean) => {
    set({ isAppReady: state });
  },

  setDeepLinkData: (data: DeepLinkData | null) => {
    set({ deepLinkData: data });
  },
}));
