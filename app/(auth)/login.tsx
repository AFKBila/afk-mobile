import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import AuthHeader from '@/components/auth/AuthHeader'
import CustomLoginButton from '@/components/auth/CustomLoginButton'
import { router } from 'expo-router'
import AuthContainer from '@/components/auth/AuthContainer'
import { useOAuth } from '@clerk/clerk-expo'
import { useWarmUpBrowser } from '@/utils/useWarmUpBrowser'
import { toast } from 'sonner-native'
import { handleAuthResult } from '@/utils/authHelpers'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import MainContainer from '@/common/MainContainer'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useAuthStore } from '@/store/useAuthStore'
import { useSocialStore } from '@/store/useSocialStore'

function Login() {
    useWarmUpBrowser();
    const [loading, setLoading] = useState(false);
    const [provider, setProvider] = useState<string | null>(null);
    const { updateUser } = useAuthStore();
    const { setCounts } = useSocialStore();

    // Set up OAuth for each provider
    const { startOAuthFlow: startGoogleFlow } = useOAuth({ strategy: "oauth_google" });
    const { startOAuthFlow: startAppleFlow } = useOAuth({ strategy: "oauth_apple" });
    const { startOAuthFlow: startTwitterFlow } = useOAuth({ strategy: "oauth_x" });

    const fetchUserData = async (userId: string) => {
        try {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                // Update auth store
                await updateUser(userData);
                // Update social store
                setCounts({
                    followers: userData.followersCount || 0,
                    following: userData.followingCount || 0
                });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('Failed to fetch user data');
        }
    };

    const handleSocialLogin = async (providerName: string) => {
        // setProvider(providerName);
        // setLoading(true);

        // try {
        //     let result;

        //     switch (providerName) {
        //         case 'Google':
        //             result = await startGoogleFlow();
        //             break;
        //         case 'Apple':
        //             result = await startAppleFlow();
        //             break;
        //         case 'Twitter':
        //             result = await startTwitterFlow();
        //             break;
        //         default:
        //             throw new Error(`Unsupported provider: ${providerName}`);
        //     }

        //     if (result?.createdSessionId) {
        //         await fetchUserData(result.createdSessionId);
        //     }

        //     handleAuthResult(result, false);
        // } catch (error) {
        //     console.error(`Login failed:`, error);
        //     toast.error(`Failed to login with ${providerName}`);
        // } finally {
        //     setLoading(false);
        // }
        router.push('/(home)/(tabs)')
    }

    return (
        <MainContainer style={{ backgroundColor: Colors.primary }}>
            <AuthContainer
                totalSteps={1}
                currentStep={0}
            >
                <AuthHeader title="Log In" imageSource={require('@/assets/images/duck.png')} />

                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>Welcome back</Text>

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <LoadingIndicator
                                type="dots"
                                message={`Signing in with ${provider}...`}
                            />
                        </View>
                    ) : (
                        <View style={styles.socialButtonsContainer}>
                            <CustomLoginButton
                                title="Twitter"
                                onPress={() => handleSocialLogin('Twitter')}
                                variant="primary"
                                style={styles.socialButton}
                            />

                            <CustomLoginButton
                                title="Apple"
                                onPress={() => handleSocialLogin('Apple')}
                                variant="primary"
                                style={styles.socialButton}
                            />

                            <CustomLoginButton
                                title="Google"
                                onPress={() => handleSocialLogin('Google')}
                                variant="primary"
                                style={styles.socialButton}
                            />
                        </View>
                    )}
                </View>
                {/* go to signup page */}
                <TouchableOpacity style={{ flexDirection: "column-reverse", alignItems: "center", justifyContent: "center", marginTop: 20 }} onPress={() => router.push('/(auth)/signup')}>
                    <Text style={styles.signupText}>Don't have an account? Sign up</Text>
                </TouchableOpacity>
            </AuthContainer>
        </MainContainer>
    )
}

export default Login

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    subtitle: {
        fontSize: Fonts.sizes.md,
        color: Colors.grey,
        marginBottom: 30,
        textAlign: 'center',
    },
    socialButtonsContainer: {
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 60,
    },
    socialButton: {
        marginBottom: 16,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        color: Colors.white,
        marginTop: 20,
        fontSize: Fonts.sizes.md,
    },
    signupText: {
        color: Colors.white,
        marginTop: 20,
        fontSize: Fonts.sizes.md,
        textAlign: 'center',
    }
})