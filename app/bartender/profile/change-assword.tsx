import { CustomButton } from '@/components/CustomButton'
import CustomLoader from '@/components/CustomLoader'
import { FormInput } from '@/components/inputForm/InputForm'
import SectionTitle from '@/components/SectionTitle'
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from '@/constants/form'
import { useForm } from '@/hooks/useForm'
import { validatePassword } from '@/utils/validation'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, ToastAndroid, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ChangePssword() {
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);


    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
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

            // if (values[FORM_FIELDS.NEW_PASSWORD] !== values[FORM_FIELDS.CONFIRM_NEW_PASSWORD]) {
            //     ToastAndroid.show("Passwords do not match!", ToastAndroid.SHORT);
            //     return;
            // }

            setLoading(true);
            try {
                const data = {
                    password: values[FORM_FIELDS.OLD_PASSWORD] 
                }
                console.log("Submitting...", data);

                await new Promise(resolve => setTimeout(resolve, 1000));

                router.push("/customer/profile");
            } catch (error: any) {
                const message = error?.data?.message || error?.message || "something eent wrong while signing!"

                ToastAndroid.showWithGravityAndOffset(
                    message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                )
            }
            finally {
                setLoading(false);
            }

        },
    });


    return (
        <SafeAreaView style={styles.safeareContainer}>
            <View>
                <SectionTitle
                    title='Change Password'
                />
                <View style={styles.form}>

                    <FormInput
                        label={FORM_LABELS[FORM_FIELDS.OLD_PASSWORD]}
                        value={values[FORM_FIELDS.OLD_PASSWORD]}
                        onChangeText={(text) => handleChange(FORM_FIELDS.OLD_PASSWORD, text)}
                        placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.OLD_PASSWORD]}
                        // placeholder='Enter Your Password'
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
                        // placeholder='Enter Your Password'
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
                        // placeholder='Enter Your Password'
                        type="password"
                        error={errors[FORM_FIELDS.CONFIRM_NEW_PASSWORD]}
                        touched={touched[FORM_FIELDS.CONFIRM_NEW_PASSWORD]}
                        required
                    />

                    {/* ----Submit Button---- */}
                    {
                        loading ? (
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <CustomLoader size={45} />
                            </View>
                        ) : (
                            <CustomButton
                                title="Update Password"
                                onPress={handleSubmit}
                                width="100%"
                                height={44}
                                borderRadius={100}
                            />
                        )
                    }

                </View>
            </View>

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    safeareContainer: {
        flex: 1,
        // backgroundColor: Colors.APP_BACKGROUND
    },
    form: {
        marginTop: 16,
        paddingHorizontal: "5%"
    }
})