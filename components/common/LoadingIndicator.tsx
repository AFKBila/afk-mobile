import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface LoadingIndicatorProps {
    message?: string;
    size?: 'small' | 'large';
    style?: ViewStyle;
    type?: 'spinner' | 'pulse' | 'dots';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
    message,
    size = 'large',
    style,
    type = 'spinner'
}) => {
    // For pulsing animation
    const opacity = useSharedValue(0.6);
    const scale = useSharedValue(0.95);

    React.useEffect(() => {
        opacity.value = withRepeat(
            withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
        scale.value = withRepeat(
            withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: scale.value }]
        };
    });

    // For dots animation
    const Dots = () => {
        return (
            <View style={styles.dotsContainer}>
                {[0, 1, 2].map((i) => {
                    const delay = i * 300;
                    const dotOpacity = useSharedValue(0.3);

                    React.useEffect(() => {
                        dotOpacity.value = withRepeat(
                            withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) }),
                            -1,
                            true
                        );
                    }, []);

                    const dotStyle = useAnimatedStyle(() => {
                        return {
                            opacity: dotOpacity.value
                        };
                    });

                    return (
                        <Animated.View
                            key={i}
                            style={[styles.dot, dotStyle]}
                        />
                    );
                })}
            </View>
        );
    };

    return (
        <View style={[styles.container, style]}>
            {type === 'spinner' && (
                <ActivityIndicator size={size} color={Colors.secondary} />
            )}

            {type === 'pulse' && (
                <Animated.View style={[styles.pulseCircle, animatedStyle]}>
                    <View style={styles.innerCircle} />
                </Animated.View>
            )}

            {type === 'dots' && <Dots />}

            {message && (
                <Text style={styles.message}>{message}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    message: {
        color: Colors.white,
        marginTop: 16,
        fontSize: Fonts.sizes.md,
        textAlign: 'center',
    },
    pulseCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.secondary,
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primary,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.secondary,
        marginHorizontal: 5,
    }
});

export default LoadingIndicator; 