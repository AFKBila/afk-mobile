import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';
import { usePrivacyStore } from '@/store/usePrivacyStore';
import { showToast } from '@/utils/toast';

export default function BlockedProfilesScreen() {
    const { blockedProfiles, unblockProfile } = usePrivacyStore();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProfiles = blockedProfiles.filter(profile =>
        profile.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUnblock = (profileId) => {
        unblockProfile(profileId);
        showToast('User unblocked', 'success');
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

                {blockedProfiles.length > 0 && (
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color={Colors.grey} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search blocked profiles"
                            placeholderTextColor={Colors.grey}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                )}

                {filteredProfiles.length > 0 ? (
                    <FlatList
                        data={filteredProfiles}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.profileItem}>
                                <View style={styles.profileAvatar}>
                                    <Text style={styles.avatarText}>{item.username.charAt(0).toUpperCase()}</Text>
                                </View>
                                <View style={styles.profileInfo}>
                                    <Text style={styles.profileName}>{item.name}</Text>
                                    <Text style={styles.profileUsername}>@{item.username}</Text>
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
                        <Feather name="user-x" size={60} color={Colors.grey} />
                        <Text style={styles.emptyTitle}>No blocked profiles</Text>
                        <Text style={styles.emptyText}>
                            When you block someone, they won't be able to see your profile or contact you.
                        </Text>
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 20,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        paddingVertical: 12,
    },
    listContent: {
        paddingHorizontal: 16,
    },
    profileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    profileAvatar: {
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
    profileInfo: {
        flex: 1,
    },
    profileName: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.medium as any,
    },
    profileUsername: {
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
        paddingHorizontal: 40,
    },
    emptyTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.lg,
        fontWeight: Fonts.weights.bold as any,
        marginTop: 20,
        marginBottom: 10,
    },
    emptyText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
        textAlign: 'center',
    },
}); 