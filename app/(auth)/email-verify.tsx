import { AuthHeading } from '@/components/auth/AuthHeading';
import { CustomButton } from '@/components/CustomButton';
import CustomLoader from '@/components/CustomLoader';
import { showToast } from '@/components/Toast';
import { Body2, Body3, H2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useResendVerifyCodeMutation, useVerifyEmailMutation } from '@/redux/services/authApi';
import { RootState } from '@/redux/store';
import { hp, wp } from '@/utils/responsive';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const CODE_LENGTH = 6;

export default function EmailVerifyOtp() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const inputRef = useRef<TextInput | null>(null);

  const [verifyEmail, { isLoading: isVerifying }] = useVerifyEmailMutation();
  const [resendCode, { isLoading: isResending }] = useResendVerifyCodeMutation();

  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const isBartender = userRole === "bartender";

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    if (!canResend || isResending) return;

    try {
      const res = await resendCode({ email }).unwrap();
      if (res.success) {
        setTimer(30);
        setCanResend(false);
        showToast(res.message || 'Verification code sent again!', 'success');

        setTimeout(() => {
          setCode('');
          inputRef.current?.blur();
          setTimeout(() => {
            inputRef.current?.focus();
          }, 100);
        }, 300);
      }
    } catch (error: any) {
      const errorMsg = error?.data?.message || "Failed to resend code";
      showToast(errorMsg, 'error');
    }
  };

  const handleVerify = async () => {
    if (code.length !== CODE_LENGTH) {
      showToast('Please enter full 6-digit code');
      return;
    }

    try {
      const currentCode = code;
      const payload = {
        email: email,
        verifyCode: Number(currentCode),
      };

      const res = await verifyEmail(payload).unwrap();

      if (res?.success) {
        if (res.data?.accessToken) {
          await SecureStore.setItemAsync('accessToken', res.data.accessToken);
          await SecureStore.setItemAsync('refreshToken', res.data.refreshToken);
        }

        showToast(res.message || "Verification Successful!", 'success');

        if (isBartender) {
          router.replace("/bartender-info");
        } else {
          router.replace('/onboarding');
        }
      }
    } catch (error: any) {
      console.log("Verify Error:", error);
      const errorMsg = error?.data?.message || "Verification failed!";
      showToast(errorMsg, 'error');
      setCode('');
      setTimeout(() => {
        inputRef.current?.blur();
        setTimeout(() => inputRef.current?.focus(), 100);
      }, 300);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.APP_BACKGROUND }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : "height"}
      >
        <View style={styles.scrollContent}>
          <View style={styles.container}>
            <AuthHeading
              title="Verify your email"
              description="Enter the 6-digit verification code sent to your email address."
            />

            <View style={styles.form}>
              <Body2 color={Colors.PLACEHOLLDER_TEXT} style={{ marginBottom: hp(8) }}>
                Verification Code
              </Body2>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  inputRef.current?.blur();
                  setTimeout(() => inputRef.current?.focus(), 200);
                }}
              >
                <View style={styles.otpContainer}>
                  {Array.from({ length: CODE_LENGTH }).map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.otpBox,
                        {
                          borderColor: index < code.length || index === code.length
                            ? Colors.BRAND_PRIMARY
                            : Colors.BORDER_COLOR,
                        },
                      ]}
                    >
                      <H2 color={Colors.OTP_COLOR} style={styles.otpText}>
                        {code[index] ? code[index] : ''}
                      </H2>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>

              <TextInput
                ref={inputRef}
                value={code}
                onChangeText={text => setCode(text.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
                maxLength={CODE_LENGTH}
                style={styles.hiddenInput}
                autoFocus={true}
                showSoftInputOnFocus={true}
                caretHidden={true}
                contextMenuHidden={true}
              />

              <View style={styles.resendContainer}>
                <Body3 color={Colors.PLACEHOLLDER_TEXT}>Didn't receive the code?</Body3>
                {canResend ? (
                  <TouchableOpacity onPress={handleResend} disabled={isResending}>
                    <Body3 color={Colors.BRAND_PRIMARY} style={styles.resendText}>
                      {isResending ? "Sending..." : "Resend code"}
                    </Body3>
                  </TouchableOpacity>
                ) : (
                  <Body3 color={Colors.BRAND_PRIMARY} style={styles.timerText}>Resend in {timer}s</Body3>
                )}
              </View>

              <View>
                {isVerifying ? (
                  <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <CustomLoader size={45} />
                  </View>
                ) : (
                  <CustomButton
                    title="Verify code"
                    onPress={handleVerify}
                    width="100%"
                    height={hp(44)}
                    borderRadius={100}
                    style={{ marginTop: hp(16) }}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    backgroundColor: Colors.APP_BACKGROUND
  },
  container: {
    width: '100%',
  },
  form: {
    marginTop: hp(32),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpBox: {
    width: (width * 0.9 - 50) / 6,
    height: (width * 0.9 - 50) / 6,
    maxWidth: 54,
    maxHeight: 54,
    borderWidth: 1,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.INPUT_BACKGROUND
  },
  otpText: {
    fontSize: 24,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
    top: -999,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(16),
    marginBottom: hp(20),
  },
  resendText: {},
  timerText: {
    color: Colors.BRAND_PRIMARY,
  },
});