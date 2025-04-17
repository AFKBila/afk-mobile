import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import * as ImagePicker from 'expo-image-picker';

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
    const handleAvatarPress = () => {
        // Navigate to QR code scan screen
        router.push('/(home)/scan-qr');
    };

    const handleImagePicker = async () => {
        // Request permission
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            // Here you would update the user's profile image
            console.log('Selected image:', result.assets[0].uri);
            // Later functionality will be implemented to update the profile image
        }
    };

    return (
        <View style={styles.container}>
            {/* Profile Info */}
            <View style={styles.profileInfo}>
                <View style={styles.profileRow}>
                    <TouchableOpacity onPress={handleAvatarPress} style={styles.avatarContainer}>
                        <Image
                            source={require('@/assets/images/p-1.jpg')}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                    <View style={styles.profileText}>
                        <Text style={styles.name}>{"Chioma Okafor"}</Text>
                        <Text style={styles.location}>{"Nigeria"}</Text>
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
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
    },
    profileInfo: {
        marginBottom: 20,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarContainer: {
        marginRight: 12,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    profileText: {
        flex: 1,
    },
    name: {
        fontSize: Fonts.sizes.lg,
        color: Colors.brown + '95',
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