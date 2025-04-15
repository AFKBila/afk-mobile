import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function MoreOptionsScreen() {
    const moreOptions = [
        {
            label: 'Verification',
            onPress: () => router.push('/(home)/menu/more/verification')
        },
        {
            label: 'Interests',
            onPress: () => router.push('/(home)/menu/more/interests')
        },
        {
            label: 'Topics',
            onPress: () => router.push('/(home)/menu/more/topics')
        },
        {
            label: 'Countries',
            onPress: () => router.push('/(home)/menu/more/countries')
        },
        {
            label: 'Trending',
            onPress: () => router.push('/(home)/menu/more/trending')
        },
        {
            label: 'Help',
            onPress: () => router.push('/(home)/menu/more/help')
        },
        {
            label: 'About',
            onPress: () => router.push('/(home)/menu/more/about')
        },
        {
            label: 'Go to Website',
            onPress: () => { }
        },
    ];

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>More</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    {moreOptions.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={option.onPress}
                        >
                            <Text style={styles.menuItemText}>{option.label}</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 16,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.lg,
        fontWeight: Fonts.weights.bold as any,
        marginLeft: 20,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    menuItemText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
}); 