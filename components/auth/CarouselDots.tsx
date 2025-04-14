import { StyleSheet, View, ViewStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

interface CarouselDotsProps {
    totalDots: number;
    currentIndex: number;
    style?: ViewStyle;
    onPress?: () => void;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({
    totalDots,
    currentIndex,
    style,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={onPress}
            disabled={!onPress}
        >
            {Array.from({ length: totalDots }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        index === currentIndex && styles.activeDot
                    ]}
                />
            ))}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 20,
        alignSelf: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.grey,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: Colors.white,
        width: 10,
        height: 10,
        borderRadius: 5,
    },
})

export default CarouselDots 