import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function LanguageScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'it', name: 'Italian' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ar', name: 'Arabic' },
        { code: 'hi', name: 'Hindi' },
        { code: 'ko', name: 'Korean' },
        { code: 'tr', name: 'Turkish' },
        { code: 'nl', name: 'Dutch' },
        { code: 'sv', name: 'Swedish' },
    ];

    const filteredLanguages = languages.filter(language =>
        language.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLanguageSelect = (code: string) => {
        setSelectedLanguage(code);
        // In a real app, you would update the app's language here
        router.back();
    };

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Language</Text>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={Colors.grey} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search languages"
                        placeholderTextColor={Colors.grey}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <FlatList
                    data={filteredLanguages}
                    keyExtractor={item => item.code}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.languageItem}
                            onPress={() => handleLanguageSelect(item.code)}
                        >
                            <Text style={styles.languageName}>{item.name}</Text>
                            {selectedLanguage === item.code && (
                                <Ionicons name="checkmark" size={24} color={Colors.primary} />
                            )}
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
        paddingHorizontal: 16,
    },
    languageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    languageName: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
}); 