import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
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

function Login() {
    useWarmUpBrowser();
    const [loading, setLoading] = useState(false);
    const [provider, setProvider] = useState<string | null>(null);

    // Set up OAuth for each provider
    const { startOAuthFlow: startGoogleFlow } = useOAuth({ strategy: "oauth_google" });
    const { startOAuthFlow: startAppleFlow } = useOAuth({ strategy: "oauth_apple" });
    const { startOAuthFlow: startTwitterFlow } = useOAuth({ strategy: "oauth_x" });

    const handleSocialLogin = async (providerName: string) => {
        setProvider(providerName);
        setLoading(true);

        try {
            let result;

            switch (providerName) {
                case 'Google':
                    result = await startGoogleFlow();
                    break;
                case 'Apple':
                    result = await startAppleFlow();
                    break;
                case 'Twitter':
                    result = await startTwitterFlow();
                    break;
                default:
                    throw new Error(`Unsupported provider: ${providerName}`);
            }

            handleAuthResult(result, false);
        } catch (error) {
            console.error(`Login failed:`, error);
            toast.error(`Failed to login with ${providerName}`);
        } finally {
            setLoading(false);
        }
    }

    return (
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
        </AuthContainer>
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
    }
})