import { CameraIcon } from '@/assets/images/icons/ProfileInfoIcons/CameraIcon'
import { WarningIcon } from '@/assets/images/icons/ProfileInfoIcons/WarningIcon'
import { CustomButton } from '@/components/CustomButton'
import { FormInput } from '@/components/inputForm/InputForm'
import ProfileImageComponent from '@/components/ProfileImageComponents'
import SectionTitle from '@/components/SectionTitle'
import { FORM_FIELDS, FORM_LABELS } from '@/constants/form'
import { IMAGE_COMPONENTS } from '@/constants/image.index'
import { Colors } from '@/constants/theme'
import { useForm } from '@/hooks/useForm'
import { RootState } from '@/redux/store'
import { hp, wp } from '@/utils/responsive'
import { validateExperience, validateName, validatePhoneNumber } from '@/utils/validation'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { Caption3 } from '../typo/Typography'


export default function EditProfileView() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const userRole = useSelector((state: RootState) => state.auth.userRole);
    const isBartender = userRole === "bartender";


    const {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
    } = useForm({
        initialValues: {
            [FORM_FIELDS.FULL_NAME]: (params[FORM_FIELDS.FULL_NAME] as string) || "",
            [FORM_FIELDS.CONTACT_NO]: (params[FORM_FIELDS.CONTACT_NO] as string) || "",
            [FORM_FIELDS.EXPERIENCE]: (params[FORM_FIELDS.EXPERIENCE] as string) || "",
        },
        validationRules: {
            [FORM_FIELDS.FULL_NAME]: validateName,
            [FORM_FIELDS.CONTACT_NO]: validatePhoneNumber,
            [FORM_FIELDS.EXPERIENCE]: validateExperience,

        },
        onSubmit: async (formValues) => {
            console.log("Updating Data:", formValues);
            if (isBartender) {
                router.push("/bartender/profile/my-profile");
            } else {
                router.push("/customer/my-profile")
            }

        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingVertical: hp(20) }}>
                <SectionTitle title='Update profile' />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ paddingHorizontal: wp(20) }}
            >
                <View style={{ marginTop: hp(10) }}>
                    <ProfileImageComponent
                        image={IMAGE_COMPONENTS.profileImg}
                        icon={<CameraIcon />}
                    />


                    <FormInput
                        label={FORM_LABELS[FORM_FIELDS.FULL_NAME]}
                        value={values[FORM_FIELDS.FULL_NAME]}
                        onChangeText={(text) => handleChange(FORM_FIELDS.FULL_NAME, text)}
                        placeholder='Enter your name'
                        error={errors[FORM_FIELDS.FULL_NAME]}
                        touched={touched[FORM_FIELDS.FULL_NAME]}
                    // required
                    />


                    {isBartender && (
                        <>
                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.CONTACT_NO]}
                                value={values[FORM_FIELDS.CONTACT_NO]}
                                onChangeText={(text) => handleChange(FORM_FIELDS.CONTACT_NO, text)}
                                placeholder='Enter your phone number'
                                error={errors[FORM_FIELDS.CONTACT_NO]}
                                touched={touched[FORM_FIELDS.CONTACT_NO]}
                            />
                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.EXPERIENCE]}
                                value={values[FORM_FIELDS.EXPERIENCE]}
                                onChangeText={(text) => handleChange(FORM_FIELDS.EXPERIENCE, text)}
                                placeholder='Enter your phone number'
                                error={errors[FORM_FIELDS.EXPERIENCE]}
                                touched={touched[FORM_FIELDS.EXPERIENCE]}
                            />
                        </>
                    )}

                    <CustomButton
                        title="Save the changes"
                        // onPress={handleSubmit}
                        onPress={
                            () => isBartender ? router.push("/bartender/profile/my-profile") : router.push("/customer/my-profile")
                        }
                        width="100%"
                        height={hp(44)}
                        borderRadius={100}
                        style={{ marginTop: hp(20) }}
                    />

         
                    {/* Warning Section ... */}
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 10,
                        marginTop: hp(20),
                        // paddingHorizontal: "4%" 
                    }}>
                        <View style={{
                            justifyContent: "center",
                            alignItems: "center",
                            height: 26,
                            width: 26,
                            borderRadius: 10,
                            backgroundColor: "#EF44441A"
                        }}>
                            <WarningIcon />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Caption3 italic color={"#C9C6D6"}>
                                Email updates are restricted as it is linked to authentication and system records.
                            </Caption3>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND
    },
    warningContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: hp(16)
    },
    iconContainer: {
        backgroundColor: "#EF44441A",
        alignItems: "center",
        justifyContent: "center",
        height: 30, width: 30, borderRadius: 4,
    }
});