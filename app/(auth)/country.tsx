import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AuthHeader from '@/components/auth/AuthHeader'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { router } from 'expo-router'
import { useAuthStore } from '@/store/useAuthStore'
import CountryToggle from '@/components/auth/CountryToggle'
import SwipeableScreen from '@/components/auth/SwipeableScreen'

const countries = [
    'Kenya',
    'Ghana',
    'United Kingdom',
    'Nigerian',
    'Guinea',
    'German'
];

const Country = () => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const currentStep = 3;
    const { user, setUser } = useAuthStore();

    const handleCountrySelect = (country: string) => {
        setSelectedCountry(country);

        // Update user in store
        if (user) {
            setUser({
                ...user,
                nationality: country
            });
        }
    };

    const handleNext = () => {
        if (!selectedCountry) {
            // Show error or validation message
            return;
        }

        router.push('/(auth)/final-signup');
    };

    const handlePrevious = () => {
        router.push('/(auth)/photo');
    };

    return (
        <SwipeableScreen
            totalSteps={3}
            currentStep={currentStep}
            onNext={handleNext}
            onPrevious={handlePrevious}
        >
            <AuthHeader title="Country" imageSource={require('@/assets/images/globe.png')} />

            <View style={styles.container}>
                <Text style={styles.subtitle}>What's your nationality ?</Text>

                <ScrollView style={styles.countriesContainer} showsVerticalScrollIndicator={false}>
                    {countries.map((country, index) => (
                        <CountryToggle
                            key={index}
                            country={country}
                            isSelected={selectedCountry === country}
                            onSelect={() => handleCountrySelect(country)}
                        />
                    ))}
                </ScrollView>
            </View>
        </SwipeableScreen>
    )
}

export default Country

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    subtitle: {
        fontSize: Fonts.sizes.md,
        color: Colors.grey,
        marginBottom: 30,
        textAlign: 'center',
    },
    countriesContainer: {
        flex: 1,
        width: '100%',
    }
})