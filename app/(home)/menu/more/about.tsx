import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function AboutScreen() {
    const appVersion = '1.0.0';

    const openLink = (url) => {
        Linking.openURL(url);
    };

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>About</Text>
                </View>

                <ScrollView style={styles.scrollView}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="logo-twitter" size={60} color={Colors.primary} />
                        <Text style={styles.appName}>Fixxies</Text>
                        <Text style={styles.versionText}>Version {appVersion}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About Fixxies</Text>
                        <Text style={styles.sectionText}>
                            Fixxies is a social media platform designed to connect people and share ideas.
                            Our mission is to provide a safe and engaging environment for users to express
                            themselves and discover content that matters to them.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Legal</Text>
                        <TouchableOpacity
                            style={styles.linkItem}
                            onPress={() => openLink('https://example.com/terms')}
                        >
                            <Text style={styles.linkText}>Terms of Service</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.linkItem}
                            onPress={() => openLink('https://example.com/privacy')}
                        >
                            <Text style={styles.linkText}>Privacy Policy</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.linkItem}
                            onPress={() => openLink('https://example.com/cookies')}
                        >
                            <Text style={styles.linkText}>Cookie Policy</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.linkItem}
                            onPress={() => openLink('https://example.com/guidelines')}
                        >
                            <Text style={styles.linkText}>Community Guidelines</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contact</Text>
                        <TouchableOpacity
                            style={styles.linkItem}
                            onPress={() => openLink('https://example.com/support')}
                        >
                            <Text style={styles.linkText}>Support</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.linkItem}
                            onPress={() => openLink('https://example.com/feedback')}
                        >
                            <Text style={styles.linkText}>Feedback</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Follow Us</Text>
                        <TouchableOpacity
                            style={styles.linkItem}
                            onPress={() => openLink('https://twitter.com/fixxies')}
                        >
                            <Text style={styles.linkText}>Twitter</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.linkItem}
                            onPress={() => openLink('https://instagram.com/fixxies')}
                        >
                            <Text style={styles.linkText}>Instagram</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.linkItem}
                            onPress={() => openLink('https://facebook.com/fixxies')}
                        >
                            <Text style={styles.linkText}>Facebook</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.copyrightText}>
                        © {new Date().getFullYear()} Fixxies. All rights reserved.
                    </Text>
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
    logoContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    appName: {
        color: Colors.white,
        fontSize: Fonts.sizes.xl,
        fontWeight: Fonts.weights.bold as any,
        marginTop: 10,
    },
    versionText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
        marginTop: 5,
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
    sectionText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
        lineHeight: 22,
    },
    linkItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    linkText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
    copyrightText: {
        color: Colors.grey,
        fontSize: Fonts.sizes.sm,
        textAlign: 'center',
        marginVertical: 30,
    },
}); 