# 📱 AFK Social Media App

A modern social media application combining features from Threads and Instagram, built with React Native, Expo, and Firebase.

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
- `/components` - Reusable UI components
- `/config` - Configuration files (Firebase, etc.)
- `/constants` - App constants (Colors, Fonts, etc.)
- `/hooks` - Custom React hooks
- `/services` - API and service integrations
- `/store` - Zustand state management
- `/assets` - Images, fonts, and other static assets

### 🔥 Firebase Integration

The app uses Firebase for:

- Authentication
- Firestore Database
- Storage
- Analytics

### 🧩 State Management

We use Zustand for state management with modular stores:

- `useAuthStore` - Authentication and user data
- `useSocialStore` - Follow/follower relationships
- `useFeedStore` - Post feed management
- `useStoryStore` - Story content management
- `useNotificationStore` - Notifications and preferences
- `useUIStore` - UI state (theme, modals, etc.)
- `usePrivacyStore` - Privacy settings
- `useAppStore` - App-level state

## 🎨 UI/UX

- Custom theming with light/dark mode support
- Consistent typography with the Fonts system
- Standardized color palette

## 📱 Features

- User authentication
- Feed posts and stories
- Follow/unfollow functionality
- Notifications
- Privacy controls
- Deep linking

## 🧪 Development

### Prerequisites

- Node.js 16+
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Useful Commands

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

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
