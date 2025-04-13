import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import AuthHeader from '@/components/auth/AuthHeader'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { router } from 'expo-router'
import { useAuthStore } from '@/store/useAuthStore'
import CountryToggle from '@/components/auth/CountryToggle'
import AuthContainer from '@/components/auth/AuthContainer'
import LoadingIndicator from '@/components/common/LoadingIndicator'

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
    const [loading, setLoading] = useState(false);
    const currentStep = 3;
    const { user, setUser } = useAuthStore();

    // Auto-navigate after country is selected
    useEffect(() => {
        if (selectedCountry) {
            const timer = setTimeout(() => {
                handleContinue();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [selectedCountry]);

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

    const handleContinue = async () => {
        if (!selectedCountry) return;

        setLoading(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Navigate to final screen or home
            router.push('/(home)/home');
        } catch (error) {
            console.error('Navigation failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer
            totalSteps={4}
            currentStep={currentStep}
        >
            <AuthHeader title="Country" imageSource={require('@/assets/images/globe.png')} />

            <View style={styles.container}>
                <Text style={styles.subtitle}>What's your nationality?</Text>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <LoadingIndicator
                            type="dots"
                            message="Setting up your account..."
                        />
                    </View>
                ) : (
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
                )}
            </View>
        </AuthContainer>
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: Colors.white,
        marginTop: 20,
        fontSize: Fonts.sizes.md,
    }
})