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
                data={PHOTO_DATA}
                vertical
                pagingEnabled
                showsVerticalScrollIndicator={false}
                initialScrollIndex={initialIndex}
                getItemLayout={(data, index) => ({
                    length: width + 250, // Reduced height for better performance
                    offset: (width + 250) * index,
                    index,
                })}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                keyExtractor={item => item.id}
                maxToRenderPerBatch={3} // Improve performance
                windowSize={5} // Improve performance
                removeClippedSubviews={true} // Improve performance
                renderItem={({ item }) => (
                    <View style={styles.photoContainer}>
                        <PhotoViewer
                            imageUrl={item.imageUrl}
                            username="Chioma Okafor"
                            location="Ghana"
                            photoId={item.id}
                            isActive={item.id === PHOTO_DATA[currentIndex]?.id}
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
        height: width + 250, // Reduced height for better performance
    }
}); 