import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { PHOTO_DATA } from '@/data';

// Fixed number of columns
const numColumns = 3;

// Fallback data in case the import fails
const fallbackData = [
    { id: '1', imageUrl: require('@/assets/images/p-1.jpg') },
    { id: '2', imageUrl: require('@/assets/images/p-1.jpg') },
    { id: '3', imageUrl: require('@/assets/images/p-1.jpg') },
];

const PhotoPosts = () => {
    // Use the imported data or fallback to an empty array if undefined
    const photoData = PHOTO_DATA || fallbackData;

    const handlePhotoPress = (id: string) => {
        router.push(`/(home)/photo-viewer?id=${id}`);
    };

    const renderItem = ({ item }: { item: { id: string; imageUrl: any } }) => (
        <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => handlePhotoPress(item.id)}
        >
            <Image source={item.imageUrl} style={styles.image} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {photoData.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No photos yet</Text>
                </View>
            ) : (
                <FlatList
                    data={photoData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={numColumns}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.gridContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    gridContainer: {
        padding: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
    },
    row: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    imageContainer: {
        width: 120,
        height: 120,
        margin: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default PhotoPosts; 