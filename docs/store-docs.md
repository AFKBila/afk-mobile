# 📦 AFK Mobile App – State Management (Zustand)

This document outlines the state management structure used in the AFK mobile app using **Zustand**. Each store is modular and maintains its own concern, ensuring clean separation of logic and scalability for future updates.

---

## 🧩 Zustand Stores Overview

| Store Name             | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| `useAuthStore`         | Handles user authentication & session info   |
| `useSocialStore`       | Manages followers, following & relationships |
| `useFeedStore`         | Controls the post feed & upload states       |
| `useStoryStore`        | Manages user stories                         |
| `useNotificationStore` | Tracks notifications & user preferences      |
| `useUIStore`           | Manages global UI behavior and toggles       |
| `usePrivacyStore`      | Handles user privacy settings & block list   |
| `useAppStore`          | Handles global app state & deep link data    |

---

## 🔐 `useAuthStore`

Handles user identity and session information.

### State

- `isAuthenticated: boolean`
- `user: User`
  - Fields: `id`, `name`, `username`, `email`, `profileImage`, `dob`, `gender`, `country`, `nationality`, `isVerified`

### Actions

- `setUser(user: User)`
- `logout()`

---

## 👥 `useSocialStore`

Manages follow/follower counts and relationships.

### State

- `followersCount: number`
- `followingCount: number`
- `isFollowing: boolean`

### Actions

- `setFollowState(state: boolean)`
- `setCounts({ followers, following })`

---

## 📝 `useFeedStore`

Handles the main feed of posts and current post being viewed or shared.

### State

- `posts: PostType[]`
- `currentPost: PostType | null`
- `isUploadingPost: boolean`

### Actions

- `setPosts(posts: PostType[])`
- `setCurrentPost(post: PostType)`
- `setUploading(state: boolean)`

---

## 📖 `useStoryStore`

Manages uploading and viewing user stories.

### State

- `stories: StoryType[]`
- `isStoryUploading: boolean`

### Actions

- `setStories(stories: StoryType[])`
- `setStoryUploading(state: boolean)`

---

## 🔔 `useNotificationStore`

Handles all app notifications and user-specific notification settings.

### State

- `notifications: NotificationType[]`
- `isNotificationAllowed: boolean`
- `notificationPreferences:`
  - `likes`, `comments`, `mentions`: `"everyone" | "following" | "off"`
  - `newFollowers: boolean`
  - `activityPoints: boolean`

### Actions

- `setNotifications(notifications: NotificationType[])`
- `setNotificationAllowed(state: boolean)`
- `updatePreference(key: string, value: any)`

---

## ⚙️ `useUIStore`

Controls global app UI state such as modals, theme, and connectivity.

### State

- `isLoading: boolean`
- `showShareModal: boolean`
- `shareTarget: "post" | "profile" | null`
- `isOnline: boolean`
- `theme: "light" | "dark"`
- `language: string`

### Actions

- `setLoading(state: boolean)`
- `toggleShareModal(target: string | null)`
- `setOnline(state: boolean)`
- `setTheme(theme: string)`
- `setLanguage(language: string)`

---

## 🛡 `usePrivacyStore`

Manages user privacy controls and blocked profiles.

### State

- `privacySettings:`
  - `mentions`, `birthdayVisibility`, `onlineStatus`: `"everyone" | "following" | "none"`
  - `hideFollowers: boolean`
  - `hideFollowing: boolean`
- `blockedProfiles: string[]`

### Actions

- `updatePrivacy(key: string, value: any)`
- `blockProfile(uid: string)`

---

## 🌐 `useAppStore`

Handles high-level system state such as app readiness and deep linking data.

### State

- `isAppReady: boolean`
- `deepLinkData: { type: "post" | "profile", id: string } | null`

### Actions

- `setAppReady(state: boolean)`
- `setDeepLinkData(data: { type: string; id: string })`

---

## 🧠 Notes for Developers

- All stores are fully typed using TypeScript for better safety and IDE support.
- Zustand stores are modular and follow separation of concerns.
- Each store can be extended with async logic (middleware) as needed.

---

## 📘 Glossary

- **Zustand**: A small, fast and scalable state-management tool using simplified React hooks.
- **PostType / StoryType / NotificationType**: Custom interfaces defining expected object shapes, imported into each store.
- **Deep Link Data**: Used to handle shared post/profile links from outside the app.

---

Let me know if you have questions or need a quick visual map of how each store connects to your feature screens.
