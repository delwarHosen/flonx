import { AuthHeading } from '@/components/auth/AuthHeading';
import { Checkbox } from '@/components/auth/Checkbox';
import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import { Body2, Body3 } from '@/components/typo/Typography';
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from '@/constants/form';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { RootState } from '@/redux/store';
import { validateEmail, validatePassword } from '@/utils/validation';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [isRemembered, setIsRemembered] = React.useState(false);
  const userRole = useSelector((state: RootState) => (state.auth.userRole))

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
      [FORM_FIELDS.EMAIL]: "",
      [FORM_FIELDS.PASSWORD]: "",
    },

    validationRules: {
      [FORM_FIELDS.EMAIL]: validateEmail,
      [FORM_FIELDS.PASSWORD]: validatePassword,
    },

    onSubmit: async (values) => {
      try {
        const data = {
          email: values.email,
          password: values.password
        }

        if (userRole === 'bartender') {
          router.replace("/bartender/(tabs)/browse");
        } else {
          router.replace("/customer/(tabs)/home");
        }
        
        console.log("SignIn data from login Page", data)
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
              title="Welcome Back"
              description="Sign in to continue exploring and managing your orders."
            />

            {/* ---Form--- */}
            <View style={styles.form}>
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

              <View>
                <Checkbox
                  label="Remember me"
                  checked={isRemembered}
                  onChange={(val) => setIsRemembered(val)}
                  required
                />

                <View style={styles.forgotPasswordContainer}>
                  <Link href={{
                    pathname: "/(auth)/forgot-password",
                    params: {
                      email: FORM_FIELDS.EMAIL,
                    },
                  }}

                    asChild>
                    <TouchableOpacity>
                      <Body2 color={Colors.BRAND_PRIMARY} style={styles.forgotPassword}>
                        Forgot password?
                      </Body2>
                    </TouchableOpacity>
                  </Link>
                </View>

              </View>
              {/* ----Submit Button---- */}
              <CustomButton
                title="Login"
                onPress={handleSubmit}
                width="100%"
                height={44}
                borderRadius={100}
              // icon={<DoubleRightArrowIcon />}
              />
            </View>
            <View style={{ marginTop: 16, alignItems: "center" }}>
              <Body3 color={Colors.PLACEHOLLDER_TEXT}>No account yet?
                <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                  <Body3 color={Colors.BRAND_PRIMARY}> Create an account</Body3>
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