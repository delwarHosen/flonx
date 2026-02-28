import { AuthHeading } from '@/components/auth/AuthHeading';
import { CustomButton } from '@/components/CustomButton';
import CustomLoader from '@/components/CustomLoader';
import { Body2, Body3, H2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';

const CODE_LENGTH = 6;

export default function VerifyOtp() {
  const router = useRouter();
  const [code, setCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<TextInput | null>(null);

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
    setTimer(30);
    setCanResend(false);
    setCode('');
    if (Platform.OS === 'android') {
      ToastAndroid.show('Verification code sent again!', ToastAndroid.SHORT);
    }
  };

  const handleVerify = () => {
    if (code.length !== CODE_LENGTH) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please enter full 6-digit code', ToastAndroid.SHORT);
      }
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/(auth)/set-new-password');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : "height"}
    >
      <View style={styles.scrollContent}>
        <View style={styles.container}>
          <AuthHeading
            title="Verify Your OTP"
            description="Enter the 6-digit verification code sent to your email address."
          />

          <View style={styles.form}>
            <Body2 color={Colors.PLACEHOLLDER_TEXT} style={{ fontWeight: '600', marginBottom: 8 }}>
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
                      {code[index] ? '•' : ''}
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

            {/* Loader Section: Centered */}
            <View>
              {loading ? (
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <CustomLoader size={45} />
                </View>
              ) : (
                <CustomButton
                  title="Verify Code"
                  onPress={handleVerify}
                  width="100%"
                  height={44}
                  borderRadius={100}
                />
              )}
            </View>
          </View>
        </View>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: "5%",
    backgroundColor:Colors.APP_BACKGROUND
  },
  container: {
    width: '100%',
  },
  form: {
    marginTop: "8%",
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  otpBox: {
    width: 54,
    height: 54,
    borderWidth: 1,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor:Colors.INPUT_BACKGROUND
  },
  otpText: {
    fontSize: 24,
    fontWeight: '600',
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
    fontWeight: '600',
  },
  timerText: {
    color: Colors.BRAND_PRIMARY,
  },

});