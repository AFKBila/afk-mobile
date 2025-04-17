import React, { useState, useRef } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
    LogBox
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Text } from '@/components/ui/Text';

export interface PostData {
    id: string;
    text: string;
    imageUris?: string[];
    timestamp: number;
    username: string;
    userAvatar: string;
    likes: number;
    comments: number;
    likedBy?: string[];
}

interface PostItemProps {
    post: PostData;
    onLike?: (postId: string) => void;
    onComment?: (postId: string) => void;
    onSave?: (postId: string) => void;
}

const { width } = Dimensions.get('window');

const PostItem: React.FC<PostItemProps> = ({
    post,
    onLike,
    onComment,
    onSave
}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    LogBox.ignoreAllLogs();

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (onLike) onLike(post.id);
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
        if (onSave) onSave(post.id);
    };

    const handleComment = () => {
        if (onComment) onComment(post.id);
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    };

    return (
        <View style={styles.container}>
            {/* Post Header */}
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: post.userAvatar }}
                        style={styles.avatar}
                    />
                    <Text style={styles.username}>{post.username}</Text>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                    <Ionicons name="ellipsis-horizontal" size={20} color={Colors.white} />
                </TouchableOpacity>
            </View>

            {/* Post Image(s) */}
            {post.imageUris && post.imageUris.length > 0 && (
                <View style={styles.imageContainer}>
                    {post.imageUris.length === 1 ? (
                        <Image
                            source={{ uri: post.imageUris[0] }}
                            style={styles.singleImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <FlatList
                            ref={flatListRef}
                            data={post.imageUris}
                            keyExtractor={(uri, index) => `${post.id}-image-${index}`}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={width}
                            decelerationRate="fast"
                            snapToAlignment="start"
                            bounces={false}
                            renderItem={({ item: uri }) => (
                                <View style={styles.imageWrapper}>
                                    <Image
                                        source={{ uri }}
                                        style={styles.multipleImage}
                                        resizeMode="cover"
                                    />
                                </View>
                            )}
                        />
                    )}
                </View>
            )}

            {/* post captions */}
            {post.text && (
                <View style={styles.captionContainer}>
                    <Text style={styles.username}>{post.username}</Text>
                    <Text style={styles.captionText}>{post.text}</Text>
                </View>
            )}

            {/* Action Buttons */}
            <View style={styles.actionsContainer}>
                <View style={styles.leftActions}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
                        <Ionicons
                            name={isLiked ? "heart" : "heart-outline"}
                            size={24}
                            color={isLiked ? Colors.error : Colors.white}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
                        <Ionicons name="chatbubble-outline" size={22} color={Colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="paper-plane-outline" size={22} color={Colors.white} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleSave}>
                    <Ionicons
                        name={isSaved ? "bookmark" : "bookmark-outline"}
                        size={24}
                        color={Colors.white}
                    />
                </TouchableOpacity>
            </View>

            {/* Likes */}
            {post.likes > 0 && (
                <View style={styles.likesContainer}>
                    <Text style={styles.likesText}>
                        {post.likedBy && post.likedBy.length > 0 ? (
                            <>Liked by <Text style={styles.boldText}>_{post.likedBy[0]}</Text> and <Text style={styles.boldText}>others</Text></>
                        ) : (
                            <>{post.likes} {post.likes === 1 ? 'like' : 'likes'}</>
                        )}
                    </Text>
                </View>
            )}

            {/* Caption */}
            {/* {post.text && (
                <View style={styles.captionContainer}>
                    <Text style={styles.username}>{post.username}</Text>
                    <Text style={styles.captionText}>{post.text}</Text>
                </View>
            )} */}

            {/* Comments Count */}
            {post.comments > 0 && (
                <TouchableOpacity style={styles.commentsContainer}>
                    <Text style={styles.commentsText}>
                        View all {post.comments} comments
                    </Text>
                </TouchableOpacity>
            )}

            {/* Date */}
            <Text style={styles.dateText}>{formatDate(post.timestamp)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    username: {
        color: Colors.white,
        fontFamily: Fonts.medium,
        fontSize: Fonts.sizes.sm,
        marginRight: 4,
    },
    moreButton: {
        padding: 4,
    },
    imageContainer: {
        width: '100%',
        overflow: 'hidden',
    },
    imageWrapper: {
        width: width,
        height: width,
    },
    singleImage: {
        width: '100%',
        height: width, // Square image
        backgroundColor: Colors.secondary,
    },
    multipleImage: {
        width: width,
        height: width,
        backgroundColor: Colors.secondary,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    leftActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        marginRight: 16,
    },
    likesContainer: {
        paddingHorizontal: 12,
        marginBottom: 4,
    },
    likesText: {
        color: Colors.white,
        fontFamily: Fonts.primary,
        fontSize: Fonts.sizes.sm,
    },
    boldText: {
        fontFamily: Fonts.medium,
        color: Colors.white,
    },
    captionContainer: {
        paddingHorizontal: 12,
        flexDirection: 'row',
        marginBottom: 4,
    },
    captionText: {
        color: Colors.white,
        fontFamily: Fonts.primary,
        fontSize: Fonts.sizes.sm,
        flex: 1,
        flexWrap: 'wrap',
    },
    commentsContainer: {
        paddingHorizontal: 12,
        marginBottom: 4,
    },
    commentsText: {
        color: Colors.grey,
        fontFamily: Fonts.primary,
        fontSize: Fonts.sizes.sm,
    },
    dateText: {
        color: Colors.grey,
        fontFamily: Fonts.primary,
        fontSize: Fonts.sizes.xxs,
        paddingHorizontal: 12,
        marginTop: 4,
    }
});

export default PostItem; 