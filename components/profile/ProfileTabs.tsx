import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type TabType = 'text' | 'photo' | 'music';

interface ProfileTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => onTabChange('text')}
                >
                    <FontAwesome5 name="pen" size={20} color={activeTab === 'text' ? Colors.white : Colors.grey} />
                </TouchableOpacity>

                <Text style={styles.separator}>|</Text>

                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => onTabChange('photo')}
                >
                    <Ionicons
                        name="image-outline"
                        size={24}
                        color={activeTab === 'photo' ? Colors.white : Colors.grey}
                    />
                </TouchableOpacity>

                <Text style={styles.separator}>|</Text>

                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => onTabChange('music')}
                >
                    <MaterialCommunityIcons name="music" size={24} color={activeTab === 'music' ? Colors.white : Colors.grey} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.primary,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.secondary,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    tabButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    separator: {
        color: Colors.grey,
        fontSize: 18,
        opacity: 0.5,
    }
});

export default ProfileTabs; 