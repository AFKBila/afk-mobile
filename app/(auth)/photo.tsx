import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import AuthHeader from '@/components/auth/AuthHeader'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { useAuthStore } from '@/store/useAuthStore'
import { MaterialIcons } from '@expo/vector-icons'
import AuthContainer from '@/components/auth/AuthContainer'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import { toast } from 'sonner-native'

const Photo = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const currentStep = 2; // Third step in the flow
    const { user, setUser } = useAuthStore();

    // Auto-navigate after image is selected
    useEffect(() => {
        if (profileImage) {
            const timer = setTimeout(() => {
                handleContinue();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [profileImage]);

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

    const handleContinue = async () => {
        setLoading(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Navigate to next screen
            router.push('/(auth)/country');
        } catch (error) {
            console.error('Navigation failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageSelected = async (uri: string) => {
        setProfileImage(uri);
        setLoading(true);

        try {
            // Update the store with the profile image
            const { updateUser } = useAuthStore();
            updateUser({
                profileImage: uri,
            });

            // Wait briefly to show the selected image
            setTimeout(() => {
                router.push('/(auth)/country');
            }, 2000);
        } catch (error) {
            console.error('Error processing image:', error);
            toast.error('Failed to process image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer
            totalSteps={4}
            currentStep={currentStep}
        >
            <AuthHeader title="Photo" imageSource={require('@/assets/images/photo.png')} />

            <View style={styles.container}>
                <Text style={styles.subtitle}>Add your profile picture</Text>

                <TouchableOpacity
                    style={styles.photoContainer}
                    onPress={pickImage}
                    disabled={loading}
                >
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <LoadingIndicator
                                type="pulse"
                                message="Processing your photo..."
                            />
                        </View>
                    ) : profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <MaterialIcons name="add" size={30} color={Colors.white} />
                    )}
                </TouchableOpacity>

                {profileImage && (
                    <Text style={styles.processingText}>
                        Processing your photo...
                    </Text>
                )}
            </View>
        </AuthContainer>
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
    },
    processingText: {
        color: Colors.grey,
        marginTop: 20,
        fontSize: Fonts.sizes.md,
    },
    loadingContainer: {
        marginTop: 20,
        alignItems: 'center',
    }
})