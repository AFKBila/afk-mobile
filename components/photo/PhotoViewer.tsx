import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

interface PhotoViewerProps {
    imageUrl: any;
    username: string;
    location?: string;
    photoId: string;
    isActive?: boolean;
}

const { width } = Dimensions.get('window');

const PhotoViewer: React.FC<PhotoViewerProps> = ({
    imageUrl,
    username,
    location,
    photoId,
    isActive = false
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
    };

    const handleCommentPress = () => {
        // This would open a bottom sheet in a real implementation
        console.log('Open comment bottom sheet');
    };

    // Only show the header for the first photo
    const showHeader = photoId === "1";

    return (
        <View style={styles.container}>
            {showHeader && (
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Posts</Text>
                </View>
            )}

            {/* User Info for each post */}
            <View style={styles.postHeader}>
                <Image
                    source={require('@/assets/images/p-1.jpg')}
                    style={styles.userAvatar}
                />
                <View style={styles.postUserInfo}>
                    <Text style={styles.username}>{username}</Text>
                    {location && <Text style={styles.location}>{location}</Text>}
                </View>
                <TouchableOpacity style={styles.moreButton}>
                    <MaterialIcons name="more-vert" size={24} color={Colors.white} />
                </TouchableOpacity>
            </View>

            {/* Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={imageUrl}
                    style={styles.image}
                    resizeMode="cover"
                    // Add these props to improve performance
                    fadeDuration={0}
                    progressiveRenderingEnabled={true}
                />
            </View>

            {/* Action Buttons */}
            <View style={styles.actionBar}>
                <View style={styles.leftActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleLike}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={isLiked ? "heart" : "heart-outline"}
                            size={24}
                            color={isLiked ? "#FF3B30" : Colors.white}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleCommentPress}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="chatbubble-outline" size={22} color={Colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="paper-plane-outline" size={22} color={Colors.white} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleSave}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name={isSaved ? "bookmark" : "bookmark-outline"}
                        size={22}
                        color={Colors.white}
                    />
                </TouchableOpacity>
            </View>

            {/* Like Count with Avatars */}
            <View style={styles.likeSection}>
                <View style={styles.likeAvatars}>
                    <Image
                        source={require('@/assets/images/p-1.jpg')}
                        style={[styles.likeAvatar, { zIndex: 3, marginLeft: 0 }]}
                    />
                    <Image
                        source={require('@/assets/images/p-1.jpg')}
                        style={[styles.likeAvatar, { zIndex: 2, marginLeft: -10 }]}
                    />
                    <Image
                        source={require('@/assets/images/p-1.jpg')}
                        style={[styles.likeAvatar, { zIndex: 1, marginLeft: -10 }]}
                    />
                </View>
                <Text style={styles.likeCount}>
                    Liked by <Text style={styles.boldText}>_maame_dufie_</Text> and others
                </Text>
            </View>

            {/* Caption */}
            <View style={styles.captionContainer}>
                <Text style={styles.captionUsername}>{username}</Text>
                <Text style={styles.caption}>No caption in mind, just a random & grateful Live boy 🙌</Text>
            </View>

            {/* View all comments */}
            <TouchableOpacity
                style={styles.viewCommentsButton}
                onPress={handleCommentPress}
                activeOpacity={0.7}
            >
                <Text style={styles.viewCommentsText}>View all 24 comments</Text>
            </TouchableOpacity>

            {/* Timestamp */}
            <Text style={styles.timestamp}>28 November 2024</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: Colors.black,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.lg,
        fontWeight: '600',
        marginLeft: 20,
    },
    userInfo: {
        flex: 1,
        marginLeft: 10,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    userAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 10,
    },
    postUserInfo: {
        flex: 1,
    },
    username: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: '600',
    },
    location: {
        color: Colors.grey,
        fontSize: Fonts.sizes.xs,
    },
    moreButton: {
        padding: 5,
    },
    imageContainer: {
        width: width,
        height: width,
        backgroundColor: Colors.black,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    actionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    leftActions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginRight: 16,
        padding: 2, // Add padding for better touch target
    },
    likeSection: {
        paddingHorizontal: 16,
        marginBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeAvatars: {
        flexDirection: 'row',
        marginRight: 8,
    },
    likeAvatar: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: Colors.black,
    },
    likeCount: {
        color: Colors.white,
        fontSize: Fonts.sizes.xs,
    },
    boldText: {
        fontWeight: '700',
    },
    captionContainer: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 2,
    },
    captionUsername: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: Fonts.sizes.xs,
        marginRight: 6,
    },
    caption: {
        color: Colors.white,
        fontSize: Fonts.sizes.xs,
        flex: 1,
    },
    viewCommentsButton: {
        paddingHorizontal: 16,
        marginBottom: 2,
    },
    viewCommentsText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.xs,
    },
    timestamp: {
        paddingHorizontal: 16,
        color: Colors.grey,
        fontSize: Fonts.sizes.xxs,
        marginBottom: 10,
    },
});

export default PhotoViewer;
