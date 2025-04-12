import { StyleSheet, Text, View, Image, ViewStyle, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'

interface AuthHeaderProps {
    title: string;
    imageSource: ImageSourcePropType;
    style?: ViewStyle;
}

export default function AuthHeader({ title, imageSource, style }: AuthHeaderProps) {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{title}</Text>
            <Image
                source={imageSource}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '100%',
        backgroundColor: Colors.primary,
    },
    title: {
        fontSize: Fonts.sizes.xl,
        fontWeight: Fonts.weights.bold as any,
        color: Colors.white,
        marginTop: -40,
    },
    logo: {
        width: 100,
        height: 100,
    }
})