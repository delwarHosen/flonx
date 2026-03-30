import { CustomButton } from '@/components/CustomButton'
import CustomLoader from '@/components/CustomLoader'
import { FormInput } from '@/components/inputForm/InputForm'
import SectionTitle from '@/components/SectionTitle'
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from '@/constants/form'
import { Colors } from '@/constants/theme'
import { useForm } from '@/hooks/useForm'
import { useChangePasswordMutation } from '@/redux/services/authApi'
import { RootState } from '@/redux/store'
import { hp, wp } from '@/utils/responsive'
import { validatePassword } from '@/utils/validation'
import { Href, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Platform, StyleSheet, ToastAndroid, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

export default function ChangePasswordView() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [changePassword, { isLoading: isUpdating }] = useChangePasswordMutation();
    const userRole = useSelector((state: RootState) => state.auth.userRole);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
    } = useForm({
        initialValues: {
            [FORM_FIELDS.OLD_PASSWORD]: "",
            [FORM_FIELDS.NEW_PASSWORD]: "",
            [FORM_FIELDS.CONFIRM_NEW_PASSWORD]: "",
        },
        validationRules: {
            [FORM_FIELDS.OLD_PASSWORD]: validatePassword,
            [FORM_FIELDS.NEW_PASSWORD]: validatePassword,
            [FORM_FIELDS.CONFIRM_NEW_PASSWORD]: validatePassword,
        },
        onSubmit: async (formValues) => {

            if (formValues[FORM_FIELDS.NEW_PASSWORD] !== formValues[FORM_FIELDS.CONFIRM_NEW_PASSWORD]) {
                const errorMsg = "New passwords do not match!";
                Platform.OS === 'android' ? ToastAndroid.show(errorMsg, ToastAndroid.SHORT) : Alert.alert("Error", errorMsg);
                return;
            }

            try {

                const payload = {
                    oldPassword: formValues[FORM_FIELDS.OLD_PASSWORD],
                    newPassword: formValues[FORM_FIELDS.NEW_PASSWORD],
                    confirmNewPassword: formValues[FORM_FIELDS.CONFIRM_NEW_PASSWORD]
                };

                // . API Call
                const res = await changePassword(payload).unwrap();

                if (res?.success) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.show(res.message || "Password updated successfully!", ToastAndroid.SHORT);
                    }


                    const targetPath = userRole === 'bartender'
                        ? "/bartender/(tabs)/profile" as Href
                        : "/customer/profile" as Href;
                    router.replace(targetPath);
                }
            } catch (error: any) {
                console.log("Change Password Error:", JSON.stringify(error, null, 2));
                const message = error?.data?.message || "Failed to change password";
                Platform.OS === 'android' ? ToastAndroid.show(message, ToastAndroid.LONG) : Alert.alert("Error", message);
            }
        },
    });

    return (
        <SafeAreaView style={styles.safeareContainer}>
            <View style={{ paddingTop: hp(20) }}>
                <SectionTitle title='Change Password' />
            </View>
            <View style={styles.form}>
                <FormInput
                    label={FORM_LABELS[FORM_FIELDS.OLD_PASSWORD]}
                    value={values[FORM_FIELDS.OLD_PASSWORD]}
                    onChangeText={(text) => handleChange(FORM_FIELDS.OLD_PASSWORD, text)}
                    placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.OLD_PASSWORD]}
                    type="password"
                    error={errors[FORM_FIELDS.OLD_PASSWORD]}
                    touched={touched[FORM_FIELDS.OLD_PASSWORD]}
                    required
                />

                <FormInput
                    label={FORM_LABELS[FORM_FIELDS.NEW_PASSWORD]}
                    value={values[FORM_FIELDS.NEW_PASSWORD]}
                    onChangeText={(text) => handleChange(FORM_FIELDS.NEW_PASSWORD, text)}
                    placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.NEW_PASSWORD]}
                    type="password"
                    error={errors[FORM_FIELDS.NEW_PASSWORD]}
                    touched={touched[FORM_FIELDS.NEW_PASSWORD]}
                    required
                />

                <FormInput
                    label={FORM_LABELS[FORM_FIELDS.CONFIRM_NEW_PASSWORD]}
                    value={values[FORM_FIELDS.CONFIRM_NEW_PASSWORD]}
                    onChangeText={(text) => handleChange(FORM_FIELDS.CONFIRM_NEW_PASSWORD, text)}
                    placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.CONFIRM_NEW_PASSWORD]}
                    type="password"
                    error={errors[FORM_FIELDS.CONFIRM_NEW_PASSWORD]}
                    touched={touched[FORM_FIELDS.CONFIRM_NEW_PASSWORD]}
                    required
                />

                <View style={styles.buttonContainer}>
                    {isUpdating ? (
                        <View style={{ alignItems: 'center' }}>
                            <CustomLoader size={45} />
                        </View>
                    ) : (
                        <CustomButton
                            title="Update Password"
                            onPress={handleSubmit}
                            width="100%"
                            height={hp(44)}
                            borderRadius={100}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeareContainer: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND
    },
    form: {
        marginTop: hp(16),
        paddingHorizontal: wp(20)
    },
    buttonContainer: {
        marginTop: hp(20),
        // Changed from center to stretch so the 100% width button works correctly
        alignItems: 'stretch'
    }
})