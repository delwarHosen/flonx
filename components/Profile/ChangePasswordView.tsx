import { CustomButton } from '@/components/CustomButton'
import CustomLoader from '@/components/CustomLoader'
import { FormInput } from '@/components/inputForm/InputForm'
import SectionTitle from '@/components/SectionTitle'
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from '@/constants/form'
import { Colors } from '@/constants/theme'
import { useForm } from '@/hooks/useForm'
import { RootState } from '@/redux/store'
import { validatePassword } from '@/utils/validation'
import { Href, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Platform, StyleSheet, ToastAndroid, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

export default function ChangePasswordView() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
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
        onSubmit: async (values) => {
            if (values[FORM_FIELDS.NEW_PASSWORD] !== values[FORM_FIELDS.CONFIRM_NEW_PASSWORD]) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show("New passwords do not match!", ToastAndroid.SHORT);
                } else {
                    Alert.alert("Error", "New passwords do not match!");
                }
                return;
            }

            setLoading(true);
            try {
                const submitData = {
                    oldPassword: values[FORM_FIELDS.OLD_PASSWORD],
                    newPassword: values[FORM_FIELDS.NEW_PASSWORD]
                }

                console.log("Updating Password for:", userRole, submitData);

                await new Promise(resolve => setTimeout(resolve, 1500));

                if (Platform.OS === 'android') {
                    ToastAndroid.show("Password updated successfully!", ToastAndroid.SHORT);
                }

                const targetPath = userRole === 'bartender'
                    ? "/bartender/(tabs)/profile" as Href
                    : "/customer/profile" as Href;

                router.replace(targetPath);
            } catch (error: any) {
                const message = error?.data?.message || error?.message || "Something went wrong!";
                if (Platform.OS === 'android') {
                    ToastAndroid.show(message, ToastAndroid.LONG);
                } else {
                    Alert.alert("Error", message);
                }
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <SafeAreaView style={styles.safeareContainer}>
            <View style={{ paddingTop: 20 }}>
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
                    {loading ? (
                        <View style={{ alignItems: 'center' }}>
                            <CustomLoader size={45} />
                        </View>
                    ) : (
                        <CustomButton
                            title="Update Password"
                            // onPress={handleSubmit}
                            onPress={()=>router.back()}
                            width="100%"
                            height={48}
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
        marginTop: 16,
        paddingHorizontal: "5%"
    },
    buttonContainer: {
        marginTop: 20,
        // Changed from center to stretch so the 100% width button works correctly
        alignItems: 'stretch' 
    }
})