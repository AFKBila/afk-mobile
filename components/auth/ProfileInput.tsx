import { StyleSheet, Text, TextInput, View, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'

interface ProfileInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    style?: ViewStyle;
    placeholder?: string;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
    label,
    value,
    onChangeText,
    style,
    placeholder = '',
}) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.white}
            />
            <View style={styles.underline} />
        </View>
    )
}

export default ProfileInput

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        marginBottom: 8,
    },
    input: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        paddingVertical: 8,
        paddingHorizontal: 0,
    },
    underline: {
        height: 1,
        backgroundColor: Colors.white,
        width: '100%',
    }
}) 