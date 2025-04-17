import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

export default function ScanQRScreen() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
            // Set the selected image URI to state
            setSelectedImage(result.assets[0].uri);
            console.log('Selected image:', result.assets[0].uri);
            // Later functionality will be implemented to update the profile image in the database
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.headerTitle}>Scan QR</Text>
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
                <View style={styles.cardContainer}>

                    <View style={styles.profileSection}>
                        <Image
                            source={require('@/assets/images/p-1.jpg')}
                            style={styles.profileImage}
                        />
                        <View style={styles.profileTextContainer}>
                            <Text style={styles.profileName}>Ama Dampo</Text>
                            <Text style={styles.profileLocation}>Ghana</Text>
                        </View>
                    </View>

                    <View style={styles.qrWrapper}>
                        <View style={styles.qrPlaceholderContainer}>
                            <TouchableOpacity
                                style={styles.qrPlaceholder}
                                onPress={handleImagePicker}
                            >
                                {selectedImage ? (
                                    <Image
                                        source={{ uri: selectedImage }}
                                        style={styles.selectedImage}
                                    />
                                ) : (
                                    <Ionicons name="add" size={40} color={Colors.white} />
                                )}
                            </TouchableOpacity>

                            {/* QR Code Icon */}
                            <View style={styles.qrCodeBox}>
                                <Ionicons name="qr-code" size={30} color={Colors.white} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Bottom Actions */}
            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="copy-outline" size={24} color={Colors.white} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="share-outline" size={24} color={Colors.white} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="download-outline" size={24} color={Colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.lg,
        fontWeight: '600',
        marginRight: 24,
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: 0,
    },
    cardContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.secondary,
        padding: 16,
        position: 'relative',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    profileTextContainer: {
        flexDirection: 'column',
    },
    profileName: {
        color: Colors.brown + '95',
        fontSize: Fonts.sizes.lg,
        fontWeight: '600',
        marginBottom: 4,
    },
    profileLocation: {
        color: Colors.grey,
        fontSize: Fonts.sizes.sm,
    },
    qrWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrPlaceholderContainer: {
        position: 'relative',
        width: width - 100,
        height: width - 100,
    },
    qrPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.grey,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    qrCodeBox: {
        position: 'absolute',
        bottom: -20,
        left: -20,
        width: 60,
        height: 60,
        backgroundColor: Colors.black,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        backgroundColor: Colors.black,
    },
    actionButton: {
        width: 50,
        height: 50,
        backgroundColor: Colors.secondary,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
}); 