import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@clerk/clerk-expo';
import { showToast } from "@/utils/toast";

export default function AccountManagementScreen() {
    const { signOut } = useAuth();
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

    const confirmDeactivate = () => {
        Alert.alert(
            "Deactivate Account",
            "Are you sure you want to deactivate your account? You can reactivate it later by logging in.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Deactivate", style: "destructive", onPress: () => { } }
            ]
        );
    };

    const confirmDelete = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to permanently delete your account? This action cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => { } }
            ]
        );
    };

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Account</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => router.push('/(home)/menu/account/change-password')}
                    >
                        <Text style={styles.menuItemText}>Change Password</Text>
                        <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => { }}
                    >
                        <Text style={styles.menuItemText}>Add / Verify Email</Text>
                        <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => { }}
                    >
                        <Text style={styles.menuItemText}>Add / Verify Phone</Text>
                        <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity
                        style={styles.dangerItem}
                        onPress={confirmDeactivate}
                    >
                        <Text style={styles.dangerText}>Deactivate Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.dangerItem}
                        onPress={confirmDelete}
                    >
                        <Text style={styles.dangerText}>Delete Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleSignOut}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.white} size="small" />
                        ) : (
                            <Text style={styles.logoutText}>Log Out</Text>
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
        paddingHorizontal: 16,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.lg,
        fontWeight: Fonts.weights.bold as any,
        marginLeft: 20,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    menuItemText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.secondary,
        opacity: 0.2,
        marginVertical: 10,
    },
    dangerItem: {
        paddingVertical: 16,
    },
    dangerText: {
        color: Colors.red,
        fontSize: Fonts.sizes.md,
    },
    logoutButton: {
        paddingVertical: 16,
        marginTop: 20,
    },
    logoutText: {
        color: Colors.red,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.medium as any,
    },
}); 