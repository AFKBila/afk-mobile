import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useOAuth, useAuth } from "@clerk/clerk-expo";
import { router } from 'expo-router';
import { toast } from 'sonner-native';
import CustomLoginButton from './CustomLoginButton';
import { useAuthStore } from '@/store/useAuthStore';

interface SocialAuthProps {
    isSignUp?: boolean;
}

export default function SocialAuth({ isSignUp = false }: SocialAuthProps) {
    const [loading, setLoading] = useState(false);
    const [provider, setProvider] = useState('');
    const { updateUser } = useAuthStore();
    const { signOut } = useAuth();

    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
    const { startOAuthFlow: twitterAuth } = useOAuth({ strategy: "oauth_x" });

    const handleGoogleLogin = async () => {
        setProvider('Google');
        setLoading(true);

        try {
            // First try to sign out any existing session
            try {
                await signOut();
                console.log("Signed out existing session");
            } catch (e) {
                console.log("No session to sign out or sign out failed");
            }

            // Now try to sign in with Google
            const { createdSessionId, setActive } = await googleAuth();
            console.log("Google OAuth result:", { createdSessionId });

            if (createdSessionId && setActive) {
                // Activate the session
                await setActive({ session: createdSessionId });

                // Navigate based on sign up or sign in
                if (isSignUp) {
                    toast.success("Account created successfully!");
                    router.push("/(auth)/profile-setup");
                } else {
                    toast.success("Welcome back!");
                    router.push("/(home)/home");
                }
            } else {
                toast.error("Authentication failed");
            }
        } catch (error) {
            console.error("Google OAuth error:", error);
            toast.error("Failed to authenticate with Google");
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
            console.log("Apple OAuth result:", { createdSessionId });

            if (createdSessionId && setActive) {
                // Activate the session
                await setActive({ session: createdSessionId });

                // Navigate based on sign up or sign in
                if (isSignUp) {
                    toast.success("Account created successfully!");
                    router.push("/(auth)/profile-setup");
                } else {
                    toast.success("Welcome back!");
                    router.push("/(home)/home");
                }
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
            console.log("Twitter OAuth result:", { createdSessionId });

            if (createdSessionId && setActive) {
                // Activate the session
                await setActive({ session: createdSessionId });

                // Navigate based on sign up or sign in
                if (isSignUp) {
                    toast.success("Account created successfully!");
                    router.push("/(auth)/profile-setup");
                } else {
                    toast.success("Welcome back!");
                    router.push("/(home)/home");
                }
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