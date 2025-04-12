import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import CustomLoginButton from '@/components/auth/CustomLoginButton'
import MainContainer from '@/common/MainContainer'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { router } from 'expo-router'

export default function GetStarted() {
    const handleSignUp = () => {
        router.push('/(auth)/signup')
    }

    const handleLogin = () => {
        router.push('/(auth)/signup')
    }

    return (
        <MainContainer
            style={{ backgroundColor: Colors.primary }}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={styles.logoContainer}>
                <Image
                    source={require('@/assets/images/afrokabila-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.gridContainer}>
                <Image
                    source={require('@/assets/images/profiles.png')}
                    style={styles.gridImage}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.heading}>
                    Bringing people together{'\n'}
                    through <Text style={styles.highlightText}>culture</Text>
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <CustomLoginButton
                    title="Sign Up"
                    onPress={handleSignUp}
                    variant="primary"
                />
                <CustomLoginButton
                    title="Log In"
                    onPress={handleLogin}
                    variant="secondary"
                />
                <Text style={styles.footerText}>
                    The tribe awaits you ...
                </Text>
            </View>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    logo: {
        width: 200,
        height: 40,
    },
    gridContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridImage: {
        width: '80%',
        height: 200,
    },
    textContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    heading: {
        fontSize: Fonts.sizes.xl,
        fontWeight: Fonts.weights.semiBold as any,
        color: Colors.white,
        textAlign: 'center',
        lineHeight: 32,
    },
    highlightText: {
        fontStyle: 'italic',
        opacity: 0.6,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 60,
        marginBottom: 40,
    },
    footerText: {
        color: Colors.white,
        textAlign: 'center',
        marginTop: 20,
        fontSize: Fonts.sizes.sm,
        opacity: 0.6,
        // fontFamily: Fonts.regular
    }
});