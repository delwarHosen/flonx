import { CustomButton } from '@/components/CustomButton'
import { FormInput } from '@/components/inputForm/InputForm'
import ProfileImageComponent from '@/components/ProfileImageComponents'
import SectionTitle from '@/components/SectionTitle'
import { FORM_FIELDS, FORM_LABELS } from '@/constants/form'
import { IMAGE_COMPONENTS } from '@/constants/image.index'
import { Colors } from '@/constants/theme'
import { useForm } from '@/hooks/useForm'
import { validateName } from '@/utils/validation'
import { useRouter } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, Platform, ToastAndroid, View } from 'react-native'

export default function EditProfile() {
    const router = useRouter();
    const handleEdit = () => {
        router.push("/")
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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: Colors.APP_BACKGROUND, paddingHorizontal: "5%", marginTop: 12 }}
        >
            <View>
                <SectionTitle
                    title='My Profile'
                />
                <ProfileImageComponent
                    image={IMAGE_COMPONENTS.profileImg}
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
            </View>
        </KeyboardAvoidingView>
    )
}