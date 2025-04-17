import React, { useState, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import PhotoViewer from '@/components/photo/PhotoViewer';
import { PHOTO_DATA } from '@/data';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');

export default function PhotoViewerScreen() {
    const { id } = useLocalSearchParams();
    const flatListRef = useRef<FlatList>(null);

    // Find the initial index based on the ID
    const initialIndex = PHOTO_DATA.findIndex(item => item.id === id) || 0;
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // Prepare the data with additional fields
    const posts = PHOTO_DATA.map(item => ({
        ...item,
        username: 'Chioma Okafor',
        location: 'Ghana',
        caption: 'No caption in mind, just a random & grateful Live boy 🙌',
        timestamp: new Date(),
        likeCount: 152,
        commentCount: 24
    }));

    // Handle when a photo is scrolled to
    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    // Configuration for the viewability
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={posts}
                vertical
                pagingEnabled
                showsVerticalScrollIndicator={false}
                initialScrollIndex={initialIndex}
                getItemLayout={(data, index) => ({
                    length: width + 250,
                    offset: (width + 250) * index,
                    index,
                })}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                keyExtractor={item => item.id}
                maxToRenderPerBatch={3}
                windowSize={5}
                removeClippedSubviews={true}
                renderItem={({ item }) => (
                    <View style={styles.photoContainer}>
                        <PhotoViewer
                            imageUrl={item.imageUrl}
                            username={item.username}
                            location={item.location}
                            photoId={item.id}
                            caption={item.caption}
                            timestamp={item.timestamp}
                            likeCount={item.likeCount}
                            commentCount={item.commentCount}
                            isActive={item.id === posts[currentIndex]?.id}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    photoContainer: {
        width: width,
        height: width + 250,
    }
}); 