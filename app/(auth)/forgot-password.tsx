import { AuthHeading } from '@/components/auth/AuthHeading';
import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import { showToast } from '@/components/Toast';
import { FORM_FIELDS, FORM_LABELS } from '@/constants/form';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { useForgetPasswordMutation } from '@/redux/services/authApi';
import { hp, wp } from '@/utils/responsive';
import { validateEmail } from '@/utils/validation';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';

// const { width } = Dimensions.get('window');


export default function ForgotPassword() {
    const router = useRouter();
    // Mutation hook
    const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useForm({
        initialValues: {
            [FORM_FIELDS.EMAIL]: "",
        },
        validationRules: {
            [FORM_FIELDS.EMAIL]: validateEmail,
        },

        onValidationFail: (errs) => {
            const firstError = Object.values(errs)[0];
            if (firstError) showToast(firstError);
        },

        onSubmit: async (formValues) => {
            try {
                const res = await forgetPassword({
                    email: formValues[FORM_FIELDS.EMAIL]
                }).unwrap();

                if (res?.success) {
                    showToast(res.message || "OTP sent to your email")

                    router.push({
                        pathname: "/(auth)/verify-otp",
                        params: { email: formValues[FORM_FIELDS.EMAIL] }
                    });
                }
            } catch (error: any) {
                console.log("Forgot Password Error:", error);
                const message =
                    error?.data?.message ||
                    error?.message ||
                    "Something went wrong!";
                showToast(message, "error")
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
                            title="Forgot password"
                            description="Enter your registered email address and we’ll send you a verification code to reset your password."
                        />

                        <View style={styles.form}>
                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.EMAIL]}
                                value={values[FORM_FIELDS.EMAIL]}
                                onChangeText={(text) => handleChange(FORM_FIELDS.EMAIL, text)}
                                onBlur={() => handleBlur(FORM_FIELDS.EMAIL)}
                                type="email"
                                placeholder='Enter your registered email address'
                                error={errors[FORM_FIELDS.EMAIL]}
                                touched={touched[FORM_FIELDS.EMAIL]}
                                required
                                editable={!isLoading} // Loading obosthay input block thakbe
                            />

                            <CustomButton
                                title={isLoading ? "Sending..." : "Send Verification Code"}
                                onPress={handleSubmit} // Ekhane handleSubmit call hobe
                                disabled={isLoading}
                                width="100%"
                                height={hp(44)}
                                borderRadius={100}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND
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
        paddingHorizontal: wp(20),
    },
    form: {
        marginTop: hp(16),
        width: '100%',
    },
})