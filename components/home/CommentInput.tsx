import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Keyboard,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Text } from '@/components/ui/Text';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

interface CommentInputProps {
    onSubmit?: (comment: string, imageUri?: string) => void;
    placeholder?: string;
    username?: string;
}

const CommentInput: React.FC<CommentInputProps> = ({
    onSubmit,
    placeholder = "What's new?",
    username = "chiomao_kafor"
}) => {
    const [comment, setComment] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleSubmit = () => {
        if ((comment.trim().length > 0 || selectedImage) && onSubmit) {
            onSubmit(comment, selectedImage || undefined);
            setComment('');
            setSelectedImage(null);
            Keyboard.dismiss();
        }
    };

    const requestPermissions = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();

        if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
            Alert.alert(
                'Permissions Required',
                'Please grant camera and media library permissions to use this feature.',
                [{ text: 'OK' }]
            );
            return false;
        }
        return true;
    };

    const openCamera = async () => {
        const hasPermissions = await requestPermissions();
        if (!hasPermissions) return;

        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setSelectedImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            Alert.alert('Error', 'Failed to take photo. Please try again.');
        }
    };

    const openImagePicker = async () => {
        const hasPermissions = await requestPermissions();
        if (!hasPermissions) return;

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setSelectedImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileImageContainer}>
                <Image
                    source={require('@/assets/images/p-1.jpg')}
                    style={styles.profileImage}
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.username}>{username}</Text>
                <View style={[
                    styles.inputContainer,
                    isFocused && styles.inputContainerFocused
                ]}>
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        placeholderTextColor={Colors.grey}
                        value={comment}
                        onChangeText={setComment}
                        multiline
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />

                    {selectedImage && (
                        <View style={styles.selectedImageContainer}>
                            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                            <TouchableOpacity
                                style={styles.removeImageButton}
                                onPress={() => setSelectedImage(null)}
                            >
                                <Ionicons name="close-circle" size={24} color={Colors.white} />
                            </TouchableOpacity>
                        </View>
                    )}

                    {isFocused && (
                        <View style={styles.actionButtons}>
                            <View style={styles.iconButtonsGroup}>
                                <TouchableOpacity style={styles.iconButton} onPress={openImagePicker}>
                                    <Ionicons name="image-outline" size={24} color={Colors.grey} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconButton} onPress={openCamera}>
                                    <Ionicons name="camera-outline" size={24} color={Colors.grey} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.postButton,
                                    (comment.trim().length > 0 || selectedImage) && styles.postButtonActive
                                ]}
                                onPress={handleSubmit}
                                disabled={comment.trim().length === 0 && !selectedImage}
                            >
                                <Text
                                    style={[
                                        styles.postButtonText,
                                        (comment.trim().length > 0 || selectedImage) && styles.postButtonTextActive
                                    ]}
                                >
                                    Post
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    profileImageContainer: {
        marginRight: 12,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    contentContainer: {
        flex: 1,
    },
    username: {
        color: Colors.white,
        fontFamily: Fonts.medium,
        fontSize: Fonts.sizes.sm,
        marginBottom: 4,
    },
    inputContainer: {
        backgroundColor: 'transparent',
        borderRadius: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    inputContainerFocused: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    input: {
        color: Colors.white,
        fontFamily: Fonts.primary,
        fontSize: Fonts.sizes.md,
        minHeight: 24,
        padding: 0,
    },
    selectedImageContainer: {
        marginTop: 8,
        position: 'relative',
    },
    selectedImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    removeImageButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 12,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        paddingTop: 8,
    },
    iconButtonsGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 4,
        marginRight: 3,
    },
    postButton: {
        backgroundColor: Colors.secondary,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 16,
    },
    postButtonActive: {
        backgroundColor: Colors.primary,
    },
    postButtonText: {
        color: Colors.grey,
        fontFamily: Fonts.medium,
        fontSize: Fonts.sizes.sm,
    },
    postButtonTextActive: {
        color: Colors.white,
    }
});

export default CommentInput; 