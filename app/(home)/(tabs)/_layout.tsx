import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons, Feather, Entypo } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/useAuthStore';

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    const { user } = useAuthStore();

    // Default avatar if user doesn't have a profile image
    const avatarSource = user?.profileImage
        ? { uri: user.profileImage }
        : require('@/assets/images/p-1.jpg');

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: Colors.primary,
                    borderTopWidth: 0,
                    height: 60 + (Platform.OS === 'ios' ? insets.bottom : 0),
                    paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.white,
                tabBarInactiveTintColor: Colors.secondary,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        // <Feather name="home" size={24} color={color} />
                        <Image source={require('@/assets/icons/home.jpg')} style={styles.tabIcon} />
                    ),
                }}
            />

            <Tabs.Screen
                name="explore"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <Feather name="compass" size={28} color={Colors.white} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <View style={styles.avatarContainer}>
                            <Image
                                source={avatarSource}
                                style={[
                                    styles.avatar,
                                    focused && styles.avatarActive
                                ]}
                                resizeMode="cover"
                            />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: Colors.primary,
    },
    logoText: {
        color: Colors.white,
        fontSize: Fonts.sizes.lg,
        fontWeight: Fonts.weights.bold as any,
        letterSpacing: 1,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabIcon: {
        width: 24,
        height: 24,
    },
    iconButton: {
        marginLeft: 20,
    },
    badgeContainer: {
        width: 32,
        height: 32,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerTabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerTabButton: {
        // backgroundColor: Colors.black,
        // width: 50,
        // height: 50,
        // borderRadius: 25,
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderWidth: 2,
        // borderColor: Colors.white,
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: Colors.secondary,
    },
    avatarActive: {
        borderWidth: 2,
        borderColor: Colors.white,
    },
});
