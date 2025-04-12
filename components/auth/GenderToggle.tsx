import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'

type Gender = 'male' | 'female' | 'other' | null;

interface GenderToggleProps {
    selectedGender: Gender;
    onSelectGender: (gender: Gender) => void;
}

const GenderToggle: React.FC<GenderToggleProps> = ({
    selectedGender,
    onSelectGender
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.optionContainer}>
                <Text style={styles.label}>Male</Text>
                <TouchableOpacity
                    style={[styles.toggle, selectedGender === 'male' && styles.toggleActive]}
                    onPress={() => onSelectGender('male')}
                >
                    <View style={[styles.toggleCircle, selectedGender === 'male' && styles.toggleCircleActive]} />
                </TouchableOpacity>
            </View>

            <View style={styles.optionContainer}>
                <Text style={styles.label}>Female</Text>
                <TouchableOpacity
                    style={[styles.toggle, selectedGender === 'female' && styles.toggleActive]}
                    onPress={() => onSelectGender('female')}
                >
                    <View style={[styles.toggleCircle, selectedGender === 'female' && styles.toggleCircleActive]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default GenderToggle

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
    toggle: {
        width: 40,
        height: 22,
        borderRadius: 11,
        backgroundColor: Colors.grey,
        justifyContent: 'center',
        padding: 2,
    },
    toggleActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.white,
        borderWidth: 1,
    },
    toggleCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: Colors.white,
    },
    toggleCircleActive: {
        alignSelf: 'flex-end',
    }
}) 