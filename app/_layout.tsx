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
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Colors } from '@/constants/Colors';

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

  useEffect(() => {
    if (fontsLoaded) {
      // Hide splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return <LoadingScreen />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <ClerkLoaded>
            <ErrorBoundary>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                  // presentation: "modal",
                  contentStyle: {
                    backgroundColor: Colors.primary
                  }
                }}
              >
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(home)" options={{ headerShown: false }} />
              </Stack>
              <Toaster position="top-center" />
            </ErrorBoundary>
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
