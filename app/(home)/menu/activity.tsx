import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function ActivityScreen() {
    // Tabs for the activity screen
    const [activeTab, setActiveTab] = React.useState('likes');

    // Placeholder data - would be replaced with real data in a production app
    const placeholderData = [
        { id: '1', type: 'like', username: 'user1', content: 'liked your post', time: '2h' },
        { id: '2', type: 'comment', username: 'user2', content: 'commented on your post', time: '3h' },
        { id: '3', type: 'like', username: 'user3', content: 'liked your comment', time: '5h' },
        { id: '4', type: 'comment', username: 'user4', content: 'replied to your comment', time: '1d' },
    ];

    // Filter data based on active tab
    const filteredData = placeholderData.filter(item => {
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

                {/* Tab navigation */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'likes' && styles.activeTab]}
                        onPress={() => setActiveTab('likes')}
                    >
                        <Text style={[styles.tabText, activeTab === 'likes' && styles.activeTabText]}>Likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'comments' && styles.activeTab]}
                        onPress={() => setActiveTab('comments')}
                    >
                        <Text style={[styles.tabText, activeTab === 'comments' && styles.activeTabText]}>Comments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'all' && styles.activeTab]}
                        onPress={() => setActiveTab('all')}
                    >
                        <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All Activity</Text>
                    </TouchableOpacity>
                </View>

                {/* Activity list */}
                {filteredData.length > 0 ? (
                    <FlatList
                        data={filteredData}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.activityItem}>
                                <View style={styles.activityIcon}>
                                    <Ionicons
                                        name={item.type === 'like' ? 'heart' : 'chatbubble'}
                                        size={24}
                                        color={item.type === 'like' ? Colors.red : Colors.blue}
                                    />
                                </View>
                                <View style={styles.activityContent}>
                                    <Text style={styles.username}>@{item.username}</Text>
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
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.secondary,
        paddingHorizontal: 16,
    },
    tab: {
        paddingVertical: 12,
        marginRight: 20,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.white,
    },
    tabText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
    },
    activeTabText: {
        color: Colors.white,
        fontWeight: Fonts.weights.medium as any,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 10,
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