import { create } from "zustand";

// Define the store state interface
interface SocialState {
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  setFollowState: (state: boolean) => void;
  setCounts: (counts: { followers: number; following: number }) => void;
}

// Create the social store
export const useSocialStore = create<SocialState>((set) => ({
  followersCount: 0,
  followingCount: 0,
  isFollowing: false,

  setFollowState: (state: boolean) => {
    set((prev) => ({
      isFollowing: state,
      followersCount: state
        ? prev.followersCount + 1
        : Math.max(0, prev.followersCount - 1),
    }));
  },

  setCounts: (counts: { followers: number; following: number }) => {
    set({
      followersCount: counts.followers,
      followingCount: counts.following,
    });
  },
}));
