import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { router } from 'expo-router'
import { useAuthStore } from '@/store/useAuthStore'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import MainContainer from '@/common/MainContainer'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import { toast } from 'sonner-native'
import { useAuth, useUser } from '@clerk/clerk-expo'

const FinalSignup = () => {
    const [loading, setLoading] = useState(true);
    const [retrying, setRetrying] = useState(false);
    const { user: storeUser } = useAuthStore();
    const { userId, sessionId, getToken } = useAuth();
    const { user: clerkUser, isLoaded, isSignedIn } = useUser();

    // Add immediate console log to see Clerk data as soon as component mounts
    useEffect(() => {
        console.log("=== CLERK DATA ON MOUNT ===");
        console.log("Auth state:", { userId, sessionId, isLoaded, isSignedIn });
        console.log("Clerk user object:", clerkUser);
        console.log("Clerk user JSON:", JSON.stringify(clerkUser, null, 2));

        if (clerkUser) {
            console.log("Clerk user ID:", clerkUser.id);
            console.log("Clerk user image:", clerkUser.imageUrl);
            console.log("Clerk user email:", clerkUser.primaryEmailAddress?.emailAddress);
            console.log("Clerk user name:", clerkUser.firstName, clerkUser.lastName);
        } else {
            console.log("Clerk user is null or undefined");
        }
    }, [clerkUser, isLoaded]);

    // Log when isLoaded changes
    useEffect(() => {
        console.log("isLoaded changed to:", isLoaded);
        if (isLoaded) {
            console.log("Clerk data should be available now");
            console.log("isSignedIn:", isSignedIn);
            console.log("Clerk user after load:", clerkUser);
        }
    }, [isLoaded]);

    useEffect(() => {
        // Wait a bit longer to ensure Clerk data is loaded
        const timer = setTimeout(() => {
            console.log("=== BEFORE SAVE USER DATA ===");
            console.log("isLoaded:", isLoaded);
            console.log("isSignedIn:", isSignedIn);
            console.log("Clerk user before save:", clerkUser);
            saveUserData();
        }, 2000); // Increased to 2 seconds for more time to load

        return () => clearTimeout(timer);
    }, [storeUser, retrying, isLoaded, isSignedIn]);

    const saveUserData = async () => {
        try {
            console.log("=== SAVE USER DATA FUNCTION ===");
            console.log("Auth state:", { userId, sessionId, isLoaded, isSignedIn });
            console.log("Clerk user data:", clerkUser);

            // Try to get a token to verify authentication
            let token = null;
            try {
                token = await getToken();
                console.log("Token available:", !!token);
                if (token) {
                    console.log("Token first 20 chars:", token.substring(0, 20) + "...");
                }
            } catch (e) {
                console.log("Token error:", e);
            }

            // Use Clerk userId or generate a fallback
            const userIdToUse = userId || storeUser?.id || `user_${Math.random().toString(36).substring(2, 15)}`;

            console.log("Using user ID:", userIdToUse);
            console.log("User data from store:", storeUser);

            // Prepare user data with fallbacks
            const userData = {
                id: userIdToUse,
                email: storeUser?.email || '',
                firstName: storeUser?.firstName || '',
                lastName: storeUser?.lastName || '',
                fullName: storeUser?.fullName || '',
                username: storeUser?.username || `user_${Math.random().toString(36).substring(2, 7)}`,
                profileImage: storeUser?.profileImage || '',
                gender: storeUser?.gender || '',
                dateOfBirth: storeUser?.dateOfBirth || '',
                country: storeUser?.country || '',
                createdAt: storeUser?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                // Add clerk-specific fields directly to the user object
                clerkId: clerkUser?.id || null,
                clerkImageUrl: clerkUser?.imageUrl || null,
            };

            console.log("Final user data to save:", userData);

            // Save user data to Firestore
            await setDoc(doc(db, 'users', userIdToUse), userData);
            console.log("User data saved successfully to Firestore");

            // Show success message
            toast.success('Account setup complete!');

            // Navigate to home screen after a brief delay
            setTimeout(() => {
                router.push('/(home)/home');
            }, 2000);
        } catch (error) {
            console.error('Error saving user data:', error);
            toast.error('Failed to complete account setup. Tap to retry.');
            setLoading(false);
        }
    };

    // Handle retry
    const handleRetry = () => {
        setLoading(true);
        setRetrying(!retrying);
        console.log("Retry triggered, retrying state:", !retrying);
    };

    // Get first name or username to display
    const displayName = storeUser?.firstName || storeUser?.fullName?.split(' ')[0] || storeUser?.username || 'User';

    return (
        <MainContainer style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.nameText}>{displayName}</Text>
                    <Text style={styles.welcomeText}>Welcome to Afrokabila</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={require('@/assets/images/profiles.png')}
                        style={styles.gridImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.footer}>
                    {loading ? (
                        <>
                            <LoadingIndicator
                                type="spinner"
                                size="small"
                                style={styles.loadingIndicator}
                            />
                            <Text style={styles.footerText}>Getting ready</Text>
                        </>
                    ) : (
                        <Text
                            style={[styles.footerText, styles.retryText]}
                            onPress={handleRetry}
                        >
                            Tap to retry
                        </Text>
                    )}
                </View>
            </View>
        </MainContainer>
    )
}

export default FinalSignup

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.black,
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: 'space-between',
    },
    header: {
        marginTop: 20,
    },
    nameText: {
        fontSize: Fonts.sizes.xl,
        color: Colors.white,
        fontWeight: Fonts.weights.bold as any,
    },
    welcomeText: {
        fontSize: Fonts.sizes.lg,
        color: '#A0A0A0', // Slightly muted color for the welcome text
        fontStyle: 'italic',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridImage: {
        width: '100%',
        height: '80%',
    },
    footer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    loadingIndicator: {
        marginBottom: 10,
    },
    footerText: {
        fontSize: Fonts.sizes.md,
        color: '#A0A0A0', // Same muted color as welcome text
    },
    retryText: {
        color: Colors.primary,
        textDecorationLine: 'underline',
    }
})