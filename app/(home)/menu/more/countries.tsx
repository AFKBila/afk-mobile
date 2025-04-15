import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function CountriesScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    // Sample list of countries
    const countries = [
        { code: 'US', name: 'United States' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'CA', name: 'Canada' },
        { code: 'AU', name: 'Australia' },
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
        { code: 'JP', name: 'Japan' },
        { code: 'CN', name: 'China' },
        { code: 'IN', name: 'India' },
        { code: 'BR', name: 'Brazil' },
        { code: 'RU', name: 'Russia' },
        { code: 'ZA', name: 'South Africa' },
        { code: 'MX', name: 'Mexico' },
        { code: 'IT', name: 'Italy' },
        { code: 'ES', name: 'Spain' },
    ];

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Countries</Text>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={Colors.grey} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search countries"
                        placeholderTextColor={Colors.grey}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <FlatList
                    data={filteredCountries}
                    keyExtractor={item => item.code}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.countryItem}>
                            <Text style={styles.countryName}>{item.name}</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
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
    countryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    countryName: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
}); 