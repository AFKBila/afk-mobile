import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';
import * as Clipboard from 'expo-clipboard';
import { showToast } from '@/utils/toast';

export default function InviteFriendsScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    // Placeholder data for contacts
    const contacts = [
        { id: '1', name: 'John Doe', phone: '+1234567890', invited: false },
        { id: '2', name: 'Jane Smith', phone: '+1987654321', invited: true },
        { id: '3', name: 'Robert Johnson', phone: '+1122334455', invited: false },
        { id: '4', name: 'Emily Davis', phone: '+1555666777', invited: false },
    ];

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
    );

    const inviteLink = 'https://fixxies.com/invite/abc123';

    const copyInviteLink = async () => {
        await Clipboard.setStringAsync(inviteLink);
        showToast('Invite link copied to clipboard');
    };

    const inviteContact = (contactId: string) => {
        // In a real app, this would send an invitation
        showToast('Invitation sent');
    };

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Invite Friends</Text>
                </View>

                <View style={styles.linkContainer}>
                    <Text style={styles.linkLabel}>Share your invite link</Text>
                    <View style={styles.linkBox}>
                        <Text style={styles.linkText} numberOfLines={1}>{inviteLink}</Text>
                        <TouchableOpacity onPress={copyInviteLink} style={styles.copyButton}>
                            <Feather name="copy" size={20} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={Colors.grey} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search contacts"
                        placeholderTextColor={Colors.grey}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <FlatList
                    data={filteredContacts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.contactItem}>
                            <View style={styles.contactInfo}>
                                <Text style={styles.contactName}>{item.name}</Text>
                                <Text style={styles.contactPhone}>{item.phone}</Text>
                            </View>
                            {item.invited ? (
                                <Text style={styles.invitedText}>Invited</Text>
                            ) : (
                                <TouchableOpacity
                                    style={styles.inviteButton}
                                    onPress={() => inviteContact(item.id)}
                                >
                                    <Text style={styles.inviteButtonText}>Invite</Text>
                                </TouchableOpacity>
                            )}
                        </View>
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
    linkContainer: {
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    linkLabel: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        marginBottom: 10,
    },
    linkBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    linkText: {
        color: Colors.white,
        fontSize: Fonts.sizes.sm,
        flex: 1,
    },
    copyButton: {
        padding: 5,
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
    contactItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.medium as any,
    },
    contactPhone: {
        color: Colors.grey,
        fontSize: Fonts.sizes.sm,
    },
    invitedText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.sm,
    },
    inviteButton: {
        backgroundColor: Colors.link,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    inviteButtonText: {
        color: Colors.white,
        fontSize: Fonts.sizes.sm,
        fontWeight: Fonts.weights.medium as any,
    },
}); 