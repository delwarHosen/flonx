import { AuthHeading } from '@/components/auth/AuthHeading';
import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import { Body3 } from '@/components/typo/Typography';
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from '@/constants/form';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { RootState } from '@/redux/store';
import { validateEmail, validateName, validatePassword, validatePhoneNumber } from '@/utils/validation';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen() {
  const router = useRouter();
  const [isRemembered, setIsRemembered] = React.useState(false);

  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const isBartender = userRole === "bartender";

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
      [FORM_FIELDS.EMAIL]: "",
      [FORM_FIELDS.CONTACT_NO]: "",
      [FORM_FIELDS.PASSWORD]: "",
      [FORM_FIELDS.CONFIRM_PASSWORD]: "",
    },

    validationRules: {
      [FORM_FIELDS.FULL_NAME]: validateName,
      [FORM_FIELDS.EMAIL]: validateEmail,
      [FORM_FIELDS.CONTACT_NO]: validatePhoneNumber,
      [FORM_FIELDS.PASSWORD]: validatePassword,
      [FORM_FIELDS.CONFIRM_PASSWORD]: validatePassword,
    },

    onSubmit: async (values) => {
      try {
        const data = {
          email: values.email,
          password: values.password
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


  const isFormValid =
    values[FORM_FIELDS.EMAIL] &&
    values[FORM_FIELDS.PASSWORD] &&
    !errors[FORM_FIELDS.EMAIL] &&
    !errors[FORM_FIELDS.PASSWORD]


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
          paddingHorizontal: "5%",
        }}>

          <View style={{ width: '100%' }}>

            <AuthHeading
              title={isBartender ? "Join as a Bartender" : "Create Your Account"}
              description={isBartender ?
                "Create your profile to get discovered and apply for gigs."
                : "Sign up to track orders, explore bars, and access extra features."}
            />

            {/* ---Form--- */}
            <View style={styles.form}>

              <FormInput
                label={FORM_LABELS[FORM_FIELDS.FULL_NAME]}
                value={values[FORM_FIELDS.FULL_NAME]}
                onChangeText={(text) => handleChange(FORM_FIELDS.FULL_NAME, text)}
                type="email"
                placeholder='Enter Your Email'
                error={errors[FORM_FIELDS.FULL_NAME]}
                touched={touched[FORM_FIELDS.FULL_NAME]}
                required
              />

              <FormInput
                label={FORM_LABELS[FORM_FIELDS.EMAIL]}
                value={values[FORM_FIELDS.EMAIL]}
                onChangeText={(text) => handleChange(FORM_FIELDS.EMAIL, text)}
                type="email"
                placeholder='Enter Your Email'
                error={errors[FORM_FIELDS.EMAIL]}
                touched={touched[FORM_FIELDS.EMAIL]}
                required
              />
              
              {
                isBartender && (
                  <FormInput
                    label={FORM_LABELS[FORM_FIELDS.CONTACT_NO]}
                    value={values[FORM_FIELDS.CONTACT_NO]}
                    onChangeText={(number) => handleChange(FORM_FIELDS.CONTACT_NO, number)}
                    type="number"
                    placeholder='Enter Your Contact No'
                    error={errors[FORM_FIELDS.CONTACT_NO]}
                    touched={touched[FORM_FIELDS.CONTACT_NO]}
                    required
                  />
                )
              }


              <FormInput
                label={FORM_LABELS[FORM_FIELDS.PASSWORD]}
                value={values[FORM_FIELDS.PASSWORD]}
                onChangeText={(text) => handleChange(FORM_FIELDS.PASSWORD, text)}
                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.PASSWORD]}
                // placeholder='Enter Your Password'
                type="password"
                error={errors[FORM_FIELDS.PASSWORD]}
                touched={touched[FORM_FIELDS.PASSWORD]}
                required
              />

              <FormInput
                label={FORM_LABELS[FORM_FIELDS.CONFIRM_PASSWORD]}
                value={values[FORM_FIELDS.CONFIRM_PASSWORD]}
                onChangeText={(text) => handleChange(FORM_FIELDS.CONFIRM_PASSWORD, text)}
                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.CONFIRM_PASSWORD]}
                // placeholder='Enter Your Password'
                type="password"
                error={errors[FORM_FIELDS.CONFIRM_PASSWORD]}
                touched={touched[FORM_FIELDS.CONFIRM_PASSWORD]}
                required
              />


              {/* ----Submit Button---- */}
              <CustomButton
                title="Create Account"
                onPress={handleSubmit}
                width="100%"
                height={44}
                borderRadius={100}
              // icon={<DoubleRightArrowIcon />}
              />
            </View>
            <View style={{ marginTop: 16, alignItems: "center" }}>
              <Body3 color={Colors.PLACEHOLLDER_TEXT}>Already have an account?
                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                  <Body3 color={Colors.BRAND_PRIMARY}> Sign In</Body3>
                </TouchableOpacity>
              </Body3>
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
    marginTop: "8%"
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    // marginBottom: 24,
  },
  forgotPassword: {
    fontWeight: '500',
  },
})