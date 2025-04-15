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
import AuthContainer from '@/components/auth/AuthContainer'
import LoadingIndicator from '@/components/common/LoadingIndicator'
import MainContainer from '@/common/MainContainer'
import { useLoading } from '@/hooks/useLoading'
import { ROUTES } from '@/utils/navigation'

type Gender = 'male' | 'female' | 'other' | null;

const ProfileSetup = () => {
    // Local state for form fields
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState<Gender>(null);
    const [dob, setDob] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const { isLoading, withLoading } = useLoading();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Get updateUser from auth store
    const { updateUser } = useAuthStore();

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

        // Auto-submit when all fields are filled
        validateAndProceed();
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

    const validateAndProceed = () => {
        // Only proceed if all fields are filled
        if (!name || !username || !gender || !dob) {
            return;
        }

        withLoading(async () => {
            await updateUser({
                fullName: name,
                username,
                gender: gender as string,
                dateOfBirth: dob,
            });
            router.push(ROUTES.AUTH.PHOTO);
        });
    };

    // Auto-check for form completion whenever any field changes
    React.useEffect(() => {
        if (name && username && gender && dob) {
            validateAndProceed();
        }
    }, [name, username, gender, dob]);

    return (
        <MainContainer style={{ backgroundColor: Colors.primary }}>
            <AuthContainer
                totalSteps={4}
                currentStep={currentStep}
            >
                <AuthHeader title="Profile" imageSource={require('@/assets/images/mask.png')} />

                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>Tell us about yourself</Text>

                    {isLoading ? (
                        <View style={styles.loadingContainer}>
                            <LoadingIndicator
                                type="dots"
                                message="Setting up your profile..."
                            />
                        </View>
                    ) : (
                        <>
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
                        </>
                    )}
                </View>
            </AuthContainer>
        </MainContainer>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
});