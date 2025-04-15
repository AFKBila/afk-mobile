import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';
import { useUIStore } from '@/store/useUIStore';

export default function NotificationSettingsScreen() {
    const [notificationSettings, setNotificationSettings] = React.useState({
        likes: true,
        comments: true,
        mentions: true,
        follows: true,
        messages: true,
    });

    const toggleSwitch = (key: keyof typeof notificationSettings) => {
        setNotificationSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

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
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Push Notifications</Text>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Likes</Text>
                            <Switch
                                trackColor={{ false: Colors.secondary, true: Colors.blue }}
                                thumbColor={Colors.white}
                                ios_backgroundColor={Colors.secondary}
                                onValueChange={() => toggleSwitch('likes')}
                                value={notificationSettings.likes}
                            />
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Comments</Text>
                            <Switch
                                trackColor={{ false: Colors.secondary, true: Colors.blue }}
                                thumbColor={Colors.white}
                                ios_backgroundColor={Colors.secondary}
                                onValueChange={() => toggleSwitch('comments')}
                                value={notificationSettings.comments}
                            />
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Mentions</Text>
                            <Switch
                                trackColor={{ false: Colors.secondary, true: Colors.blue }}
                                thumbColor={Colors.white}
                                ios_backgroundColor={Colors.secondary}
                                onValueChange={() => toggleSwitch('mentions')}
                                value={notificationSettings.mentions}
                            />
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Follows</Text>
                            <Switch
                                trackColor={{ false: Colors.secondary, true: Colors.blue }}
                                thumbColor={Colors.white}
                                ios_backgroundColor={Colors.secondary}
                                onValueChange={() => toggleSwitch('follows')}
                                value={notificationSettings.follows}
                            />
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Messages</Text>
                            <Switch
                                trackColor={{ false: Colors.secondary, true: Colors.blue }}
                                thumbColor={Colors.white}
                                ios_backgroundColor={Colors.secondary}
                                onValueChange={() => toggleSwitch('messages')}
                                value={notificationSettings.messages}
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
}); 