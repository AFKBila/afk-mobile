import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

// Sample data - in a real app, this would come from your data store
const sampleMusicPosts = [
    { id: '1', title: 'New Afrobeat track by Burna Boy', source: 'YouTube' },
    { id: '2', title: 'Traditional drumming performance', source: 'YouTube' },
    { id: '3', title: 'My favorite Amapiano mix', source: 'YouTube' },
    { id: '4', title: 'Classic highlife music collection', source: 'YouTube' },
];

const MusicPosts = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={sampleMusicPosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <View style={styles.videoPlaceholder} />
                        <Text style={styles.postTitle}>{item.title}</Text>
                        <Text style={styles.sourceText}>Source: {item.source}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No music posts yet</Text>
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
    videoPlaceholder: {
        height: 200,
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        marginBottom: 10,
    },
    postTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    sourceText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.sm,
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

export default MusicPosts; 