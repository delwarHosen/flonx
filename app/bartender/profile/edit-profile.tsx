import { CameraIcon } from '@/assets/images/icons/ProfileInfoIcons/CameraIcon'
import { WarningIcon } from '@/assets/images/icons/ProfileInfoIcons/WarningIcon'
import { CustomButton } from '@/components/CustomButton'
import { FormInput } from '@/components/inputForm/InputForm'
import ProfileImageComponent from '@/components/ProfileImageComponents'
import SectionTitle from '@/components/SectionTitle'
import { Caption3 } from '@/components/typo/Typography'
import { FORM_FIELDS, FORM_LABELS } from '@/constants/form'
import { IMAGE_COMPONENTS } from '@/constants/image.index'
import { Colors } from '@/constants/theme'
import { useForm } from '@/hooks/useForm'
import { validateName } from '@/utils/validation'
import { useRouter } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, ToastAndroid, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function EditProfile() {
    const router = useRouter();
    const handleEdit = () => {
        router.push("/customer/profile")
    }


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
            [FORM_FIELDS.FULL_NAME]: "",

        },

        validationRules: {
            [FORM_FIELDS.FULL_NAME]: validateName,

        },

        onSubmit: async (values) => {
            try {
                const data = {
                    fullName: values[FORM_FIELDS.FULL_NAME]
                }
                console.log("SignIn data from signup Page", data)
                // router.push("/(tabs)/home")
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

        },
    });


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ paddingHorizontal: "5%" }}
            >
                <View>
                     <SectionTitle
                        title='Update profile '
                    />
                </View>
                <View style={{marginTop:10}}>
                    <ProfileImageComponent
                        image={IMAGE_COMPONENTS.profileImg}
                        icon={<CameraIcon/>}
                    />

                    <FormInput
                        label={FORM_LABELS[FORM_FIELDS.FULL_NAME]}
                        value={values[FORM_FIELDS.FULL_NAME]}
                        onChangeText={(text) => handleChange(FORM_FIELDS.FULL_NAME, text)}
                        type="email"
                        placeholder='Roberts Junior '
                        error={errors[FORM_FIELDS.FULL_NAME]}
                        touched={touched[FORM_FIELDS.FULL_NAME]}
                        required
                    />

                    {/* ----Submit Button---- */}
                    <CustomButton
                        title="Save the changes "
                        onPress={handleEdit}
                        width="100%"
                        height={44}
                        borderRadius={100}
                    />
                    <View style={styles.warningContainer}>
                        <View style={styles.iconContainer}>
                            <WarningIcon size={18}/>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Caption3 color={Colors.PLACEHOLLDER_TEXT}>
                                Email updates are restricted as it is linked to authentication and system records.
                            </Caption3>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    warningContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 16,
        maxWidth: "100%"
    },
    iconContainer: {
        backgroundColor: "#EF44441A",
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        width: 30,
        padding: 4,
        borderRadius: 4,

    }
})