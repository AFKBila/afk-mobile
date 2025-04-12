import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
    View
} from 'react-native';

type FontWeight = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

interface CustomLoginButtonProps {
    title: string | JSX.Element;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
    customButtonStyle?: ViewStyle;
    customTextStyle?: TextStyle;
    loading?: boolean;
    icon?: string | React.ReactNode;
    variant?: 'primary' | 'secondary';
}

const CustomLoginButton: React.FC<CustomLoginButtonProps> = ({
    title,
    onPress,
    style,
    textStyle,
    disabled = false,
    customButtonStyle,
    customTextStyle,
    loading = false,
    icon,
    variant = 'primary',
    ...props
}) => {
    const buttonStyles = [
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
        style,
        customButtonStyle
    ];

    const buttonTextStyles = [
        styles.buttonText,
        variant === 'primary' ? styles.primaryText : styles.secondaryText,
        disabled && styles.disabledText,
        textStyle,
        customTextStyle
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
            {...props}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' ? Colors.white : Colors.primary}
                />
            ) : (
                <View style={styles.contentContainer}>
                    {icon && typeof icon === 'string' ? (
                        <MaterialCommunityIcons
                            name={icon as any}
                            size={24}
                            color={variant === 'primary' ? Colors.white : Colors.primary}
                            style={styles.icon}
                        />
                    ) : icon ? (
                        <View style={styles.icon}>{icon as React.ReactNode}</View>
                    ) : null}

                    {typeof title === 'string' ? (
                        <Text style={buttonTextStyles}>{title}</Text>
                    ) : (
                        title
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 14,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
    },
    primaryButton: {
        backgroundColor: Colors.primary,
        borderWidth: 2,
        borderColor: Colors.white,
    },
    secondaryButton: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.white,
    },
    disabledButton: {
        opacity: 0.6,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 8,
    },
    buttonText: {
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.semiBold as FontWeight,
    },
    primaryText: {
        color: Colors.white,
    },
    secondaryText: {
        color: Colors.black,
    },
    disabledText: {
        opacity: 0.8,
    },
});

export default CustomLoginButton;
