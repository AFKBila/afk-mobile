import { Button, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import MainContainer from '@/common/MainContainer'
import { useAuth } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { Ionicons } from '@expo/vector-icons'
import LoadingIndicator from '@/components/common/LoadingIndicator'

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
            <View style={styles.header}>
                <Text style={styles.headerText}>Home</Text>
            </View>

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
        backgroundColor: Colors.black,
        padding: 20,
    },
    header: {
        marginTop: 40,
        marginBottom: 30,
    },
    headerText: {
        fontSize: Fonts.sizes.xl,
        fontWeight: Fonts.weights.bold as any,
        color: Colors.white,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: Fonts.sizes.lg,
        fontWeight: Fonts.weights.bold as any,
        color: Colors.white,
        marginBottom: 10,
    },
    subText: {
        fontSize: Fonts.sizes.md,
        color: Colors.lightGray,
    },
    signOutButton: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
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
    }
})

export default Home;