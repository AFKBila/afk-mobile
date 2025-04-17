import { Button, StyleSheet, Text, View, TouchableOpacity, Alert, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
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
    imageUri?: string;
    timestamp: number;
}

function Home() {
    const { isLoaded } = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);

    const handlePostSubmit = (comment: string, imageUri?: string) => {
        const newPost: Post = {
            id: Date.now().toString(),
            text: comment,
            imageUri,
            timestamp: Date.now()
        };
        setPosts([newPost, ...posts]);
    };

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
                            {item.imageUri && (
                                <Image
                                    source={{ uri: item.imageUri }}
                                    style={styles.postImage}
                                    resizeMode="cover"
                                />
                            )}
                            <Text style={styles.postText}>{item.text}</Text>
                        </View>
                    )}
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
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
})

export default Home;