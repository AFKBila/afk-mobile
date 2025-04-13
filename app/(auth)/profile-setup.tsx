import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AuthHeader from '@/components/auth/AuthHeader'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import ProfileInput from '@/components/auth/ProfileInput'
import GenderToggle from '@/components/auth/GenderToggle'
import { useAuthStore } from '@/store/useAuthStore'
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import AuthContainer from '@/components/auth/AuthContainer'
import LoadingIndicator from '@/components/common/LoadingIndicator'

type Gender = 'male' | 'female' | 'other' | null;

const ProfileSetup = () => {
    // Local state for form fields
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState<Gender>(null);
    const [dob, setDob] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Get setUser from auth store
    const { setUser } = useAuthStore();

    const currentStep = 1; // Second step in the flow

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (selectedDate: Date) => {
        setDate(selectedDate);
        setDob(format(selectedDate, 'yyyy-MM-dd'));
        hideDatePicker();
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) newErrors.name = "Name is required";
        if (!username.trim()) newErrors.username = "Username is required";
        if (!gender) newErrors.gender = "Please select your gender";
        if (!dob) newErrors.dob = "Date of birth is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            // Update user in auth store
            setUser({
                id: 'temp-id', // This would come from your auth provider
                name,
                username,
                email: '', // This would come from your auth provider
                profileImage: '',
                dob,
                gender: gender as string,
                country: '',
                nationality: '',
                isVerified: false
            });

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Navigate to next screen
            router.push('/(auth)/photo');
        } catch (error) {
            console.error('Profile setup failed:', error);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer
            totalSteps={4}
            currentStep={currentStep}
        >
            <AuthHeader title="Profile" imageSource={require('@/assets/images/musk.png')} />

            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Tell us about yourself</Text>

                <ProfileInput
                    label="Name"
                    value={name}
                    onChangeText={setName}
                    error={errors.name}
                />

                <ProfileInput
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                    error={errors.username}
                />

                <GenderToggle
                    selectedGender={gender}
                    onSelectGender={setGender}
                />
                {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}

                <TouchableOpacity
                    style={styles.dateContainer}
                    onPress={showDatePicker}
                >
                    <Text style={styles.dateLabel}>Date of birth</Text>
                    {dob ? (
                        <Text style={styles.dateValue}>{format(new Date(dob), 'MMM dd, yyyy')}</Text>
                    ) : (
                        <MaterialIcons name="add" size={24} color={Colors.white} />
                    )}
                </TouchableOpacity>
                {errors.dob ? <Text style={styles.errorText}>{errors.dob}</Text> : null}

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    maximumDate={new Date()}
                    date={date || new Date(2000, 0, 1)}
                />

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <LoadingIndicator
                            type="spinner"
                            message="Saving your profile..."
                        />
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.white} />
                        ) : (
                            <Text style={styles.continueButtonText}>Continue</Text>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </AuthContainer>
    )
}

export default ProfileSetup

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    subtitle: {
        fontSize: Fonts.sizes.md,
        color: Colors.grey,
        marginBottom: 30,
        textAlign: 'left',
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
        paddingBottom: 10,
    },
    dateLabel: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
    dateValue: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
    errorText: {
        color: '#ff6b6b',
        marginTop: 5,
        fontSize: Fonts.sizes.sm,
    },
    continueButton: {
        backgroundColor: Colors.secondary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 40,
    },
    continueButtonText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});