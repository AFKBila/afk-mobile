import { create } from "zustand";

// Define the PostType interface
interface PostType {
  id: string;
  userId: string;
  username: string;
  userImage: string;
  caption: string;
  imageUrl: string;
  likes: number;
  comments: number;
  timestamp: any; // Consider using a more specific type like Date or Firestore Timestamp
  isLiked?: boolean;
}

// Define the store state interface
interface FeedState {
  posts: PostType[];
  currentPost: PostType | null;
  isUploadingPost: boolean;
  setPosts: (posts: PostType[]) => void;
  setCurrentPost: (post: PostType | null) => void;
  setUploading: (state: boolean) => void;
}

// Create the feed store
export const useFeedStore = create<FeedState>((set) => ({
  posts: [],
  currentPost: null,
  isUploadingPost: false,

  setPosts: (posts: PostType[]) => {
    set({ posts });
  },

  setCurrentPost: (post: PostType | null) => {
    set({ currentPost: post });
  },

  setUploading: (state: boolean) => {
    set({ isUploadingPost: state });
  },
}));
