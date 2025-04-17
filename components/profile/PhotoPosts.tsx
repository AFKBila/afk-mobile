import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

// Sample data - in a real app, this would come from your data store
const samplePhotoPosts = [
    { id: '1', description: 'Beautiful sunset at the beach' },
    { id: '2', description: 'Family gathering last weekend' },
    { id: '3', description: 'Traditional attire for the cultural festival' },
    { id: '4', description: 'Art exhibition in downtown Lagos' },
];

const PhotoPosts = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={samplePhotoPosts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <View style={styles.photoPlaceholder} />
                        <Text style={styles.postDescription}>{item.description}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No photo posts yet</Text>
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
    photoPlaceholder: {
        height: 200,
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        marginBottom: 10,
    },
    postDescription: {
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

export default PhotoPosts; 