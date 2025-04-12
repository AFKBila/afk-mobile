import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
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
import SwipeableScreen from '@/components/auth/SwipeableScreen'

type Gender = 'male' | 'female' | 'other' | null;

const ProfileSetup = () => {
    // Local state for form fields
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState<Gender>(null);
    const [dob, setDob] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

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

    const handleNext = () => {
        // Validate form
        if (!name || !username || !gender || !dob) {
            // Show error
            return;
        }

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

        // Navigate to next screen
        router.push('/(auth)/photo');
    };

    const handlePrevious = () => {
        // Navigate to previous screen
        router.push('/(auth)/signup');
    };

    return (
        <SwipeableScreen
            totalSteps={3}
            currentStep={currentStep}
            onNext={handleNext}
            onPrevious={handlePrevious}
        >
            <AuthHeader title="Profile" imageSource={require('@/assets/images/musk.png')} />

            <View style={styles.formContainer}>
                <Text style={styles.subtitle}>Tell us about yourself</Text>

                <ProfileInput
                    label="Name"
                    value={name}
                    onChangeText={setName}
                />

                <ProfileInput
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                />

                <GenderToggle
                    selectedGender={gender}
                    onSelectGender={setGender}
                />

                <TouchableOpacity
                    style={styles.dateContainer}
                    onPress={showDatePicker}
                >
                    <Text style={styles.dateLabel}>Date of birth</Text>
                    <MaterialIcons name="add" size={24} color={Colors.white} />
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    maximumDate={new Date()}
                    date={date || new Date(2000, 0, 1)}
                />
            </View>
        </SwipeableScreen>
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
    },
    dateLabel: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
    },
});