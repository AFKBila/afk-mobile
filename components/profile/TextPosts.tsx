import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

// Sample data - in a real app, this would come from your data store
const sampleTextPosts = [
    { id: '1', content: 'This is a text post about my thoughts on life.' },
    { id: '2', content: 'Another day, another opportunity to make a difference.' },
    { id: '3', content: 'Just finished reading an amazing book on African history!' },
    { id: '4', content: 'Reflecting on the beauty of our cultural heritage.' },
];

const TextPosts = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={sampleTextPosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Text style={styles.postContent}>{item.content}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No text posts yet</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    postContainer: {
        padding: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    postContent: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
        textAlign: 'center',
    },
});

export default TextPosts; 