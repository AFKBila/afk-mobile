import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@clerk/clerk-expo';

export default function SwitchAccountsScreen() {
    const { signOut } = useAuth();

    // Placeholder data for accounts
    const accounts = [
        { id: '1', username: 'primary_user', name: 'Primary User', isActive: true },
        { id: '2', username: 'secondary_user', name: 'Secondary User', isActive: false },
    ];

    const handleAccountSwitch = (accountId: string) => {
        // In a real app, this would switch the active account
        console.log(`Switching to account ${accountId}`);
        router.back();
    };

    const handleAddAccount = () => {
        // In a real app, this would navigate to add account flow
        signOut();
        router.replace('/(auth)/login');
    };

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Switch Accounts</Text>
                </View>

                <FlatList
                    data={accounts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.accountItem}
                            onPress={() => handleAccountSwitch(item.id)}
                            disabled={item.isActive}
                        >
                            <View style={styles.accountAvatar}>
                                <Text style={styles.avatarText}>{item.username.charAt(0).toUpperCase()}</Text>
                            </View>
                            <View style={styles.accountInfo}>
                                <Text style={styles.accountName}>{item.name}</Text>
                                <Text style={styles.accountUsername}>@{item.username}</Text>
                            </View>
                            {item.isActive && (
                                <View style={styles.activeIndicator}>
                                    <Ionicons name="checkmark-circle" size={24} color={Colors.link} />
                                </View>
                            )}
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContent}
                />

                <TouchableOpacity
                    style={styles.addAccountButton}
                    onPress={handleAddAccount}
                >
                    <Ionicons name="add-circle-outline" size={24} color={Colors.white} />
                    <Text style={styles.addAccountText}>Add Account</Text>
                </TouchableOpacity>
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
    listContent: {
        paddingHorizontal: 16,
    },
    accountItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    accountAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    avatarText: {
        color: Colors.white,
        fontSize: Fonts.sizes.lg,
        fontWeight: Fonts.weights.bold as any,
    },
    accountInfo: {
        flex: 1,
    },
    accountName: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.medium as any,
    },
    accountUsername: {
        color: Colors.grey,
        fontSize: Fonts.sizes.sm,
    },
    activeIndicator: {
        marginLeft: 10,
    },
    addAccountButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderTopWidth: 0.5,
        borderTopColor: Colors.secondary,
        marginHorizontal: 16,
    },
    addAccountText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        marginLeft: 10,
    },
}); 