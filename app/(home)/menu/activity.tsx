import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

// Define types for activity options
interface ActivityOption {
    id: string;
    label: string;
    icon: string;
}

// Define types for activity data
interface ActivityItem {
    id: string;
    type: 'like' | 'comment';
    username: string;
    content: string;
    time: string;
}

export default function ActivityScreen() {
    const [activeTab, setActiveTab] = useState('all');

    // Navigation options
    const activityOptions: ActivityOption[] = [
        { id: 'likes', label: 'Likes', icon: 'heart-outline' },
        { id: 'comments', label: 'Comments', icon: 'chatbubble-outline' },
        { id: 'archive', label: 'Archive', icon: 'archive-outline' },
        { id: 'all', label: 'All Activity', icon: 'list-outline' },
    ];

    // Placeholder data for activity items
    const activityData: ActivityItem[] = [
        { id: '1', type: 'like', username: 'user1', content: 'liked your post', time: '2h' },
        { id: '2', type: 'comment', username: 'user2', content: 'commented on your post', time: '3h' },
        { id: '3', type: 'like', username: 'user3', content: 'liked your comment', time: '5h' },
        { id: '4', type: 'comment', username: 'user4', content: 'replied to your comment', time: '1d' },
    ];

    const handleOptionPress = (optionId: string) => {
        if (optionId === 'archive') {
            router.push('/menu/activity/archive');
        } else {
            setActiveTab(optionId);
        }
    };

    // Filter data based on active tab
    const filteredData = activityData.filter(item => {
        if (activeTab === 'likes') return item.type === 'like';
        if (activeTab === 'comments') return item.type === 'comment';
        return true; // 'all' tab
    });

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Activity</Text>
                </View>

                {/* Activity Options */}
                <View style={styles.optionsContainer}>
                    {activityOptions.map(option => (
                        <TouchableOpacity
                            key={option.id}
                            style={styles.optionItem}
                            onPress={() => handleOptionPress(option.id)}
                        >
                            <Ionicons name={option.icon as any} size={24} color={Colors.white} />
                            <Text style={styles.optionLabel}>{option.label}</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Activity Feed - only shown if not navigating to archive */}
                {activeTab !== 'archive' && (
                    <>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>
                                {activeTab === 'likes' ? 'Likes' :
                                    activeTab === 'comments' ? 'Comments' : 'All Activity'}
                            </Text>
                        </View>

                        {filteredData.length > 0 ? (
                            <FlatList
                                data={filteredData}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.activityItem}>
                                        <View style={styles.activityIcon}>
                                            <Ionicons
                                                name={item.type === 'like' ? 'heart' : 'chatbubble'}
                                                size={16}
                                                color={Colors.white}
                                            />
                                        </View>
                                        <View style={styles.activityContent}>
                                            <Text style={styles.username}>{item.username}</Text>
                                            <Text style={styles.activityText}>{item.content}</Text>
                                        </View>
                                        <Text style={styles.timeText}>{item.time}</Text>
                                    </View>
                                )}
                                contentContainerStyle={styles.listContent}
                            />
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No activity to show</Text>
                            </View>
                        )}
                    </>
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
    optionsContainer: {
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    optionLabel: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        marginLeft: 15,
        flex: 1,
    },
    sectionHeader: {
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    sectionTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.bold as any,
    },
    listContent: {
        paddingHorizontal: 16,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    activityContent: {
        flex: 1,
    },
    username: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.medium as any,
    },
    activityText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.sm,
    },
    timeText: {
        color: Colors.grey,
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