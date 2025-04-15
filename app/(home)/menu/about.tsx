import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { StatusBar } from 'expo-status-bar';

export default function AboutScreen() {
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
                        <Image
                            source={require('@/assets/images/afrokabila-logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.version}>Version 1.0.0</Text>
                    </View>

                    {/* <Text style={styles.appName}>Afrokabila</Text> */}

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About Afrokabila</Text>
                        <Text style={styles.sectionText}>
                            Afrokabila is a social platform for connecting with friends and sharing moments.
                            Our mission is to create a positive and engaging community for everyone.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Legal</Text>

                        <TouchableOpacity style={styles.linkItem}>
                            <Text style={styles.linkText}>Terms of Service</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.linkItem}>
                            <Text style={styles.linkText}>Privacy Policy</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.linkItem}>
                            <Text style={styles.linkText}>Community Guidelines</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.grey} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Credits</Text>
                        <Text style={styles.sectionText}>
                            Made with ❤️ by the Afrokabila Team
                        </Text>
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
    logoContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    logo: {
        width: "100%",
        height: 200,
    },
    // appName: {
    //     color: Colors.white,
    //     fontSize: Fonts.sizes.xl,
    //     fontWeight: Fonts.weights.bold as any,
    //     textAlign: 'center',
    // },
    version: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
        textAlign: 'center',
        marginBottom: 30,
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
}); 