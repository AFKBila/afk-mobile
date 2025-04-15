import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';
import { usePrivacyStore } from '@/store/usePrivacyStore';

// Define the types for privacy settings
type VisibilityLevel = 'everyone' | 'following' | 'none' | 'review';

interface PrivacySettings {
    mentions: VisibilityLevel;
    onlineStatus: VisibilityLevel;
    birthdayVisibility: VisibilityLevel;
    hideFollowers: boolean;
    hideFollowing: boolean;
}

export default function PrivacySettingsScreen() {
    const { privacySettings, updatePrivacy, blockedProfiles } = usePrivacyStore();

    const toggleSetting = (key: keyof PrivacySettings) => {
        if (typeof privacySettings[key] === 'boolean') {
            updatePrivacy(key, !privacySettings[key]);
        }
    };

    const changePrivacyOption = (key: keyof PrivacySettings, value: VisibilityLevel) => {
        updatePrivacy(key, value);
    };

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Privacy</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    {/* Mentions */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Mentions</Text>
                        <TouchableOpacity
                            style={styles.optionItem}
                            onPress={() => router.push('/menu/privacy/mentions')}
                        >
                            <Text style={styles.optionText}>
                                {privacySettings.mentions === 'everyone' ? 'Everyone' :
                                    privacySettings.mentions === 'following' ? 'Following' :
                                        privacySettings.mentions === 'none' ? 'None' : 'Review'}
                            </Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                    </View>

                    {/* Online Status */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Online Status</Text>
                        <TouchableOpacity
                            style={styles.optionItem}
                            onPress={() => router.push('/menu/privacy/online-status')}
                        >
                            <Text style={styles.optionText}>
                                {privacySettings.onlineStatus === 'everyone' ? 'Everyone' :
                                    privacySettings.onlineStatus === 'following' ? 'Following' : 'None'}
                            </Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                    </View>

                    {/* Birthday */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Birthday</Text>
                        <TouchableOpacity
                            style={styles.optionItem}
                            onPress={() => router.push('/menu/privacy/birthday')}
                        >
                            <Text style={styles.optionText}>
                                {privacySettings.birthdayVisibility === 'everyone' ? 'Everyone' :
                                    privacySettings.birthdayVisibility === 'following' ? 'Following' : 'None'}
                            </Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Visibility */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Profile Visibility</Text>
                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Hide Followers</Text>
                            <Switch
                                trackColor={{ false: Colors.secondary, true: Colors.primary }}
                                thumbColor={Colors.white}
                                ios_backgroundColor={Colors.secondary}
                                onValueChange={() => toggleSetting('hideFollowers')}
                                value={privacySettings.hideFollowers}
                            />
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Hide Following</Text>
                            <Switch
                                trackColor={{ false: Colors.secondary, true: Colors.primary }}
                                thumbColor={Colors.white}
                                ios_backgroundColor={Colors.secondary}
                                onValueChange={() => toggleSetting('hideFollowing')}
                                value={privacySettings.hideFollowing}
                            />
                        </View>
                    </View>

                    {/* Blocked Profiles */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Blocked Accounts</Text>
                        <TouchableOpacity
                            style={styles.navigationItem}
                            onPress={() => router.push('/menu/privacy/blocked-profiles')}
                        >
                            <Text style={styles.navigationText}>Blocked Profiles</Text>
                            <Text style={styles.countText}>{blockedProfiles.length}</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                    </View>
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
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.bold as any,
        marginBottom: 15,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    settingText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    optionText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
    navigationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    navigationText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        flex: 1,
    },
    countText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
        marginRight: 10,
    },
}); 