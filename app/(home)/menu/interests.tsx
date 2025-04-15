import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function InterestsScreen() {
    // Sample interests categories
    const interestCategories = [
        { id: '1', name: 'Music' },
        { id: '2', name: 'Sports' },
        { id: '3', name: 'Technology' },
        { id: '4', name: 'Art' },
        { id: '5', name: 'Food' },
        { id: '6', name: 'Travel' },
        { id: '7', name: 'Fashion' },
        { id: '8', name: 'Movies' },
        { id: '9', name: 'Books' },
        { id: '10', name: 'Gaming' },
    ];

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Interests</Text>
                </View>

                <Text style={styles.description}>
                    Select topics you're interested in to personalize your experience.
                </Text>

                <FlatList
                    data={interestCategories}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.interestItem}>
                            <Text style={styles.interestName}>{item.name}</Text>
                            <Ionicons name="add-circle-outline" size={24} color={Colors.white} />
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContent}
                />
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
    description: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    listContent: {
        paddingHorizontal: 16,
    },
    interestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    interestName: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
}); 