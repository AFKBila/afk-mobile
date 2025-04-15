import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function HelpScreen() {
    const helpCategories = [
        {
            title: 'Account and Profile',
            items: [
                'Login and signup issues',
                'Profile settings',
                'Account verification',
                'Password reset',
            ]
        },
        {
            title: 'Privacy and Security',
            items: [
                'Privacy settings',
                'Blocked accounts',
                'Report a problem',
                'Security concerns',
            ]
        },
        {
            title: 'Content and Features',
            items: [
                'Posting issues',
                'Comments and likes',
                'Notifications',
                'Messaging',
            ]
        },
        {
            title: 'Technical Issues',
            items: [
                'App crashes',
                'Performance problems',
                'Media upload issues',
                'Connection problems',
            ]
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
                    <Text style={styles.headerTitle}>Help</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color={Colors.grey} style={styles.searchIcon} />
                        <Text style={styles.searchPlaceholder}>Search for help</Text>
                    </View>

                    <View style={styles.contactSection}>
                        <Text style={styles.contactTitle}>Contact Support</Text>
                        <TouchableOpacity style={styles.contactButton}>
                            <Ionicons name="chatbubble-outline" size={20} color={Colors.white} />
                            <Text style={styles.contactButtonText}>Chat with Support</Text>
                        </TouchableOpacity>
                    </View>

                    {helpCategories.map((category, index) => (
                        <View key={index} style={styles.categorySection}>
                            <Text style={styles.categoryTitle}>{category.title}</Text>
                            {category.items.map((item, itemIndex) => (
                                <TouchableOpacity key={itemIndex} style={styles.helpItem}>
                                    <Text style={styles.helpItemText}>{item}</Text>
                                    <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                                </TouchableOpacity>
                            ))}
                        </View>
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchPlaceholder: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
    },
    contactSection: {
        marginBottom: 30,
    },
    contactTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.bold as any,
        marginBottom: 15,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    contactButtonText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        marginLeft: 10,
    },
    categorySection: {
        marginBottom: 30,
    },
    categoryTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.bold as any,
        marginBottom: 15,
    },
    helpItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    helpItemText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
}); 