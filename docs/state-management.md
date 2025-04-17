# State Management Documentation

## Overview

Afrokabila uses Zustand for state management, providing a simple and efficient state solution.

## Stores

### Auth Store

```typescript
useAuthStore
- user: User information
- isAuthenticated: Authentication status
- signIn(): Handle sign in
- signOut(): Handle sign out
```

### Privacy Store

```typescript
usePrivacyStore
- privacySettings: User privacy preferences
- blockedProfiles: List of blocked users
- updatePrivacy(): Update privacy settings
- blockProfile(): Block a user
- unblockProfile(): Unblock a user
```

### App Store

```typescript
useAppStore
- isAppReady: App loading state
- deepLinkData: Deep linking information
- setAppReady(): Update app ready state
- setDeepLinkData(): Handle deep link data
```
