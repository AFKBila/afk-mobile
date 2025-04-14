import { Button, StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@/common/MainContainer'
import { useAuth } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { Ionicons } from '@expo/vector-icons'
import LoadingIndicator from '@/components/common/LoadingIndicator'

// Header component for the app
const AppHeader = () => {
    const handleFavoritePress = () => {
        router.push('/(home)/favourite');
    };

    const handleLikesPress = () => {
        // Handle likes press
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('@/assets/images/afrokabila-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton} onPress={handleFavoritePress}>
                    <View style={styles.badgeContainer}>
                        <Image source={require('@/assets/icons/favourite.jpg')} style={styles.starIcon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleLikesPress}>
                    <Ionicons name="heart-outline" size={24} color={Colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

function Home() {
    const { signOut, isLoaded } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            setLoading(true);
                            console.log("Signing out...");
                            await signOut();
                            console.log("Sign out successful");

                            // Clear any local storage or state if needed
                            // localStorage.clear();

                            // Redirect to login screen
                            router.replace("/(auth)/login");
                        } catch (error) {
                            console.error("Error signing out:", error);
                            Alert.alert("Error", "Failed to sign out. Please try again.");
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    if (!isLoaded) {
        return (
            <MainContainer style={styles.loadingContainer}>
                <LoadingIndicator type="spinner" size="large" />
                <Text style={styles.loadingText}>Loading...</Text>
            </MainContainer>
        );
    }

    return (
        <MainContainer style={styles.container}>
            <AppHeader />

            <View style={styles.content}>
                <Text style={styles.welcomeText}>Welcome to Afrokabila</Text>
                <Text style={styles.subText}>Your account is ready!</Text>
            </View>

            <TouchableOpacity
                style={styles.signOutButton}
                onPress={handleSignOut}
                disabled={loading}
            >
                {loading ? (
                    <LoadingIndicator type="spinner" size="small" />
                ) : (
                    <>
                        <Ionicons name="log-out-outline" size={20} color={Colors.white} />
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </>
                )}
            </TouchableOpacity>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        padding: 0,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 15,
        backgroundColor: Colors.primary,
        width: '100%',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    logo: {
        width: 150,
        height: 30,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 20,
    },
    badgeContainer: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: Fonts.sizes.lg,
        fontWeight: Fonts.weights.bold as any,
        color: Colors.white,
        marginBottom: 10,
    },
    subText: {
        fontSize: Fonts.sizes.md,
        color: Colors.grey,
    },
    signOutButton: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    signOutText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.medium as any,
        marginLeft: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black,
    },
    loadingText: {
        color: Colors.white,
        marginTop: 10,
        fontSize: Fonts.sizes.md,
    },
    starIcon: {
        width: 20,
        height: 20,
    }
})

export default Home;