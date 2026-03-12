import { AuthHeading } from '@/components/auth/AuthHeading';
import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import { Body2 } from '@/components/typo/Typography';
import { FORM_FIELDS, FORM_LABELS } from '@/constants/form';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { RootState } from '@/redux/store';
import { validateExperience, validateSkills } from '@/utils/validation';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, ToastAndroid, View } from 'react-native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

// Responsive helpers
const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 414;
const isLargeDevice = width >= 414;

const responsiveSize = (small: number, medium: number, large: number) => {
    if (isSmallDevice) return small;
    if (isMediumDevice) return medium;
    return large;
};

const responsiveFontSize = (base: number) => {
    const scale = width / 375;
    const scaled = base * scale;
    return Math.round(Math.min(scaled, base * 1.3));
};

const responsiveSpacing = (base: number) => {
    const scale = width / 375;
    return Math.round(base * Math.min(scale, 1.4));
};


export default function BartenderInfoScreen() {
    const router = useRouter();
    const [isRemembered, setIsRemembered] = React.useState(false);
    const userRole = useSelector((state: RootState) => (state.auth.userRole));
    const [description, setDescription] = React.useState<string>('');



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
            [FORM_FIELDS.EXPERIENCE]: "",
            [FORM_FIELDS.SKILL]: "",
        },

        validationRules: {
            [FORM_FIELDS.EXPERIENCE]: validateExperience,
            [FORM_FIELDS.SKILL]: validateSkills,
        },

        onSubmit: async (values) => {
            try {
                const data = {
                    experience: values.experience,
                    skill: values.skill
                }

                // api call
                // const res = await loginSubmit().unwrap()
                // if (!res?.success) {
                //   throw new Error(res?.message)
                // }

                // ToastAndroid.show()

                if (userRole === 'bartender') {
                    router.replace("/bartender/(tabs)/browse");
                } else {
                    router.replace("/customer/(tabs)/home");
                }

                // console.log("SignIn data from login Page", data)
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
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >

                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: responsiveSize(16, 20, 24),
                    paddingVertical: responsiveSpacing(24),
                    minHeight: height,
                }}>

                    <View style={{ width: '100%', maxWidth: 500 }}>

                        <AuthHeading
                            title="Complete Your Bartender Profile"
                            description="Help Venue owners understand your experience before sending shift requests."
                        />

                        {/* ---Form--- */}
                        <View style={styles.form}>

                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.EXPERIENCE]}
                                value={values[FORM_FIELDS.EXPERIENCE]}
                                onChangeText={(text) => handleChange(FORM_FIELDS.EXPERIENCE, text)}
                                type="text"
                                placeholder='Enter your Years of Experience'
                                error={errors[FORM_FIELDS.EXPERIENCE]}
                                touched={touched[FORM_FIELDS.EXPERIENCE]}
                                required
                            />

                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.SKILL]}
                                value={values[FORM_FIELDS.SKILL]}
                                onChangeText={(text) => handleChange(FORM_FIELDS.EXPERIENCE, text)}
                                type="text"
                                placeholder='e.g., Mixology, Inventory, High-Volume'
                                error={errors[FORM_FIELDS.SKILL]}
                                touched={touched[FORM_FIELDS.SKILL]}
                                required
                            />

                            <Body2 color={Colors.NEUTRAL0} style={styles.label}>Short Bio</Body2>
                            <TextInput
                                style={styles.textArea}
                                value={description}
                                onChangeText={setDescription}
                                placeholder="A brief introduction about your bartending background"
                                placeholderTextColor={"#8C88A3"}
                                multiline
                                textAlignVertical="top"
                            />

                            {/* ----Submit Button---- */}
                            <CustomButton
                                title="Save & Continue"
                                // onPress={handleSubmit}
                                onPress={() =>
                                    router.push("/onboarding")
                                }
                                width="100%"
                                height={responsiveSize(44, 48, 52)}
                                borderRadius={100}
                            // icon={<DoubleRightArrowIcon />}
                            />
                        </View>


                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: Colors.APP_BACKGROUND,
        // minHeight: height,
    },
    form: {
        marginTop: responsiveSize(24, 16, 40),
        gap: responsiveSpacing(4),
    },
    label: {
        marginBottom: 4,
        marginTop: 10
    },
    textArea: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 14,
        color: '#FFFFFF',
        fontSize: 14,
        height: 150,   
    },
})