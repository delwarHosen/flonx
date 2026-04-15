import { AuthHeading } from '@/components/auth/AuthHeading';
import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import { showToast } from '@/components/Toast';
import { Body2 } from '@/components/typo/Typography';
import { FORM_FIELDS, FORM_LABELS } from '@/constants/form';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { useUpdateProfileMutation } from '@/redux/services/authApi';
import { RootState } from '@/redux/store';
import { hp, wp } from '@/utils/responsive';
import { validateExperience, validateSkills } from '@/utils/validation';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

// Responsive helper
const rs = (small: number, medium: number, large: number) => {
    if (width < 375) return small;
    if (width >= 375 && width < 414) return medium;
    return large;
};

export default function BartenderInfoScreen() {
    const router = useRouter();
    const userRole = useSelector((state: RootState) => state.auth.userRole);
    const [bio, setBio] = useState<string>('');

    // API Mutation hook
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const {
        values,
        errors,
        touched,
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
        onSubmit: async (formValues) => {
            try {
                // Token check
                const token = await SecureStore.getItemAsync('accessToken');
                // console.log('Token:', token ? token.substring(0, 30) + '...' : 'MISSING');



                const skillArray = formValues[FORM_FIELDS.SKILL].split(',').map(s => s.trim());
                const payload = {
                    experience: formValues[FORM_FIELDS.EXPERIENCE],
                    skills: skillArray,
                    bio: bio,
                };

                await updateProfile(payload).unwrap();
                showToast("Profile updated successfully!");
                router.replace("/onboarding");

            } catch (error: any) {
                console.log('Update error detail:', JSON.stringify(error, null, 2));
                const message = error?.data?.message || error?.message || "Something went wrong!";
                showToast(message);
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
                <View style={styles.containerStyle}>
                    <View style={{ width: '100%', maxWidth: 500 }}>
                        <AuthHeading
                            title="Complete Your Bartender Profile"
                            description="Help Venue owners understand your experience before sending shift requests."
                        />

                        <View style={styles.form}>
                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.EXPERIENCE]}
                                value={values[FORM_FIELDS.EXPERIENCE]}
                                onChangeText={(text) => handleChange(FORM_FIELDS.EXPERIENCE, text)}
                                onBlur={() => handleBlur(FORM_FIELDS.EXPERIENCE)}
                                placeholder='Enter your Years of Experience'
                                error={errors[FORM_FIELDS.EXPERIENCE]}
                                touched={touched[FORM_FIELDS.EXPERIENCE]}
                                required
                            />

                            <FormInput
                                label={FORM_LABELS[FORM_FIELDS.SKILL]}
                                value={values[FORM_FIELDS.SKILL]}
                                onChangeText={(text) => handleChange(FORM_FIELDS.SKILL, text)}
                                onBlur={() => handleBlur(FORM_FIELDS.SKILL)}
                                placeholder='e.g., Mixology, Inventory, High-Volume'
                                error={errors[FORM_FIELDS.SKILL]}
                                touched={touched[FORM_FIELDS.SKILL]}
                                required
                            />

                            <View>
                                <Body2 color={Colors.NEUTRAL0} style={styles.label}>Short Bio</Body2>
                                <TextInput
                                    style={styles.textArea}
                                    value={bio}
                                    onChangeText={setBio}
                                    placeholder="A brief introduction about your bartending background"
                                    placeholderTextColor={"#8C88A3"}
                                    multiline
                                    textAlignVertical="top"
                                />
                            </View>

                            <CustomButton
                                title={isLoading ? "Saving..." : "Save & Continue"}
                                onPress={handleSubmit}
                                disabled={isLoading}
                                width="100%"
                                height={rs(44, 48, 52)}
                                borderRadius={100}
                                style={{ marginTop: hp(20) }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    containerStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: rs(16, 20, 24),
        paddingVertical: hp(20),
    },
    form: {
        marginTop: rs(24, 16, 40),
        gap: hp(15),
    },
    label: {
        marginBottom: hp(8),
    },
    textArea: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingHorizontal: wp(16),
        paddingTop: hp(12),
        paddingBottom: hp(12),
        color: '#FFFFFF',
        fontSize: 14,
        height: hp(120),
    },
});