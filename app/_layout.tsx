import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack, Slot, useSegments, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox, StyleSheet } from 'react-native';
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@/utils/cache';
import LoadingScreen from '@/components/common/LoadingScreen';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

// Get Clerk publishable key from environment variables
const PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Validate environment setup
if (!PUBLISHABLE_KEY) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

// Ignore specific development warnings
LogBox.ignoreLogs(['Clerk: Clerk has been loaded with development keys']);

// Define protected routes
const PROTECTED_SEGMENTS = ['(home)', 'profile-setup', 'photo', 'country'];
const PUBLIC_SEGMENTS = ['(auth)', 'login', 'signup', 'get-started'];

// Initial layout without auth checking
function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments() as string[];
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inProtectedRoute = PROTECTED_SEGMENTS.some(segment => segments.includes(segment));
    const inPublicRoute = PUBLIC_SEGMENTS.some(segment => segments.includes(segment));

    if (!isSignedIn && inProtectedRoute) {
      router.replace('/(auth)/get-started');
    } else if (isSignedIn && inPublicRoute) {
      router.replace('/(home)/(tabs)/explore');
    }
  }, [isSignedIn, segments, isLoaded]);

  return <Slot />;
}

// Root layout with providers
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    GopherText: require('../assets/fonts/GopherText.otf'),
  });

  if (!fontsLoaded) return <LoadingScreen />;

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} tokenCache={tokenCache}>
          <ClerkLoaded>
            <InitialLayout />
          </ClerkLoaded>
        </ClerkProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
