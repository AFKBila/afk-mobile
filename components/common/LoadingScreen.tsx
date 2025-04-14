import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import LoadingIndicator from './LoadingIndicator';

const LoadingScreen = ({ message = 'Loading...' }) => {
    return (
        <View style={styles.container}>
            <LoadingIndicator type="dots" size="large" />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
    },
    text: {
        marginTop: 20,
        fontSize: Fonts.sizes.md,
        color: Colors.white,
    },
});

export default LoadingScreen; 