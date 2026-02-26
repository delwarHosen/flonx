import { AuthHeading } from '@/components/auth/AuthHeading';
import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import { FORM_FIELDS, FORM_LABELS } from '@/constants/form';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { validateEmail } from '@/utils/validation';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ToastAndroid,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ForgotPassword() {
    const router = useRouter();

    const {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
    } = useForm({
        initialValues: {
            [FORM_FIELDS.EMAIL]: "",
        },
        validationRules: {
            [FORM_FIELDS.EMAIL]: validateEmail,
        },
        onSubmit: async (values) => {
            try {
                const data = { email: values.email }
                console.log("ForgotPassword data", data)
                router.push("/(auth)/verify-otp")
            } catch (error: any) {
                const message = error?.data?.message || error?.message || "Something went wrong!";
                if (Platform.OS === 'android') {
                    ToastAndroid.show(message, ToastAndroid.LONG);
                }
            }
        },
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               
                    <View style={styles.innerContainer}>
                        <View style={{ width: '100%' }}>
                            <AuthHeading
                                title="Forgot Password"
                                description="Enter your registered email address and we’ll send you a verification code to reset your password."
                            />

                            <View style={styles.form}>
                                <FormInput
                                    label={FORM_LABELS[FORM_FIELDS.EMAIL]}
                                    value={values[FORM_FIELDS.EMAIL]}
                                    onChangeText={(text) => handleChange(FORM_FIELDS.EMAIL, text)}
                                    type="email"
                                    placeholder='Enter your registered email address'
                                    error={errors[FORM_FIELDS.EMAIL]}
                                    touched={touched[FORM_FIELDS.EMAIL]}
                                    required
                                />

                                <CustomButton
                                    title="Send Verification Code"
                                    onPress={handleSubmit}
                                    width="100%"
                                    height={44}
                                    borderRadius={10}
                                />
                            </View>
                        </View>
                    </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.APP_BACKGROUND
    },
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center",
        paddingHorizontal: 20,
    },
    form: {
        marginTop: 16,
        width: '100%',
    },
})