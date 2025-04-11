import { create } from "zustand";

// Define notification preference types
type NotificationAudience = "everyone" | "following" | "off";

// Define the NotificationType interface
interface NotificationType {
  id: string;
  type: "like" | "comment" | "mention" | "follow" | "points";
  userId: string;
  username: string;
  userImage: string;
  content: string;
  timestamp: any; // Consider using a more specific type like Date or Firestore Timestamp
  read: boolean;
  targetId?: string; // ID of post/comment that was liked/commented on
}

// Define notification preferences interface
interface NotificationPreferences {
  likes: NotificationAudience;
  comments: NotificationAudience;
  mentions: NotificationAudience;
  newFollowers: boolean;
  activityPoints: boolean;
}

// Define the store state interface
interface NotificationState {
  notifications: NotificationType[];
  isNotificationAllowed: boolean;
  notificationPreferences: NotificationPreferences;
  setNotifications: (notifications: NotificationType[]) => void;
  setNotificationAllowed: (state: boolean) => void;
  updatePreference: <K extends keyof NotificationPreferences>(
    key: K,
    value: NotificationPreferences[K]
  ) => void;
}

// Create the notification store
export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  isNotificationAllowed: false,
  notificationPreferences: {
    likes: "everyone",
    comments: "everyone",
    mentions: "everyone",
    newFollowers: true,
    activityPoints: true,
  },

  setNotifications: (notifications: NotificationType[]) => {
    set({ notifications });
  },

  setNotificationAllowed: (state: boolean) => {
    set({ isNotificationAllowed: state });
  },

  updatePreference: (key, value) => {
    set((state) => ({
      notificationPreferences: {
        ...state.notificationPreferences,
        [key]: value,
      },
    }));
  },
}));
