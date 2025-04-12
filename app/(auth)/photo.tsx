import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import AuthHeader from '@/components/auth/AuthHeader'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { useAuthStore } from '@/store/useAuthStore'
import { MaterialIcons } from '@expo/vector-icons'
import SwipeableScreen from '@/components/auth/SwipeableScreen'

const Photo = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const currentStep = 2; // Third step in the flow
    const { user, setUser } = useAuthStore();

    const pickImage = async () => {
        // Request permissions
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You need to allow access to your photos to continue");
            return;
        }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);

            // Update user in store
            if (user) {
                setUser({
                    ...user,
                    profileImage: result.assets[0].uri
                });
            }
        }
    };

    const handleNext = () => {
        router.push('/(auth)/country');
    };

    const handlePrevious = () => {
        router.push('/(auth)/profile-setup');
    };

    return (
        <SwipeableScreen
            totalSteps={3}
            currentStep={currentStep}
            onNext={handleNext}
            onPrevious={handlePrevious}
        >
            <AuthHeader title="Photo" imageSource={require('@/assets/images/photo.png')} />

            <View style={styles.container}>
                <Text style={styles.subtitle}>Add your profile picture</Text>

                <TouchableOpacity
                    style={styles.photoContainer}
                    onPress={pickImage}
                >
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <MaterialIcons name="add" size={30} color={Colors.white} />
                    )}
                </TouchableOpacity>
            </View>
        </SwipeableScreen>
    )
}

export default Photo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60,
    },
    subtitle: {
        fontSize: Fonts.sizes.md,
        color: Colors.grey,
        marginBottom: 40,
        textAlign: 'center',
    },
    photoContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: Colors.secondary || '#333',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    }
})