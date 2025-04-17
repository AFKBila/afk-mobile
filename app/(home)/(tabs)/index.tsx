import { Button, StyleSheet, Text, View, TouchableOpacity, Alert, Image, FlatList, RefreshControl } from 'react-native'
import React, { useState, useCallback } from 'react'
import MainContainer from '@/common/MainContainer'
import { useAuth } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { Ionicons } from '@expo/vector-icons'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import CommentInput from '@/components/home/CommentInput'
import PostItem, { PostData } from '@/components/home/PostItem'

// Header component for the app
const AppHeader = () => {
    const handleFavoritePress = () => {
        router.push('/(home)/scan-qr');
    };

    const handleLikesPress = () => {
        // Handle likes press
        router.push('/(home)/favourite');
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('@/assets/images/afrokabila-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton} onPress={handleFavoritePress}>
                    <View style={styles.badgeContainer}>
                        <Image source={require('@/assets/icons/favourite.jpg')} style={styles.starIcon} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleLikesPress}>
                    <Ionicons name="heart-outline" size={24} color={Colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

function Home() {
    const { isLoaded, userId } = useAuth();
    const [posts, setPosts] = useState<PostData[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const handlePostSubmit = (comment: string, imageUris?: string[]) => {
        const newPost: PostData = {
            id: Date.now().toString(),
            text: comment,
            imageUris,
            timestamp: Date.now(),
            username: "chiomao_kafor",
            userAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
            likes: 0,
            comments: 0
        };
        setPosts([newPost, ...posts]);
    };

    const handleLike = (postId: string) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? { ...post, likes: post.likes + 1, likedBy: [...(post.likedBy || []), "user123"] }
                    : post
            )
        );
    };

    const handleComment = (postId: string) => {
        // Navigate to comments screen or open comments modal (gorhom bottom sheet)
        console.log(`Comment on post ${postId}`);
    };

    const handleSave = (postId: string) => {
        console.log(`Save post ${postId}`);
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            // In the future, this is where you'll fetch posts from Firebase
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('Error refreshing posts:', error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    if (!isLoaded) {
        return (
            <MainContainer style={styles.loadingContainer}>
                <LoadingIndicator type="spinner" size="large" />
                <Text style={styles.loadingText}>Loading...</Text>
            </MainContainer>
        );
    }

    return (
        <MainContainer style={styles.container}>
            <AppHeader />
            <CommentInput onSubmit={handlePostSubmit} />

            {posts.length > 0 ? (
                <FlatList
                    data={posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PostItem
                            post={item}
                            onLike={handleLike}
                            onComment={handleComment}
                            onSave={handleSave}
                        />
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={Colors.white}
                            colors={[Colors.primary]}
                            progressBackgroundColor={Colors.secondary}
                        />
                    }
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No posts yet. Be the first to share something!</Text>
                </View>
            )}
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        padding: 0,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 15,
        backgroundColor: Colors.primary,
        width: '100%',
    },
    logoContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    logo: {
        width: 150,
        height: 30,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 20,
    },
    badgeContainer: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postContainer: {
        padding: 16,
    },
    imageContainer: {
        marginBottom: 8,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    multipleImage: {
        width: 250,
        height: 200,
        borderRadius: 8,
        marginRight: 8,
    },
    postText: {
        color: Colors.white,
        fontFamily: Fonts.primary,
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
        fontFamily: Fonts.primary,
        fontSize: Fonts.sizes.md,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black,
    },
    loadingText: {
        color: Colors.white,
        marginTop: 10,
        fontSize: Fonts.sizes.md,
        fontFamily: Fonts.primary,
    },
    starIcon: {
        width: 20,
        height: 20,
    },
})

export default Home;