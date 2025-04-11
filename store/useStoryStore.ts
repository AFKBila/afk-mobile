import { create } from "zustand";

// Define the StoryType interface
interface StoryType {
  id: string;
  userId: string;
  username: string;
  userImage: string;
  mediaUrl: string;
  timestamp: any; // Consider using a more specific type like Date or Firestore Timestamp
  viewed: boolean;
  expiresAt: any; // When the story will expire
}

// Define the store state interface
interface StoryState {
  stories: StoryType[];
  isStoryUploading: boolean;
  setStories: (stories: StoryType[]) => void;
  setStoryUploading: (state: boolean) => void;
}

// Create the story store
export const useStoryStore = create<StoryState>((set) => ({
  stories: [],
  isStoryUploading: false,

  setStories: (stories: StoryType[]) => {
    set({ stories });
  },

  setStoryUploading: (state: boolean) => {
    set({ isStoryUploading: state });
  },
}));
