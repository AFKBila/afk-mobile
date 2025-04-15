import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import LoadingIndicator from './LoadingIndicator';
import { toast } from 'sonner-native';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    isRecovering: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
    state: State = {
        hasError: false,
        error: null,
        isRecovering: false
    };

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error) {
        console.error('ErrorBoundary caught an error:', error);
    }

    handleReset = async () => {
        this.setState({ isRecovering: true });
        try {
            await router.replace('/(auth)/login');
            this.setState({ hasError: false, error: null });
        } catch (error) {
            console.error('Reset failed:', error);
            toast.error('Failed to recover from error');
        } finally {
            this.setState({ isRecovering: false });
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Oops! Something went wrong</Text>
                    <Text style={styles.message}>
                        {this.state.error?.message || 'An unexpected error occurred'}
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleReset}
                        disabled={this.state.isRecovering}
                    >
                        {this.state.isRecovering ? (
                            <LoadingIndicator type="spinner" size="small" />
                        ) : (
                            <Text style={styles.buttonText}>Return to Login</Text>
                        )}
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        padding: 20,
    },
    title: {
        color: Colors.white,
        fontSize: Fonts.sizes.xl,
        fontWeight: Fonts.weights.bold as any,
        marginBottom: 10,
    },
    message: {
        color: Colors.grey,
        fontSize: Fonts.sizes.md,
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: Colors.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        minWidth: 150,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: Fonts.sizes.md,
        fontWeight: Fonts.weights.medium as any,
    },
}); 