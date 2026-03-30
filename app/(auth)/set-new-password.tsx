import { AuthHeading } from '@/components/auth/AuthHeading';
import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from '@/constants/form';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { useResetPasswordMutation } from '@/redux/services/authApi'; // API Hook
import { hp, wp } from '@/utils/responsive';
import { validateConfirmPassword, validatePassword } from '@/utils/validation';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SetNewPassword() {
  const router = useRouter();
  const { email, code } = useLocalSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues: {
      [FORM_FIELDS.NEW_PASSWORD]: "",
      [FORM_FIELDS.CONFIRM_PASSWORD]: "",
    },
    validationRules: {
      [FORM_FIELDS.NEW_PASSWORD]: validatePassword,
      [FORM_FIELDS.CONFIRM_PASSWORD]: (confirmValue: string): string =>
        validateConfirmPassword(values[FORM_FIELDS.NEW_PASSWORD], confirmValue),
    },
    onSubmit: async (formValues) => {
      console.log("Form submitted with:", formValues); 

      try {
        const payload = {
          email: email,
          resetCode: String(code), 
          password: formValues[FORM_FIELDS.NEW_PASSWORD],
          confirmPassword: formValues[FORM_FIELDS.CONFIRM_PASSWORD]
        };

        console.log("Sending payload to API:", payload);

        const res = await resetPassword(payload).unwrap();

        console.log("API Response:", res); 

        if (res?.success) {
          if (Platform.OS === 'android') {
            ToastAndroid.show(res.message || "Password reset successfully", ToastAndroid.SHORT);
          }
          router.replace("/(auth)/login");
        }
      } catch (error: any) {
        
        console.error("Full Reset Error:", JSON.stringify(error, null, 2));

        const message = error?.data?.message || error?.message || "Something went wrong";
        if (Platform.OS === 'android') {
          ToastAndroid.show(message, ToastAndroid.LONG);
        }
      }
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={{ width: '100%' }}>
              <AuthHeading
                title="Set New Password"
                description="Create a new password for your account to continue securely."
              />

              <View style={styles.form}>
                <FormInput
                  label={FORM_LABELS[FORM_FIELDS.NEW_PASSWORD]}
                  value={values[FORM_FIELDS.NEW_PASSWORD]}
                  onChangeText={(text) => handleChange(FORM_FIELDS.NEW_PASSWORD, text)}
                  placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.NEW_PASSWORD]}
                  type="password"
                  error={errors[FORM_FIELDS.NEW_PASSWORD]}
                  touched={touched[FORM_FIELDS.NEW_PASSWORD]}
                  editable={!isLoading}
                  required
                />

                <FormInput
                  label={FORM_LABELS[FORM_FIELDS.CONFIRM_PASSWORD]}
                  value={values[FORM_FIELDS.CONFIRM_PASSWORD]}
                  onChangeText={(text) => handleChange(FORM_FIELDS.CONFIRM_PASSWORD, text)}
                  placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.CONFIRM_PASSWORD]}
                  type="password"
                  error={errors[FORM_FIELDS.CONFIRM_PASSWORD]}
                  touched={touched[FORM_FIELDS.CONFIRM_PASSWORD]}
                  editable={!isLoading}
                  required
                />

                <View style={{ marginTop: hp(10) }}>
                  <CustomButton
                    title={isLoading ? "Updating..." : "Set New Password"}
                    onPress={handleSubmit}
                    disabled={isLoading}
                    width="100%"
                    height={hp(44)}
                    borderRadius={100}
                  />
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(20),
  },
  form: { marginTop: hp(20), width: '100%' },
});