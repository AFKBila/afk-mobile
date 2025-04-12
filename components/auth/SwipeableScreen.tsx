import React, { ReactNode, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, runOnJS } from 'react-native-reanimated';
import CarouselDots from './CarouselDots';
import { Colors } from '@/constants/Colors';

interface SwipeableScreenProps {
    children: ReactNode;
    totalSteps: number;
    currentStep: number;
    onNext: () => void;
    onPrevious: () => void;
    style?: any;
}

const SwipeableScreen: React.FC<SwipeableScreenProps> = ({
    children,
    totalSteps,
    currentStep,
    onNext,
    onPrevious,
    style
}) => {
    const translateX = useSharedValue(0);

    // Log when component mounts to verify it's being used
    useEffect(() => {
        // console.log(`SwipeableScreen mounted - step ${currentStep}`);
    }, []);

    const swipeGesture = Gesture.Pan()
        .runOnJS(true)
        .onBegin(() => {
            console.log('Gesture began');
        })
        .onUpdate((e) => {
            translateX.value = e.translationX;
            console.log(`Swiping: ${e.translationX}`);
        })
        .onEnd((e) => {
            translateX.value = 0;
            console.log(`Swipe ended: ${e.translationX}`);

            // Detect swipe direction with more sensitivity
            if (e.translationX < -40) {
                // Swiped left - go to next screen
                console.log('Swiping to next screen');
                runOnJS(onNext)();
            } else if (e.translationX > 40) {
                // Swiped right - go to previous screen
                console.log('Swiping to previous screen');
                runOnJS(onPrevious)();
            }
        });

    return (
        <GestureDetector gesture={swipeGesture}>
            <Animated.View style={[styles.container, style]}>
                {children}

                <CarouselDots
                    totalDots={totalSteps}
                    currentIndex={currentStep}
                    style={styles.dotsContainer}
                    onPress={onNext}
                />
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        paddingVertical: 40,
    },
    dotsContainer: {
        marginBottom: 40,
    },
});

export default SwipeableScreen; 