import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function SavedScreen() {
    // Placeholder data for saved posts
    const savedPosts = [
        // This would be populated with real data in a production app
    ];

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Saved</Text>
                </View>

                {savedPosts.length > 0 ? (
                    <FlatList
                        data={savedPosts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.savedItem}>
                                {/* Saved post item UI would go here */}
                            </View>
                        )}
                        contentContainerStyle={styles.listContent}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="bookmark-outline" size={60} color={Colors.grey} />
                        <Text style={styles.emptyTitle}>Save posts for later</Text>
                        <Text style={styles.emptyText}>
                            Save posts to easily find them again in the future.
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
    listContent: {
        paddingHorizontal: 16,
    },
    savedItem: {
        marginBottom: 16,
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