import { EyeIcon } from '@/assets/images/icons/icon';
import { Colors } from '@/constants/theme';
import { validateEmail, validatePassword } from '@/utils/validation';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Body2, Caption1 } from '../typo/Typography';


export type InputType =
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "image";


interface FormInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    type?: InputType;
    error?: string;
    touched?: boolean;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    editable?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    type = "text",
    error,
    touched = false,
    required = false,
    maxLength,
    minLength,
    // editable
}) => {

    const [showPassword, setShowPassword] = useState(false);
    const [imageUri, setImageUri] = useState<string | null>(null);

    const getKeyboardtype = () => {
        switch (type) {
            case 'email': return "email-address";
            case 'number': return "numeric";
            default: return "default";
        }
    }


    const getError = () => {
        if (!touched) return error;

        if (required && !value.trim()) {
            return "This field is required";
        }

        if (type === "email" && value && !validateEmail(value)) {
            return "Please enter a valid email address";
        };

        if (type === "password" && value && !validatePassword(value)) {
            return "Password must be at least 8 character";
        };

        return;
    }


    // <_____Image validation________>
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {
            alert("Please grant camera roll permission to upload images");
            return;
        };

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
            onChangeText(result.assets[0].uri);
        };
    };


    if (type === "image") {
        return (
            <View style={styles.container}>
                <View style={styles.labelContainer}>
                    <Body2 color={Colors.NEUTRAL0}>{label}</Body2>
                    {/* {required && <Text style={styles.required}>*</Text>} */}
                </View>

                <TouchableOpacity
                    style={[styles.imageButton, getError() && styles.inputError]}
                    onPress={pickImage}
                >
                    {/* <Upload size={20} color="#B08D59" /> */}
                    <Text style={styles.imageButtonText}>
                        {imageUri ? 'Change Image' : 'Upload Image'}
                    </Text>
                </TouchableOpacity>

                {
                    imageUri && (
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.imagePreview}
                            contentFit="cover"
                        />
                    )}

                {getError() && <Caption1 color='#EF4444' style={styles.error}>{getError()}</Caption1>}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <Body2 color={Colors.NEUTRAL0}>{label}</Body2>
                {/* {required && <Text style={styles.required}>*</Text>} */}
            </View>
            <View style={[styles.inputContainer, getError() && styles.inputError]}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.PLACEHOLLDER_TEXT}
                    secureTextEntry={type === "password" && !showPassword}
                    keyboardType={getKeyboardtype()}
                    autoCapitalize={type === "email" ? "none" : "sentences"}
                    autoCorrect={false}
                    maxLength={maxLength}
                />

                {type === "password" && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => setShowPassword(!showPassword)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        {
                            showPassword ? (
                                <EyeIcon />
                            ) : (
                                <EyeOff color={Colors.PLACEHOLLDER_TEXT} size={18}/>
                            )
                        }
                    </TouchableOpacity>
                )}
            </View>

            {getError() && <Caption1 color='#EF4444' style={styles.error}>{getError()}</Caption1>}

            {maxLength && (
                <View style={styles.counterContainer}>
                    <Caption1 color={Colors.PLACEHOLLDER_TEXT}>{value.length}/{maxLength}</Caption1>
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 16
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    label: {

    },
    required: {
        color: "#EF4444",
        marginLeft: 4
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        paddingVertical: 13,
        fontSize: 14,
        color: Colors.NEUTRAL0,
    },
    inputText: {
        flex: 1,
        fontSize: 14,
    },
    inputError: {
        borderColor: '#EF4444',
        // backgroundColor: Colors.,
    },
    placeholder: {
        color: Colors.PLACEHOLLDER_TEXT,
    },
    imageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
    },
    imageButtonText: {
        color: '#3872F0',
        fontSize: 16,
        fontWeight: '500',
    },
    imagePreview: {
        width: '100%',
        height: 150,
        borderRadius: 12,
        marginTop: 12,
    },
    iconButton: {
        padding: 4,
    },
    error: {
        marginTop: 4,
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 4,
    },
})