import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';

const FixedProfileHeader = () => {
    const handleMenu = () => {
        router.push('/(home)/menu');
    }

    return (
        <View style={styles.fixedHeader}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    fixedHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: Colors.primary,
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
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
});

export default FixedProfileHeader; 