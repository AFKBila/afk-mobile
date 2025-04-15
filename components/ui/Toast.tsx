import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onHide?: () => void;
}

export const Toast = ({ message, type = 'info', duration = 3000, onHide }: ToastProps) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.delay(duration - 600),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (onHide) onHide();
        });
    }, [fadeAnim, duration, onHide]);

    const backgroundColor =
        type === 'success' ? Colors.success :
            type === 'error' ? Colors.error :
                Colors.secondary;

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim, backgroundColor }]}>
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },
    message: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
}); 