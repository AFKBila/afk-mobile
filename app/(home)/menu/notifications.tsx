import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function NotificationSettingsScreen() {
    const [notificationSettings, setNotificationSettings] = useState({
        likes: 'everyone', // 'everyone', 'following', 'off'
        replies: 'everyone',
        mentions: 'everyone',
        newFollowers: true,
        productAnnouncements: true,
        activityPoints: true,
        verificationStatus: true,
    });

    const toggleSwitch = (key: string) => {
        setNotificationSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const changeNotificationType = (key: string, value: string) => {
        setNotificationSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const pauseOptions = [
        { label: '30 minutes', value: '30min' },
        { label: '2 hours', value: '2h' },
        { label: '4 hours', value: '4h' },
        { label: '8 hours', value: '8h' },
    ];

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    {/* Pause Notifications */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pause All Notifications</Text>
                        <View style={styles.pauseContainer}>
                            {pauseOptions.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.pauseButton}
                                    onPress={() => { }}
                                >
                                    <Text style={styles.pauseButtonText}>{option.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Likes */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Likes</Text>
                        <TouchableOpacity
                            style={[
                                styles.optionItem,
                                notificationSettings.likes === 'everyone' && styles.selectedOption
                            ]}
                            onPress={() => changeNotificationType('likes', 'everyone')}
                        >
                            <Text style={styles.optionText}>From everyone</Text>
                            {notificationSettings.likes === 'everyone' && (
                                <Ionicons name="checkmark" size={20} color={Colors.white} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.optionItem,
                                notificationSettings.likes === 'following' && styles.selectedOption
                            ]}
                            onPress={() => changeNotificationType('likes', 'following')}
                        >
                            <Text style={styles.optionText}>From following</Text>
                            {notificationSettings.likes === 'following' && (
                                <Ionicons name="checkmark" size={20} color={Colors.white} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.optionItem,
                                notificationSettings.likes === 'off' && styles.selectedOption
                            ]}
                            onPress={() => changeNotificationType('likes', 'off')}
                        >
                            <Text style={styles.optionText}>Off</Text>
                            {notificationSettings.likes === 'off' && (
                                <Ionicons name="checkmark" size={20} color={Colors.white} />
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Replies */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Replies</Text>
                        <TouchableOpacity
                            style={[
                                styles.optionItem,
                                notificationSettings.replies === 'everyone' && styles.selectedOption
                            ]}
                            onPress={() => changeNotificationType('replies', 'everyone')}
                        >
                            <Text style={styles.optionText}>From everyone</Text>
                            {notificationSettings.replies === 'everyone' && (
                                <Ionicons name="checkmark" size={20} color={Colors.white} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.optionItem,
                                notificationSettings.replies === 'following' && styles.selectedOption
                            ]}
                            onPress={() => changeNotificationType('replies', 'following')}
                        >
                            <Text style={styles.optionText}>From following</Text>
                            {notificationSettings.replies === 'following' && (
                                <Ionicons name="checkmark" size={20} color={Colors.white} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.optionItem,
                                notificationSettings.replies === 'off' && styles.selectedOption
                            ]}
                            onPress={() => changeNotificationType('replies', 'off')}
                        >
                            <Text style={styles.optionText}>Off</Text>
                            {notificationSettings.replies === 'off' && (
                                <Ionicons name="checkmark" size={20} color={Colors.white} />
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Mentions */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Mentions</Text>
                        <TouchableOpacity
                            style={[
                                styles.optionItem,
                                notificationSettings.mentions === 'everyone' && styles.selectedOption
                            ]}
                            onPress={() => changeNotificationType('mentions', 'everyone')}
                        >
                            <Text style={styles.optionText}>From everyone</Text>
                            {notificationSettings.mentions === 'everyone' && (
                                <Ionicons name="checkmark" size={20} color={Colors.white} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.optionItem,
                                notificationSettings.mentions === 'following' && styles.selectedOption
                            ]}
                            onPress={() => changeNotificationType('mentions', 'following')}
                        >
                            <Text style={styles.optionText}>From following</Text>
                            {notificationSettings.mentions === 'following' && (
                                <Ionicons name="checkmark" size={20} color={Colors.white} />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.optionItem,
                                notificationSettings.mentions === 'off' && styles.selectedOption
                            ]}
                            onPress={() => changeNotificationType('mentions', 'off')}
                        >
                            <Text style={styles.optionText}>Off</Text>
                            {notificationSettings.mentions === 'off' && (
                                <Ionicons name="checkmark" size={20} color={Colors.white} />
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Other Notifications */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Other Notifications</Text>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>New Followers</Text>
                            <Switch
                                trackColor={{ false: Colors.secondary, true: Colors.blue }}
                                thumbColor={Colors.white}
                                ios_backgroundColor={Colors.secondary}
                                onValueChange={() => toggleSwitch('newFollowers')}
                                value={notificationSettings.newFollowers}
                            />
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Product Announcements</Text>
                            <Switch
                                trackColor={{ false: Colors.secondary, true: Colors.blue }}
                                thumbColor={Colors.white}
                                ios_backgroundColor={Colors.secondary}
                                onValueChange={() => toggleSwitch('productAnnouncements')}
                                value={notificationSettings.productAnnouncements}
                            />
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Activity Points</Text>
                            <Switch
                                trackColor={{ false: Colors.secondary, true: Colors.blue }}
                                thumbColor={Colors.white}
                                ios_backgroundColor={Colors.secondary}
                                onValueChange={() => toggleSwitch('activityPoints')}
                                value={notificationSettings.activityPoints}
                            />
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Verification Status</Text>
                            <Switch
                                trackColor={{ false: Colors.secondary, true: Colors.blue }}
                                thumbColor={Colors.white}
                                ios_backgroundColor={Colors.secondary}
                                onValueChange={() => toggleSwitch('verificationStatus')}
                                value={notificationSettings.verificationStatus}
                            />
                        </View>
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
    pauseContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    pauseButton: {
        backgroundColor: Colors.secondary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginBottom: 10,
        width: '48%',
        alignItems: 'center',
    },
    pauseButtonText: {
        color: Colors.white,
        fontSize: Fonts.sizes.sm,
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    selectedOption: {
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    optionText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
}); 