import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';
import { usePrivacyStore } from '@/store/usePrivacyStore';

export default function OnlineStatusPrivacyScreen() {
    const { privacySettings, updatePrivacy } = usePrivacyStore();

    const options = [
        { id: 'everyone', label: 'Everyone' },
        { id: 'following', label: 'People You Follow' },
        { id: 'none', label: 'No One' },
    ];

    const handleOptionSelect = (value) => {
        updatePrivacy('onlineStatus', value);
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
                    <Text style={styles.headerTitle}>Online Status</Text>
                </View>

                <Text style={styles.description}>
                    Control who can see when you're active on Fixxies.
                </Text>

                <FlatList
                    data={options}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.optionItem}
                            onPress={() => handleOptionSelect(item.id)}
                        >
                            <Text style={styles.optionText}>{item.label}</Text>
                            {privacySettings.onlineStatus === item.id && (
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
    description: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    listContent: {
        paddingHorizontal: 16,
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    optionText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
}); 