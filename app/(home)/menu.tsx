import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Alert, ActivityIndicator, Share } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { showToast } from '@/utils/toast';

export default function MenuScreen() {
    const { signOut } = useAuth();
    const [loading, setLoading] = useState(false);

    // Handle back button press
    useEffect(() => {
        const backAction = () => {
            router.back();
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, []);

    const handleSignOut = async () => {
        Alert.alert(
            "Sign out of Afrokabila",
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
                            await signOut();
                            showToast("You have been signed out", "success");
                            router.replace("/(auth)/login");
                        } catch (error) {
                            console.error("Error signing out:", error);
                            showToast("Failed to sign out. Please try again.", "error");
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    };

    const openHelp = async () => {
        await WebBrowser.openBrowserAsync('https://afrokabila.com');
    };

    const openAbout = async () => {
        await WebBrowser.openBrowserAsync('https://afrokabila.com');
    };



    const handleShare = async () => {
        try {
            // Get the deep link URL for your app
            const deepLink = Linking.createURL('', {
                queryParams: {
                    source: 'invite'
                }
            });


            const webFallbackUrl = 'https://afrokabila.com/download';

            await Share.share({
                message: `Join me on Afrokabila! Download the app and connect with friends.\n\nDownload here: ${webFallbackUrl}`,
                url: deepLink,
            });
        } catch (error) {
            console.error("Error sharing:", error);
            showToast("Failed to share", "error");
        }
    };


    const menuItems = [
        {
            icon: <Feather name="users" size={24} color={Colors.white} />,
            label: 'Follow and invite friends',
            onPress: handleShare
        },
        {
            icon: <Ionicons name="notifications-outline" size={24} color={Colors.white} />,
            label: 'Notifications',
            onPress: () => router.push('/(home)/menu/notifications')
        },
        {
            icon: <Ionicons name="heart-outline" size={24} color={Colors.white} />,
            label: 'Activity',
            onPress: () => router.push('/(home)/menu/activity')
        },
        {
            icon: <Ionicons name="bookmark-outline" size={24} color={Colors.white} />,
            label: 'Saved',
            onPress: () => router.push('/(home)/menu/saved')
        },
        {
            icon: <Ionicons name="lock-closed-outline" size={24} color={Colors.white} />,
            label: 'Privacy',
            onPress: () => router.push('/(home)/menu/privacy')
        },
        {
            icon: <Ionicons name="person-outline" size={24} color={Colors.white} />,
            label: 'Account',
            onPress: () => router.push('/(home)/menu/account')
        },
        // {
        //     icon: <Ionicons name="language-outline" size={24} color={Colors.white} />,
        //     label: 'Language',
        //     onPress: () => router.push('/(home)/menu/language')
        // },
        {
            icon: <Ionicons name="compass-outline" size={24} color={Colors.white} />,
            label: 'Interests',
            onPress: () => router.push('/(home)/menu/interests')
        },
        {
            icon: <Ionicons name="help-circle-outline" size={24} color={Colors.white} />,
            label: 'Help',
            onPress: openHelp
        },
        {
            icon: <Ionicons name="information-circle-outline" size={24} color={Colors.white} />,
            label: 'About',
            // onPress: () => router.push('/(home)/menu/about')
            onPress: openAbout
        },
    ];

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Settings</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={item.onPress}
                        >
                            <View style={styles.iconContainer}>
                                {item.icon}
                            </View>
                            <Text style={styles.menuItemText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}


                    {/* <TouchableOpacity
                        style={styles.accountSwitchButton}
                        onPress={() => router.push('/(home)/menu/switch-accounts')}
                        >
                        <Text style={styles.accountSwitchText}>Switch accounts</Text>
                        </TouchableOpacity> */}

                    <View style={styles.divider} />

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleSignOut}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.error} size="small" />
                        ) : (
                            <Text style={styles.logoutText}>Log out</Text>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 15,
        // paddingHorizontal: 10,
        paddingLeft: 5,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.lg,
        fontWeight: Fonts.weights.bold as any,
        marginLeft: 20,
        fontFamily: Fonts.primary,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    iconContainer: {
        width: 30,
        alignItems: 'center',
        marginRight: 15,
    },
    menuItemText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontFamily: Fonts.primary,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.secondary,
        opacity: 0.5,
        marginVertical: 10,
    },
    accountSwitchButton: {
        paddingVertical: 16,
    },
    accountSwitchText: {
        color: Colors.link,
        fontSize: Fonts.sizes.md,
        fontFamily: Fonts.primary,
    },
    logoutButton: {
        paddingVertical: 16,
    },
    logoutText: {
        color: Colors.error,
        fontSize: Fonts.sizes.md,
        fontFamily: Fonts.primary,
    },
}); 