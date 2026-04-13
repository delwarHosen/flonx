import { AuthHeading } from '@/components/auth/AuthHeading';
import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import { Body3 } from '@/components/typo/Typography';
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from '@/constants/form';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { useRegisterMutation } from '@/redux/services/authApi';
import { RootState } from '@/redux/store';
import { validateName, validatePassword, validatePhoneNumber } from '@/utils/validation';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const { height } = Dimensions.get('window');

const rs = (small: number, medium: number, large: number) => {
  if (height < 700) return small;
  if (height >= 700 && height < 844) return medium;
  return large;
};

export default function RegisterScreen() {
  const router = useRouter();
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const isBartender = userRole === "bartender";

  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm({
    initialValues: {
      [FORM_FIELDS.FULL_NAME]: "",
      [FORM_FIELDS.EMAIL]: "",
      [FORM_FIELDS.CONTACT_NO]: "",
      [FORM_FIELDS.PASSWORD]: "",
      [FORM_FIELDS.CONFIRM_PASSWORD]: "",
    },

    validationRules: {
      [FORM_FIELDS.FULL_NAME]: validateName,
      [FORM_FIELDS.EMAIL]: (val: string) => (!val.trim() ? "Email is required" : ""),
      [FORM_FIELDS.CONTACT_NO]: (val: string): string => {
        if (isBartender) return validatePhoneNumber(val);
        return '';
      },

      [FORM_FIELDS.PASSWORD]: validatePassword,

      //  Now uses allValues instead of stale closure
      [FORM_FIELDS.CONFIRM_PASSWORD]: (val: string, allValues: Record<string, string>): string => {
        if (!val.trim()) return "Confirm Password is required";
        if (val !== allValues[FORM_FIELDS.PASSWORD]) return "Passwords do not match";

        return "";
      },
    },

    onSubmit: async (formValues) => {

      try {
        const payload = {
          name: formValues[FORM_FIELDS.FULL_NAME],
          email: formValues[FORM_FIELDS.EMAIL],
          password: formValues[FORM_FIELDS.PASSWORD],
          confirmPassword: formValues[FORM_FIELDS.CONFIRM_PASSWORD],
          role: userRole,
          phone: isBartender ? formValues[FORM_FIELDS.CONTACT_NO] : "",
        };

        // console.log("Sending Payload:", payload);

        const res = await registerUser(payload).unwrap();

        // console.log('Register Response:', JSON.stringify(res, null, 2));

        if (res?.success) {
          ToastAndroid.show(res.message || "Registration Successful!", ToastAndroid.SHORT);
          router.push({
            pathname: "/email-verify",
            params: { email: formValues[FORM_FIELDS.EMAIL] }
          });
        }
      } catch (error: any) {
        console.log("Forgot Password Error:", error);
        const message =
          error?.data?.message ||
          error?.message ||
          "Something went wrong!";
        ToastAndroid.show(message, ToastAndroid.LONG);
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
              title={isBartender ? "Join as a Bartender" : "Create Your Account"}
              description={isBartender ?
                "Create your profile to get discovered and apply for gigs."
                : "Sign up to track orders, explore bars, and access extra features."}
            />

            <View style={styles.form}>
              <FormInput
                label={FORM_LABELS[FORM_FIELDS.FULL_NAME]}
                value={values[FORM_FIELDS.FULL_NAME]}
                onChangeText={(text) => handleChange(FORM_FIELDS.FULL_NAME, text)}
                onBlur={() => handleBlur(FORM_FIELDS.FULL_NAME)}
                placeholder='Enter Your Full Name'
                error={errors[FORM_FIELDS.FULL_NAME]}
                touched={touched[FORM_FIELDS.FULL_NAME]}
                required
              />

              <FormInput
                label={FORM_LABELS[FORM_FIELDS.EMAIL]}
                value={values[FORM_FIELDS.EMAIL]}
                onChangeText={(text) => handleChange(FORM_FIELDS.EMAIL, text)}
                onBlur={() => handleBlur(FORM_FIELDS.EMAIL)}
                type="email"
                placeholder='Enter Your Email'
                error={errors[FORM_FIELDS.EMAIL]}
                touched={touched[FORM_FIELDS.EMAIL]}
                required
              />

              {isBartender && (
                <FormInput
                  label={FORM_LABELS[FORM_FIELDS.CONTACT_NO]}
                  value={values[FORM_FIELDS.CONTACT_NO]}
                  onChangeText={(number) => handleChange(FORM_FIELDS.CONTACT_NO, number)}
                  onBlur={() => handleBlur(FORM_FIELDS.CONTACT_NO)}
                  type="number"
                  placeholder='Enter Your Contact No'
                  error={errors[FORM_FIELDS.CONTACT_NO]}
                  touched={touched[FORM_FIELDS.CONTACT_NO]}
                  required
                />
              )}

              <FormInput
                label={FORM_LABELS[FORM_FIELDS.PASSWORD]}
                value={values[FORM_FIELDS.PASSWORD]}
                onChangeText={(text) => handleChange(FORM_FIELDS.PASSWORD, text)}
                onBlur={() => handleBlur(FORM_FIELDS.PASSWORD)}
                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.PASSWORD]}
                type="password"
                error={errors[FORM_FIELDS.PASSWORD]}
                touched={touched[FORM_FIELDS.PASSWORD]}
                required
              />

              <FormInput
                label={FORM_LABELS[FORM_FIELDS.CONFIRM_PASSWORD]}
                value={values[FORM_FIELDS.CONFIRM_PASSWORD]}
                onChangeText={(text) => handleChange(FORM_FIELDS.CONFIRM_PASSWORD, text)}
                onBlur={() => handleBlur(FORM_FIELDS.CONFIRM_PASSWORD)}
                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.CONFIRM_PASSWORD]}
                type="password"
                error={errors[FORM_FIELDS.CONFIRM_PASSWORD]}
                touched={touched[FORM_FIELDS.CONFIRM_PASSWORD]}
                required
              />

              <CustomButton
                title={isLoading ? "Creating..." : "Create Account"}
                onPress={handleSubmit}
                disabled={isLoading}
                width="100%"
                height={rs(44, 48, 52)}
                borderRadius={100}
              />
            </View>

            <View style={styles.footer}>
              <Body3 color={Colors.PLACEHOLLDER_TEXT}>Already have an account?</Body3>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Body3 color={Colors.BRAND_PRIMARY}> Sign In</Body3>
              </TouchableOpacity>
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
    paddingVertical: rs(16, 24, 32),
    minHeight: height,
  },
  form: {
    marginTop: rs(12, 16, 20),
    gap: rs(2, 4, 4),
  },
  footer: {
    marginTop: rs(12, 16, 16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});