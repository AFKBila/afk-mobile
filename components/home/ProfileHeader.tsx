import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface ProfileHeaderProps {
    name: string;
    location: string;
    bio: string;
    avatar: string;
    followers: number;
    following: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
    name,
    location,
    bio,
    avatar,
    followers,
    following
}) => {
    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color={Colors.white} />
                </TouchableOpacity>

                <View style={styles.topBarRight}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Image
                            source={require('@/assets/icons/favourite.jpg')}
                            style={styles.bookmarkIcon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="heart-outline" size={24} color={Colors.white} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton}>
                        <Image
                            source={require('@/assets/icons/menu.jpg')}
                            style={styles.menuIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Profile Info */}
            <View style={styles.profileInfo}>
                <Image
                    source={{ uri: avatar }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.location}>{location}</Text>
                <Text style={styles.bio}>{bio}</Text>
            </View>

            {/* Stats Row */}
            <View style={styles.statsContainer}>
                <View style={styles.stats}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <MaterialIcons name="star" size={15} color={Colors.white} />
                        <Text style={styles.statsText}>
                            {followers} Followers - {following} Following
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingHorizontal: 16,
        backgroundColor: Colors.primary,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    topBarRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    iconButton: {
        padding: 5,
    },
    bookmarkIcon: {
        width: 24,
        height: 24,
        // tintColor: Colors.white,
    },
    menuIcon: {
        width: 28,
        height: 28,
        // tintColor: Colors.white,
    },
    profileInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: Fonts.sizes.lg,
        color: Colors.white,
        fontWeight: '600',
        marginBottom: 4,
    },
    location: {
        fontSize: Fonts.sizes.sm,
        color: Colors.grey,
        marginBottom: 10,
    },
    bio: {
        fontSize: Fonts.sizes.md,
        color: Colors.white,
        textAlign: 'center',
        lineHeight: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        // gap: 10,
    },
    statsText: {
        color: Colors.white,
        fontSize: Fonts.sizes.sm,
    },
    editButton: {
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 15,
    },
    editButtonText: {
        color: Colors.black,
        fontSize: Fonts.sizes.sm,
        fontWeight: '500',
    },
});

export default ProfileHeader;