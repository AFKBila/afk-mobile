import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { Text } from '@/components/ui/Text';

interface CommentInputProps {
    onSubmit?: (comment: string) => void;
    placeholder?: string;
    username?: string;
}

const CommentInput: React.FC<CommentInputProps> = ({
    onSubmit,
    placeholder = "What's new?",
    username = "chiomao_kafor"
}) => {
    const [comment, setComment] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = () => {
        if (comment.trim().length > 0 && onSubmit) {
            onSubmit(comment);
            setComment('');
            Keyboard.dismiss();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileImageContainer}>
                <Image
                    source={require('@/assets/images/p-1.jpg')}
                    style={styles.profileImage}
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.username}>{username}</Text>
                <View style={[
                    styles.inputContainer,
                    isFocused && styles.inputContainerFocused
                ]}>
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        placeholderTextColor={Colors.grey}
                        value={comment}
                        onChangeText={setComment}
                        multiline
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    {isFocused && (
                        <View style={styles.actionButtons}>
                            <View style={styles.iconButtonsGroup}>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Ionicons name="image-outline" size={24} color={Colors.grey} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Ionicons name="camera-outline" size={24} color={Colors.grey} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.postButton,
                                    comment.trim().length > 0 && styles.postButtonActive
                                ]}
                                onPress={handleSubmit}
                                disabled={comment.trim().length === 0}
                            >
                                <Text
                                    style={[
                                        styles.postButtonText,
                                        comment.trim().length > 0 && styles.postButtonTextActive
                                    ]}
                                >
                                    Post
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    profileImageContainer: {
        marginRight: 12,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    contentContainer: {
        flex: 1,
    },
    username: {
        color: Colors.white,
        fontFamily: Fonts.medium,
        fontSize: Fonts.sizes.sm,
        marginBottom: 4,
    },
    inputContainer: {
        backgroundColor: 'transparent',
        borderRadius: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    inputContainerFocused: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    input: {
        color: Colors.white,
        fontFamily: Fonts.primary,
        fontSize: Fonts.sizes.md,
        minHeight: 24,
        padding: 0,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        paddingTop: 8,
    },
    iconButtonsGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 4,
        marginRight: 3,
    },
    postButton: {
        backgroundColor: Colors.secondary,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 16,
    },
    postButtonActive: {
        backgroundColor: Colors.primary,
    },
    postButtonText: {
        color: Colors.grey,
        fontFamily: Fonts.medium,
        fontSize: Fonts.sizes.sm,
    },
    postButtonTextActive: {
        color: Colors.white,
    }
});

export default CommentInput; 