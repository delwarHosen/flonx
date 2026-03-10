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
import { RootState } from '@/redux/store'
import { validateName } from '@/utils/validation'
import { Href, useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, ToastAndroid, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'

export default function EditProfileView() {
    const router = useRouter();
    const params = useLocalSearchParams(); 
    const userRole = useSelector((state: RootState) => state.auth.userRole);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
    } = useForm({
        initialValues: {
            [FORM_FIELDS.FULL_NAME]: (params.name as string) || "",
        },
        validationRules: {
            [FORM_FIELDS.FULL_NAME]: validateName,
        },
        onSubmit: async (formValues) => {
            try {
                const data = {
                    fullName: formValues[FORM_FIELDS.FULL_NAME]
                }
                console.log("Updating Profile Data:", data);
                
                const backPath: Href = userRole === 'bartender' 
                    ? "/bartender/profile/my-profile" 
                    : "/customer/my-profile";
                
                router.push(backPath);
            } catch (error: any) {
                const message = error?.message || "Something went wrong!";
                ToastAndroid.show(message, ToastAndroid.SHORT);
            }
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingVertical: 10 }}>
                <SectionTitle title='Update profile' />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ paddingHorizontal: "5%" }}
            >
                <View style={{ marginTop: 10 }}>
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
                        required
                    />

                    <CustomButton
                        title="Save the changes"
                        // onPress={handleSubmit} 
                        onPress={()=>router.back()}
                        width="100%"
                        height={44}
                        borderRadius={100}
                        style={{marginTop: 20}}
                    />

                    <View style={styles.warningContainer}>
                        <View style={styles.iconContainer}>
                            <WarningIcon size={18} />
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
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
    warningContainer: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 16 },
    iconContainer: {
        backgroundColor: "#EF44441A",
        alignItems: "center",
        justifyContent: "center",
        height: 30, width: 30, borderRadius: 4,
    }
});