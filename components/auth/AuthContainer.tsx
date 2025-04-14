import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import CarouselDots from './CarouselDots';

interface AuthContainerProps {
    children: ReactNode;
    totalSteps: number;
    currentStep: number;
    style?: any;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
    children,
    totalSteps,
    currentStep,
    style
}) => {
    return (
        <View style={[styles.container, style]}>
            {children}

            <CarouselDots
                totalDots={totalSteps}
                currentIndex={currentStep}
                style={styles.dotsContainer}
            // No onPress handler since we don't want manual navigation
            />
        </View>
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

export default AuthContainer; 