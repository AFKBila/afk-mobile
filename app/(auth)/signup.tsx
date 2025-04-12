import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import AuthHeader from '@/components/auth/AuthHeader'
import CustomLoginButton from '@/components/auth/CustomLoginButton'
import { router } from 'expo-router'
import SwipeableScreen from '@/components/auth/SwipeableScreen'

function Signup() {
    const currentStep = 0;

    const handleSocialLogin = (provider: string) => {
        console.log(`Login with ${provider}`);
        router.push("/(auth)/profile-setup")
    }

    const handleNext = () => {
        router.push("/(auth)/profile-setup");
    }

    const handlePrevious = () => {
        // This is the first screen, so no previous navigation
        // You could navigate to login if you have that screen
    }

    return (
        <SwipeableScreen
            totalSteps={3}
            currentStep={currentStep}
            onNext={handleNext}
            onPrevious={handlePrevious}
        >
            <AuthHeader title="Sign Up" imageSource={require('@/assets/images/duck.png')} />

            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Create your account</Text>

                <View style={styles.socialButtonsContainer}>
                    <CustomLoginButton
                        title="Twitter"
                        onPress={() => handleSocialLogin('twitter')}
                        variant="primary"
                        style={styles.socialButton}
                    />

                    <CustomLoginButton
                        title="Apple"
                        onPress={() => handleSocialLogin('apple')}
                        variant="primary"
                        style={styles.socialButton}
                    />

                    <CustomLoginButton
                        title="Google"
                        onPress={() => handleSocialLogin('google')}
                        variant="primary"
                        style={styles.socialButton}
                    />
                </View>
            </View>
        </SwipeableScreen>
    )
}

export default Signup

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
    }
})