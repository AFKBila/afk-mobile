import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function InterestsScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([
        'Technology', 'Music', 'Sports'
    ]);

    // Sample list of interests
    const allInterests = [
        'Technology', 'Music', 'Sports', 'Art', 'Photography',
        'Food', 'Travel', 'Fashion', 'Movies', 'Books',
        'Gaming', 'Science', 'Health', 'Business', 'Politics',
        'Education', 'Environment', 'History', 'Design', 'Fitness'
    ];

    const filteredInterests = allInterests.filter(interest =>
        interest.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

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
                    Select your interests to personalize your experience and discover content that matters to you.
                </Text>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={Colors.grey} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search interests"
                        placeholderTextColor={Colors.grey}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <FlatList
                    data={filteredInterests}
                    keyExtractor={item => item}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.interestItem,
                                selectedInterests.includes(item) ? styles.selectedInterest : {}
                            ]}
                            onPress={() => toggleInterest(item)}
                        >
                            <Text
                                style={[
                                    styles.interestText,
                                    selectedInterests.includes(item) ? styles.selectedInterestText : {}
                                ]}
                            >
                                {item}
                            </Text>
                            {selectedInterests.includes(item) && (
                                <Ionicons name="checkmark" size={16} color={Colors.white} style={styles.checkIcon} />
                            )}
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.listContent}
                />

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 20,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        paddingVertical: 12,
    },
    listContent: {
        paddingHorizontal: 8,
    },
    interestItem: {
        backgroundColor: Colors.secondary,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedInterest: {
        backgroundColor: Colors.primary,
    },
    interestText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
    selectedInterestText: {
        fontWeight: Fonts.weights.medium as any,
    },
    checkIcon: {
        marginLeft: 5,
    },
    footer: {
        padding: 16,
        borderTopWidth: 0.5,
        borderTopColor: Colors.secondary,
    },
    saveButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.bold as any,
    },
}); 