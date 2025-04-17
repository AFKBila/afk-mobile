import React from 'react';
import { Text as RNText, TextProps, StyleSheet, TextStyle } from 'react-native';
import { Fonts } from '@/constants/Fonts';

interface CustomTextProps extends TextProps {
    variant?: 'body' | 'title' | 'subtitle' | 'caption';
    weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

export const Text: React.FC<CustomTextProps> = ({
    style,
    variant = 'body',
    weight = 'regular',
    children,
    ...props
}) => {
    return (
        <RNText
            style={[
                styles.base,
                styles[variant] as TextStyle,
                styles[weight] as TextStyle,
                style as TextStyle,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

const styles = StyleSheet.create({
    base: {
        fontFamily: Fonts.primary,
    },
    body: {
        fontSize: Fonts.sizes.md,
    },
    title: {
        fontSize: Fonts.sizes.xl,
    },
    subtitle: {
        fontSize: Fonts.sizes.lg,
    },
    caption: {
        fontSize: Fonts.sizes.sm,
    },
    regular: {
        fontWeight: Fonts.weights.regular as 'normal',
    },
    medium: {
        fontWeight: Fonts.weights.medium as 'normal',
    },
    semiBold: {
        fontWeight: Fonts.weights.semiBold as 'normal',
    },
    bold: {
        fontWeight: Fonts.weights.bold as 'normal' | 'bold',
    },
}); 