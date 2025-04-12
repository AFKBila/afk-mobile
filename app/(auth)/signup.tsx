import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import MainContainer from '@/common/MainContainer'
import AuthHeader from '@/components/auth/AuthHeader'
import CustomLoginButton from '@/components/auth/CustomLoginButton'
import { router } from 'expo-router'
import CarouselDots from '@/components/auth/CarouselDots'

function Signup() {
    const [currentStep, setCurrentStep] = useState(0);

    const handleSocialLogin = (provider: string) => {
        console.log(`Login with ${provider}`);
        // setCurrentStep(1);
        router.push("/(auth)/profile-setup")
    }

    return (
        <MainContainer
            style={{ backgroundColor: Colors.primary }}
            contentContainerStyle={styles.contentContainer}
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

            <CarouselDots
                totalDots={3}
                currentIndex={currentStep}
                style={styles.dotsContainer}
            />
        </MainContainer>
    )
}

export default Signup

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 40,
    },
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
        // marginHorizontal: 50,
        paddingHorizontal: 60,
    },
    socialButton: {
        marginBottom: 16,
    },
    dotsContainer: {
        marginBottom: 40,
    }
})