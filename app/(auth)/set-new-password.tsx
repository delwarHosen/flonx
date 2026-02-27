import { AuthHeading } from '@/components/auth/AuthHeading';
import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from '@/constants/form';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { validateConfirmPassword, validatePassword } from '@/utils/validation';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ToastAndroid,
  TouchableWithoutFeedback,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ForgotPassword() {
  const router = useRouter();

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
    onSubmit: async (values) => {
      try {
        const data = {
          newPassword: values[FORM_FIELDS.NEW_PASSWORD],
          confirmNewPassword: values[FORM_FIELDS.CONFIRM_PASSWORD]
        };
        console.log("Set new password data:", data)
        router.push("/(auth)/login")
      } catch (error: any) {
        const message = error?.data?.message || error?.message || "Something went wrong!";
        if (Platform.OS === 'android') {
          ToastAndroid.show(message, ToastAndroid.LONG);
        }
      }
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
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
                required
              />


              <CustomButton
                title="Send Verification Code"
                onPress={handleSubmit}
                width="100%"
                height={44}
                borderRadius={10}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.APP_BACKGROUND
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  form: {
    marginTop: 32,
    width: '100%',
  },
})