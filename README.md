# 📱 Afrokabila Social App

A modern social media application focused on cultural connections, built with React Native, Expo, and Clerk Authentication.

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start
   ```

3. **Run on specific platforms**

   ```bash
   # iOS
   npx expo run:ios

   # Android
   npx expo run:android
   ```

## 🏗️ Project Architecture

### 📂 Directory Structure

- `/app` - Expo Router screens and navigation
  - `/(auth)` - Authentication flows
  - `/(home)` - Main app screens
  - `/(tabs)` - Bottom tab navigation
- `/components` - Reusable UI components
- `/common` - Shared UI elements
- `/constants` - App constants (Colors, Fonts)
- `/store` - Zustand state management
- `/utils` - Helper functions
- `/assets` - Images, fonts, and other static assets

### 🔐 Authentication

The app uses Clerk for:

- Social Authentication (Google, Apple, Twitter)
- User Management
- Session Handling
- Profile Management

### 🧩 State Management

Zustand stores:

- `useAuthStore` - Authentication and user data
- Additional stores as needed

## 🎨 UI/UX Features

- Dark theme with custom color palette
- Custom font integration (GopherText)
- Bottom tab navigation with:
  - Home tab
  - Explore tab
  - Profile tab with user avatar
- Custom headers with logo and action buttons

## 📱 Core Features

- Social authentication
- Profile setup flow
- Explore feed
- Favorites system
- User profiles

## 🧪 Development

### Prerequisites

- Node.js
- Expo CLI
- Clerk account and API keys
- iOS Simulator or Android Emulator (optional)

### Environment Setup

1. Create a `.env` file with your Clerk keys:
   ```
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
   ```

### Tech Stack

- Expo SDK 52
- React Native 0.76
- Clerk Authentication
- Expo Router v4
- React Navigation v7
- Zustand for State Management

## 📚 Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction)

```bash
# Lint code
npm run lint

# Run tests
npm run test

# Reset project
npm run reset-project
```

## 📚 Documentation

For more detailed documentation on specific parts of the codebase:

- [State Management](./docs/state-management.md)
- [Firebase Integration](./docs/firebase.md)
- [UI Components](./docs/components.md)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
