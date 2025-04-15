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
import { navigate } from '@/utils/navigation'
import { ROUTES } from '@/utils/navigation'

const FinalSignup = () => {
    const [loading, setLoading] = useState(true);
    const [retrying, setRetrying] = useState(false);
    const { user: storeUser, updateUser } = useAuthStore();
    const { userId, sessionId, getToken } = useAuth();
    const { user: clerkUser, isLoaded, isSignedIn } = useUser();

    useEffect(() => {
        if (isLoaded && clerkUser) {
            // Update store with Clerk data first
            updateUser({
                id: clerkUser.id,
                email: clerkUser.primaryEmailAddress?.emailAddress || '',
                firstName: clerkUser.firstName || '',
                lastName: clerkUser.lastName || '',
                fullName: `${clerkUser.firstName} ${clerkUser.lastName}`,
                profileImage: clerkUser.imageUrl,
                bio: "May we be guided by eternal grace ✨",
                location: clerkUser.publicMetadata?.location as string || 'Ghana',
            });

            console.log('=== CLERK USER DATA STORED ===', {
                id: clerkUser.id,
                email: clerkUser.primaryEmailAddress?.emailAddress,
                name: `${clerkUser.firstName} ${clerkUser.lastName}`,
                image: clerkUser.imageUrl,
                metadata: clerkUser.publicMetadata
            });
        }
    }, [clerkUser, isLoaded]);

    const saveUserData = async () => {
        try {
            if (!clerkUser || !isLoaded) return;

            setLoading(true);

            // Combine Clerk + Auth Store data
            const finalUserData = {
                // Clerk primary data
                id: clerkUser.id,
                email: clerkUser.primaryEmailAddress?.emailAddress,

                // Auth store data (from profile setup)
                username: storeUser?.username,
                gender: storeUser?.gender,
                dateOfBirth: storeUser?.dateOfBirth,
                location: storeUser?.location,

                // Combined/Override fields
                firstName: storeUser?.firstName || clerkUser.firstName || '',
                lastName: storeUser?.lastName || clerkUser.lastName || '',
                profileImage: storeUser?.profileImage || clerkUser.imageUrl,

                // Additional fields
                bio: "May we be guided by eternal grace ✨",
                followersCount: 0,
                followingCount: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            } as const;

            // Save to Firestore
            await setDoc(doc(db, 'users', clerkUser.id), finalUserData);

            // Update auth store one final time
            await updateUser(finalUserData);

            navigate(ROUTES.HOME.TABS.PROFILE);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to complete setup');
        } finally {
            setLoading(false);
        }
    };

    // Add trigger for saveUserData with retry mechanism
    useEffect(() => {
        if (isLoaded && clerkUser && !loading) {
            saveUserData();
        }
    }, [isLoaded, clerkUser, retrying]); // Added retrying to dependencies

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