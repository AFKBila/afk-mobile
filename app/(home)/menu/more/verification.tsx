import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function VerificationScreen() {
    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Verification</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Account Verification</Text>
                        <Text style={styles.description}>
                            Get verified on Fixxies to confirm your identity and gain access to exclusive features.
                        </Text>
                    </View>

                    <View style={styles.verificationStatus}>
                        <Ionicons name="shield-outline" size={60} color={Colors.grey} />
                        <Text style={styles.statusTitle}>Not Verified</Text>
                        <Text style={styles.statusText}>
                            Your account is not verified. Apply for verification to get a blue badge.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.applyButton}>
                        <Text style={styles.applyButtonText}>Apply for Verification</Text>
                    </TouchableOpacity>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Requirements</Text>
                        <View style={styles.requirementItem}>
                            <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
                            <Text style={styles.requirementText}>Authentic account representing a real person or entity</Text>
                        </View>
                        <View style={styles.requirementItem}>
                            <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
                            <Text style={styles.requirementText}>Complete profile with profile picture and bio</Text>
                        </View>
                        <View style={styles.requirementItem}>
                            <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
                            <Text style={styles.requirementText}>Active account with regular posts</Text>
                        </View>
                        <View style={styles.requirementItem}>
                            <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
                            <Text style={styles.requirementText}>Follow our Community Guidelines</Text>
                        </View>
                    </View>
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
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.bold as any,
        marginBottom: 15,
    },
    description: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
        lineHeight: 22,
    },
    verificationStatus: {
        alignItems: 'center',
        marginVertical: 30,
    },
    statusTitle: {
        color: Colors.white,
        fontSize: Fonts.sizes.lg,
        fontWeight: Fonts.weights.bold as any,
        marginTop: 15,
        marginBottom: 10,
    },
    statusText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
        textAlign: 'center',
    },
    applyButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 30,
    },
    applyButtonText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.bold as any,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    requirementText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        marginLeft: 15,
        flex: 1,
    },
}); 