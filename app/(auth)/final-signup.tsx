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
    const { user: storeUser } = useAuthStore();  // Renamed to storeUser for clarity
    const { userId } = useAuth();
    const { user: clerkUser, isLoaded } = useUser();  // Get Clerk user data

    useEffect(() => {
        // Only proceed when Clerk user data is loaded
        if (!isLoaded) return;

        const saveUserData = async () => {
            try {
                // Use Clerk userId or generate a fallback
                const userIdToUse = userId || storeUser?.id || `user_${Math.random().toString(36).substring(2, 15)}`;

                console.log("Using user ID:", userIdToUse);
                console.log("User data from store:", storeUser);

                // Extract relevant Clerk data into a separate object
                const clerkData = clerkUser ? {
                    id: clerkUser.id,
                    email: clerkUser.primaryEmailAddress?.emailAddress,
                    firstName: clerkUser.firstName,
                    lastName: clerkUser.lastName,
                    username: clerkUser.username,
                    imageUrl: clerkUser.imageUrl,
                    createdAt: clerkUser.createdAt,
                    updatedAt: clerkUser.updatedAt,
                    // Add any other Clerk fields you want to preserve
                } : null;

                // Decide whether to use Clerk data or store data
                // Priority: 1. Store data (from your app flow) 2. Clerk data 3. Default values
                const userData = {
                    id: userIdToUse,
                    email: storeUser?.email || clerkUser?.primaryEmailAddress?.emailAddress || '',
                    firstName: storeUser?.firstName || clerkUser?.firstName || '',
                    lastName: storeUser?.lastName || clerkUser?.lastName || '',
                    fullName: storeUser?.fullName || (clerkUser ? `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() : ''),
                    username: storeUser?.username || clerkUser?.username || `user_${Math.random().toString(36).substring(2, 7)}`,
                    profileImage: storeUser?.profileImage || clerkUser?.imageUrl || '',
                    gender: storeUser?.gender || '',  // No equivalent in Clerk
                    dateOfBirth: storeUser?.dateOfBirth || '',  // No equivalent in Clerk
                    country: storeUser?.country || '',  // No equivalent in Clerk
                    createdAt: storeUser?.createdAt || new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    // Add the clerkData object
                    clerkData: clerkData,
                };

                // Save user data to Firestore
                await setDoc(doc(db, 'users', userIdToUse), userData);

                // Show success message
                toast.success('Account setup complete!');

                // Navigate to home screen after a brief delay
                setTimeout(() => {
                    router.push('/(home)/home');
                }, 2000);
            } catch (error) {
                console.error('Error saving user data:', error);
                toast.error('Failed to complete account setup. Tap to retry.');
                // Stay on this screen to let the user retry
                setLoading(false);
            }
        };

        saveUserData();
    }, [storeUser, retrying, userId, clerkUser, isLoaded]);

    // Handle retry
    const handleRetry = () => {
        setLoading(true);
        setRetrying(!retrying); // Toggle to trigger useEffect
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