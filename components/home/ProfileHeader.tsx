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

    const handleMenu = () => {
        router.push('/(home)/menu');
    }
    return (
        <View style={styles.container}>
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

                    <TouchableOpacity style={styles.iconButton} onPress={handleMenu}>
                        <Image
                            source={require('@/assets/icons/menu.jpg')}
                            style={styles.menuIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Profile Info - Updated Layout */}
            <View style={styles.profileInfo}>
                <View style={styles.profileRow}>
                    <Image
                        source={{ uri: avatar }}
                        style={styles.avatar}
                    />
                    <View style={styles.profileText}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.location}>{location}</Text>
                    </View>
                </View>
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
    },
    menuIcon: {
        width: 28,
        height: 28,
    },
    profileInfo: {
        marginBottom: 20,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    profileText: {
        flex: 1,
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
    },
    bio: {
        fontSize: Fonts.sizes.md,
        color: Colors.white,
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
    },
    statsText: {
        color: Colors.white,
        fontSize: Fonts.sizes.sm,
        fontWeight: "bold",
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