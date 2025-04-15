import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';
import { usePrivacyStore } from '@/store/usePrivacyStore';

export default function BlockedProfilesScreen() {
    const { blockedProfiles, unblockProfile } = usePrivacyStore();

    // This would be replaced with actual user data in a real implementation
    const blockedUsers = blockedProfiles.map(id => ({
        id,
        username: `user_${id.substring(0, 5)}`,
        name: `User ${id.substring(0, 5)}`
    }));

    const handleUnblock = (id: string) => {
        unblockProfile(id);
    };

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Blocked Profiles</Text>
                </View>

                {blockedUsers.length > 0 ? (
                    <FlatList
                        data={blockedUsers}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.userItem}>
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{item.name}</Text>
                                    <Text style={styles.userUsername}>@{item.username}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.unblockButton}
                                    onPress={() => handleUnblock(item.id)}
                                >
                                    <Text style={styles.unblockText}>Unblock</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        contentContainerStyle={styles.listContent}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No blocked profiles</Text>
                    </View>
                )}
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
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.medium as any,
    },
    userUsername: {
        color: Colors.grey,
        fontSize: Fonts.sizes.sm,
    },
    unblockButton: {
        backgroundColor: Colors.secondary,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    unblockText: {
        color: Colors.white,
        fontSize: Fonts.sizes.sm,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
    },
}); 