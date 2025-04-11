import { create } from "zustand";

// Define share target type
type ShareTarget = "post" | "profile" | null;

// Define theme type
type Theme = "light" | "dark";

// Define the store state interface
interface UIState {
  isLoading: boolean;
  showShareModal: boolean;
  shareTarget: ShareTarget;
  isOnline: boolean;
  theme: Theme;
  language: string;

  // Utility functions
  setLoading: (state: boolean) => void;
  toggleShareModal: (show?: boolean, target?: ShareTarget) => void;
  setOnline: (state: boolean) => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: string) => void;
}

// Create the UI store
export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  showShareModal: false,
  shareTarget: null,
  isOnline: true,
  theme: "light",
  language: "en",

  setLoading: (state: boolean) => {
    set({ isLoading: state });
  },

  toggleShareModal: (show?: boolean, target?: ShareTarget) => {
    set((state) => ({
      showShareModal: show !== undefined ? show : !state.showShareModal,
      shareTarget: target !== undefined ? target : state.shareTarget,
    }));
  },

  setOnline: (state: boolean) => {
    set({ isOnline: state });
  },

  setTheme: (theme: Theme) => {
    set({ theme });
  },

  setLanguage: (language: string) => {
    set({ language });
  },
}));
