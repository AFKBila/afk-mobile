import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'

interface CountryToggleProps {
    country: string;
    isSelected: boolean;
    onSelect: () => void;
}

const CountryToggle: React.FC<CountryToggleProps> = ({
    country,
    isSelected,
    onSelect
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{country}</Text>
            <TouchableOpacity
                style={[styles.toggle, isSelected && styles.toggleActive]}
                onPress={onSelect}
            >
                <View style={[styles.toggleCircle, isSelected && styles.toggleCircleActive]} />
            </TouchableOpacity>
        </View>
    )
}

export default CountryToggle

const styles = StyleSheet.create({
    container: {
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