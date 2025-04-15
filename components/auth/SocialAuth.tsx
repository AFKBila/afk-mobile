import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useOAuth, useAuth, useUser } from "@clerk/clerk-expo";
import { router } from 'expo-router';
import { toast } from 'sonner-native';
import CustomLoginButton from './CustomLoginButton';
import { useAuthStore } from '@/store/useAuthStore';
import { ROUTES } from '@/utils/navigation';

interface SocialAuthProps {
    isSignUp?: boolean;
}

export default function SocialAuth({ isSignUp = false }: SocialAuthProps) {
    const [loading, setLoading] = useState(false);
    const [provider, setProvider] = useState('');
    const { updateUser, user: storeUser } = useAuthStore();
    const { signOut } = useAuth();
    const { user } = useUser();

    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
    const { startOAuthFlow: twitterAuth } = useOAuth({ strategy: "oauth_x" });

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const result = await googleAuth();

            if (result.createdSessionId) {
                // Get user data from the correct location
                const userData = {
                    id: result.signUp?.createdUserId || result.signIn?.id || '',
                    email: (result.signUp?.emailAddress || result.signIn?.identifier || '') as string,
                    firstName: result.signUp?.firstName || '',
                    lastName: result.signUp?.lastName || '',
                };

                // Store initial Clerk data
                await updateUser(userData);

                if (isSignUp) {
                    router.push(ROUTES.AUTH.PROFILE_SETUP);
                } else {
                    router.push(ROUTES.HOME.TABS.EXPLORE);
                }
            }
        } catch (error) {
            console.error('OAuth error:', error);
            toast.error('Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleAppleLogin = async () => {
        setProvider('Apple');
        setLoading(true);

        try {
            // First try to sign out any existing session
            try {
                await signOut();
                console.log("Signed out existing session");
            } catch (e) {
                console.log("No session to sign out or sign out failed");
            }

            // Now try to sign in with Apple
            const { createdSessionId, setActive } = await appleAuth();

            if (createdSessionId && setActive) {
                // Activate the session
                await setActive({ session: createdSessionId });

                // Wait a moment for the session to be fully active
                setTimeout(async () => {
                    // Get the user data after authentication
                    if (user) {
                        console.log("📋 Clerk data available:", {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            imageUrl: user.imageUrl
                        });

                        // Create a complete clerk data object
                        const clerkData = {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            imageUrl: user.imageUrl,
                            username: user.username,
                            email: user.primaryEmailAddress?.emailAddress,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt,
                        };

                        console.log("📋 Storing clerk data in auth store");

                        // Store the Clerk user data in your auth store
                        updateUser({
                            ...storeUser,
                            clerkId: user.id,
                            firstName: user.firstName || storeUser?.firstName,
                            lastName: user.lastName || storeUser?.lastName,
                            profileImage: user.imageUrl || storeUser?.profileImage,
                            clerkData: clerkData
                        } as any);

                        console.log("✅ Clerk data stored successfully");
                    } else {
                        console.log("❌ Clerk user data not available");
                    }

                    // Navigate based on sign up or sign in
                    if (isSignUp) {
                        toast.success("Account created successfully!");
                        router.push("/(auth)/profile-setup");
                    } else {
                        toast.success("Welcome back!");
                        router.push("/(home)/(tabs)/explore");
                    }
                }, 1000);
            } else {
                toast.error("Authentication failed");
            }
        } catch (error) {
            console.error("Apple OAuth error:", error);
            toast.error("Failed to authenticate with Apple");
        } finally {
            setLoading(false);
        }
    };

    const handleTwitterLogin = async () => {
        setProvider('Twitter');
        setLoading(true);

        try {
            // First try to sign out any existing session
            try {
                await signOut();
                console.log("Signed out existing session");
            } catch (e) {
                console.log("No session to sign out or sign out failed");
            }

            // Now try to sign in with Twitter
            const { createdSessionId, setActive } = await twitterAuth();

            if (createdSessionId && setActive) {
                // Activate the session
                await setActive({ session: createdSessionId });

                // Wait a moment for the session to be fully active
                setTimeout(async () => {
                    // Get the user data after authentication
                    if (user) {
                        console.log("📋 Clerk data available:", {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            imageUrl: user.imageUrl
                        });

                        // Create a complete clerk data object
                        const clerkData = {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            imageUrl: user.imageUrl,
                            username: user.username,
                            email: user.primaryEmailAddress?.emailAddress,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt,
                        };

                        console.log("📋 Storing clerk data in auth store");

                        // Store the Clerk user data in your auth store
                        updateUser({
                            ...storeUser,
                            clerkId: user.id,
                            firstName: user.firstName || storeUser?.firstName,
                            lastName: user.lastName || storeUser?.lastName,
                            profileImage: user.imageUrl || storeUser?.profileImage,
                            clerkData: clerkData
                        } as any);

                        console.log("✅ Clerk data stored successfully");
                    } else {
                        console.log("❌ Clerk user data not available");
                    }

                    // Navigate based on sign up or sign in
                    if (isSignUp) {
                        toast.success("Account created successfully!");
                        router.push("/(auth)/profile-setup");
                    } else {
                        toast.success("Welcome back!");
                        router.push("/(home)/(tabs)/explore");
                    }
                }, 1000);
            } else {
                toast.error("Authentication failed");
            }
        } catch (error) {
            console.error("Twitter OAuth error:", error);
            toast.error("Failed to authenticate with Twitter");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <CustomLoginButton
                title="Continue with Google"
                icon="google"
                onPress={handleGoogleLogin}
                loading={loading && provider === 'Google'}
                variant="secondary"
            />

            <CustomLoginButton
                title="Continue with Apple"
                icon="apple"
                onPress={handleAppleLogin}
                loading={loading && provider === 'Apple'}
                variant="secondary"
            />

            <CustomLoginButton
                title="Continue with Twitter"
                icon="twitter"
                onPress={handleTwitterLogin}
                loading={loading && provider === 'Twitter'}
                variant="secondary"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 16,
    },
}); 