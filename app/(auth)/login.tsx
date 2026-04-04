import { AuthHeading } from '@/components/auth/AuthHeading';
import { Checkbox } from '@/components/auth/Checkbox';
import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import { Body2, Body3 } from '@/components/typo/Typography';
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from '@/constants/form';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { setCredentials } from '@/redux/authSlice'; // Credentials set korar action
import { baseApis } from '@/redux/base';
import { useLoginMutation } from '@/redux/services/authApi';
import { RootState } from '@/redux/store';
import { hp, wp } from '@/utils/responsive';
import { validateEmail, validatePassword } from '@/utils/validation';
import { Link, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from "jwt-decode";
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isRemembered, setIsRemembered] = React.useState(false);

  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const [loginSubmit, { isLoading }] = useLoginMutation();

  const {
    values,
    errors,
    touched,
    handleChange,
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
        const res = await loginSubmit({
          email: values[FORM_FIELDS.EMAIL],
          password: values[FORM_FIELDS.PASSWORD],
          // role: userRole,
        }).unwrap();

        // console.log("Login Response:", res.data);

        if (res?.success && res?.data?.accessToken) {
          const token = res.data.accessToken;
          await SecureStore.setItemAsync('accessToken', token);

          const decoded: any = jwtDecode(token);
          // console.log("Decoded Token:", decoded);
          const roleFromToken = decoded.role;

          // console.log("Decoded Role from Token:", roleFromToken);

          if (roleFromToken) {
            dispatch(baseApis.util.resetApiState()); 

            dispatch(setCredentials({
              role: roleFromToken,
              token: token
            }));

            ToastAndroid.show("Login Successful!", ToastAndroid.SHORT);

            if (roleFromToken === 'bartender') {
              router.replace("/bartender/(tabs)/browse");
            } else {
              router.replace("/customer/(tabs)/home");
            }
          }

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
        <View style={styles.container}>
          <View style={{ width: '100%', maxWidth: 500 }}>
            <AuthHeading
              title="Welcome Back"
              description="Sign in to continue exploring and managing your orders."
            />

            <View style={styles.form}>
              <FormInput
                label={FORM_LABELS[FORM_FIELDS.EMAIL]}
                value={values[FORM_FIELDS.EMAIL]}
                onChangeText={(text) => handleChange(FORM_FIELDS.EMAIL, text)}
                type="email"
                placeholder='Enter Your Email'
                error={errors[FORM_FIELDS.EMAIL]}
                touched={touched[FORM_FIELDS.EMAIL]}
              />

              <FormInput
                label={FORM_LABELS[FORM_FIELDS.PASSWORD]}
                value={values[FORM_FIELDS.PASSWORD]}
                onChangeText={(text) => handleChange(FORM_FIELDS.PASSWORD, text)}
                placeholder={FORM_PLACEHOLDERS[FORM_FIELDS.PASSWORD]}
                type="password"
                error={errors[FORM_FIELDS.PASSWORD]}
                touched={touched[FORM_FIELDS.PASSWORD]}
              />

              <View>
                <Checkbox
                  label="Remember me"
                  checked={isRemembered}
                  onChange={(val) => setIsRemembered(val)}
                />

                <View style={styles.forgotPasswordContainer}>
                  <Link href="/(auth)/forgot-password" asChild>
                    <TouchableOpacity>
                      <Body2 color={Colors.BRAND_PRIMARY} style={styles.forgotPassword}>
                        Forgot password?
                      </Body2>
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>

              <CustomButton
                title={isLoading ? "Logging in..." : "Log in"}
                onPress={handleSubmit}
                disabled={isLoading}
                width="100%"
                height={hp(44)}
                borderRadius={100}
              />
            </View>

            <View style={styles.footer}>
              <Body3 color={Colors.PLACEHOLLDER_TEXT}>No account yet?</Body3>
              <TouchableOpacity onPress={() => router.push("/select-role")}>
                <Body3 color={Colors.BRAND_PRIMARY}> Create an account</Body3>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(20)
  },
  form: {
    marginTop: hp(32),
    gap: 12,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: -5,
  },
  forgotPassword: {
    fontSize: 14,
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  }
});