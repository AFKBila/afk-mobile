import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function TrendingScreen() {
    const [activeTab, setActiveTab] = useState('foryou');

    // Sample trending data
    const trendingData = {
        foryou: [
            { id: '1', topic: 'Technology', title: '#AI', posts: '1.2M posts' },
            { id: '2', topic: 'Entertainment', title: '#NewMovie', posts: '856K posts' },
            { id: '3', topic: 'Sports', title: '#WorldCup', posts: '2.3M posts' },
            { id: '4', topic: 'Music', title: '#NewAlbum', posts: '543K posts' },
            { id: '5', topic: 'Politics', title: '#Election', posts: '1.5M posts' },
        ],
        news: [
            { id: '6', topic: 'World', title: '#GlobalSummit', posts: '987K posts' },
            { id: '7', topic: 'Business', title: '#StockMarket', posts: '456K posts' },
            { id: '8', topic: 'Health', title: '#Wellness', posts: '321K posts' },
        ],
        sports: [
            { id: '9', topic: 'Football', title: '#Champions', posts: '1.8M posts' },
            { id: '10', topic: 'Basketball', title: '#NBA', posts: '1.1M posts' },
            { id: '11', topic: 'Tennis', title: '#GrandSlam', posts: '765K posts' },
        ],
        entertainment: [
            { id: '12', topic: 'Movies', title: '#Blockbuster', posts: '932K posts' },
            { id: '13', topic: 'TV Shows', title: '#SeriesFinale', posts: '654K posts' },
            { id: '14', topic: 'Celebrities', title: '#RedCarpet', posts: '789K posts' },
        ],
    };

    const tabs = [
        { id: 'foryou', label: 'For You' },
        { id: 'news', label: 'News' },
        { id: 'sports', label: 'Sports' },
        { id: 'entertainment', label: 'Entertainment' },
    ];

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Trending</Text>
                </View>

                <View style={styles.tabsContainer}>
                    <FlatList
                        data={tabs}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.tab,
                                    activeTab === item.id ? styles.activeTab : {}
                                ]}
                                onPress={() => setActiveTab(item.id)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === item.id ? styles.activeTabText : {}
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.tabsList}
                    />
                </View>

                <FlatList
                    data={trendingData[activeTab]}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.trendingItem}>
                            <View>
                                <Text style={styles.trendingTopic}>{item.topic}</Text>
                                <Text style={styles.trendingTitle}>{item.title}</Text>
                                <Text style={styles.trendingPosts}>{item.posts}</Text>
                            </View>
                            <Ionicons name="ellipsis-vertical" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                    )}
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
    tabsContainer: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    tabsList: {
        paddingHorizontal: 16,
    },
    tab: {
        paddingVertical: 15,
        marginRight: 20,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary,
    },
    tabText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
    },
    activeTabText: {
        color: Colors.white,
        fontWeight: Fonts.weights.bold as any,
    },
    listContent: {
        paddingHorizontal: 16,
    },
    trendingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    trendingTopic: {
        color: Colors.grey,
        fontSize: Fonts.sizes.sm,
    },
    trendingTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.bold as any,
        marginVertical: 5,
    },
    trendingPosts: {
        color: Colors.grey,
        fontSize: Fonts.sizes.sm,
    },
}); 