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

// Header component for the app
const AppHeader = () => {
    const handleFavoritePress = () => {
        router.push('/(home)/favourite');
    };

    const handleLikesPress = () => {
        // Handle likes press
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

// Update the Post type and state
interface Post {
    id: string;
    text: string;
    imageUris?: string[];
    timestamp: number;
}

function Home() {
    const { isLoaded } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const handlePostSubmit = (comment: string, imageUris?: string[]) => {
        const newPost: Post = {
            id: Date.now().toString(),
            text: comment,
            imageUris,
            timestamp: Date.now()
        };
        setPosts([newPost, ...posts]);
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            // In the future, this is where you'll fetch posts from Firebase
            // For now, we'll just simulate a delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // You can add test data here if you want
            // const testPost = {
            //     id: `test-${Date.now()}`,
            //     text: 'Refreshed post',
            //     timestamp: Date.now()
            // };
            // setPosts(prevPosts => [testPost, ...prevPosts]);
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
                        <View style={styles.postContainer}>
                            {item.imageUris && item.imageUris.length > 0 && (
                                <View style={styles.imageContainer}>
                                    {item.imageUris.length === 1 ? (
                                        <Image
                                            source={{ uri: item.imageUris[0] }}
                                            style={styles.postImage}
                                            resizeMode="cover"
                                        />
                                    ) : (
                                        <FlatList
                                            data={item.imageUris}
                                            keyExtractor={(uri, index) => `${item.id}-image-${index}`}
                                            horizontal
                                            showsHorizontalScrollIndicator={true}
                                            renderItem={({ item: uri }) => (
                                                <Image
                                                    source={{ uri }}
                                                    style={styles.multipleImage}
                                                    resizeMode="cover"
                                                />
                                            )}
                                        />
                                    )}
                                </View>
                            )}
                            <Text style={styles.postText}>{item.text}</Text>
                        </View>
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
        paddingTop: 40,
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