import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function TopicsScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [followedTopics, setFollowedTopics] = useState([
        { id: '1', name: 'Technology', isFollowed: true },
        { id: '2', name: 'Sports', isFollowed: true },
        { id: '3', name: 'Music', isFollowed: true },
    ]);

    const suggestedTopics = [
        { id: '4', name: 'Art', isFollowed: false },
        { id: '5', name: 'Food', isFollowed: false },
        { id: '6', name: 'Travel', isFollowed: false },
        { id: '7', name: 'Fashion', isFollowed: false },
        { id: '8', name: 'Movies', isFollowed: false },
        { id: '9', name: 'Books', isFollowed: false },
        { id: '10', name: 'Gaming', isFollowed: false },
    ];

    const allTopics = [...followedTopics, ...suggestedTopics];

    const filteredTopics = allTopics.filter(topic =>
        topic.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleFollow = (topicId) => {
        const updatedTopics = allTopics.map(topic =>
            topic.id === topicId ? { ...topic, isFollowed: !topic.isFollowed } : topic
        );

        setFollowedTopics(updatedTopics.filter(topic => topic.isFollowed));
    };

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Topics</Text>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={Colors.grey} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search topics"
                        placeholderTextColor={Colors.grey}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <FlatList
                    data={filteredTopics}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.topicItem}>
                            <Text style={styles.topicName}>{item.name}</Text>
                            <TouchableOpacity
                                style={[
                                    styles.followButton,
                                    item.isFollowed ? styles.followingButton : {}
                                ]}
                                onPress={() => toggleFollow(item.id)}
                            >
                                <Text style={styles.followButtonText}>
                                    {item.isFollowed ? 'Following' : 'Follow'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    ListHeaderComponent={
                        searchQuery ? null : (
                            <Text style={styles.sectionTitle}>
                                {followedTopics.length > 0 ? 'Topics you follow' : 'Suggested topics'}
                            </Text>
                        )
                    }
                    contentContainerStyle={styles.listContent}
                />
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
    sectionTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.bold as any,
        marginBottom: 15,
    },
    topicItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    topicName: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
    followButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    followingButton: {
        backgroundColor: Colors.secondary,
    },
    followButtonText: {
        color: Colors.white,
        fontSize: Fonts.sizes.sm,
        fontWeight: Fonts.weights.medium as any,
    },
}); 