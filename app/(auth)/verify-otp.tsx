import { AuthHeading } from '@/components/auth/AuthHeading';
import { CustomButton } from '@/components/CustomButton';
import CustomLoader from '@/components/CustomLoader';
import { showToast } from '@/components/Toast';
import { Body2, Body3, H2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useVerifyForgetPasswordMutation } from '@/redux/services/authApi';
import { hp, wp } from '@/utils/responsive';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

const { width } = Dimensions.get('window');
const CODE_LENGTH = 6;
const OTP_BOX_SIZE = Math.min(54, (width * 0.8) / CODE_LENGTH);

export default function VerifyOtp() {
  const router = useRouter();
  const [code, setCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<TextInput | null>(null);

  const { email } = useLocalSearchParams();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyForgetPasswordMutation();

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

  const handleResend = () => {
    if (!canResend) return;
    setTimer(300);
    setCanResend(false);
    setCode('');
    showToast('Verification code sent again!',)
  };

  const handleVerify = async () => {
    if (code.length !== CODE_LENGTH) {
      showToast('Please enter full 6-digit code')
      return;
    }

    try {
      const payload = {
        email: email,
        resetCode: Number(code), // Key must be 'resetCode'
      };

      // console.log("Submitting Payload:", payload);

      const res = await verifyOtp(payload).unwrap();

      if (res?.success) {
        showToast(res.message || "OTP Verified!",)
        router.push({
          pathname: '/(auth)/set-new-password',
          params: { email: email, code: code }
        });
      }
    } catch (error: any) {
      // Error message handle kora
      const errorMsg = error?.data?.message || "Invalid OTP";
      showToast(errorMsg);
    }
  };

  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.APP_BACKGROUND }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : "height"}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.scrollContent}>
          <View style={styles.container}>
            <AuthHeading
              title="Verify Your OTP"
              description="Enter the 6-digit verification code sent to your email address."
            />

            <View style={styles.form}>
              <Body2 color={Colors.PLACEHOLLDER_TEXT} style={{ marginBottom: hp(8) }}>
                Verification Code
              </Body2>

              <TouchableOpacity activeOpacity={1} onPress={() => inputRef.current?.focus()}>
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
              />

              <View style={styles.resendContainer}>
                <Body3 color={Colors.PLACEHOLLDER_TEXT}>Didn’t receive the code?</Body3>
                {canResend ? (
                  <TouchableOpacity onPress={handleResend}>
                    <Body3 color={Colors.BRAND_PRIMARY} style={styles.resendText}>Resend Code</Body3>
                  </TouchableOpacity>
                ) : (
                  <Body3 color={Colors.BRAND_PRIMARY} style={styles.timerText}>Resend in {timer}s</Body3>
                )}
              </View>

              <View style={{ marginTop: 10 }}>
                {loading ? (
                  <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <CustomLoader size={45} />
                  </View>
                ) : (
                  <CustomButton
                    title={isVerifying ? "Verifying..." : "Verify Code"}
                    onPress={handleVerify}
                    width="100%"
                    height={hp(44)}
                    borderRadius={100}
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
    paddingHorizontal: wp(20),
    backgroundColor: Colors.APP_BACKGROUND
  },
  container: {
    width: '100%',
  },
  form: {
    marginTop: hp(20),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpBox: {
    width: OTP_BOX_SIZE,
    height: OTP_BOX_SIZE,
    borderWidth: 1,
    borderRadius: OTP_BOX_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.INPUT_BACKGROUND
  },
  otpText: {
    fontSize: 24,
    // fontWeight: '600',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  resendText: {
    // fontWeight: '600',
  },
  timerText: {
    color: Colors.BRAND_PRIMARY,
  },
});