import { AuthHeading } from '@/components/auth/AuthHeading';
import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import { showToast } from '@/components/Toast';
import { Body3 } from '@/components/typo/Typography';
import { FORM_FIELDS, FORM_LABELS, FORM_PLACEHOLDERS } from '@/constants/form';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { useRegisterMutation } from '@/redux/services/authApi';
import { RootState } from '@/redux/store';
import { getPlaceDetails, getPlaceSuggestions } from '@/utils/getPlaceApi';
import { hp } from '@/utils/responsive';
import { validateName, validatePassword, validatePhoneNumber } from '@/utils/validation';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { OneSignal } from 'react-native-onesignal';
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

  //  Location states
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{ name: string; placeId: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);


  //  GPS detect
  const handleDetectLocation = async () => {
    setLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      setCoords({ lat: latitude, lng: longitude });
      const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
      const address = [place.street, place.city, place.country].filter(Boolean).join(', ');
      handleChange(FORM_FIELDS.ADDRESS, address);
      setSuggestions([]);
      setShowSuggestions(false);
    } catch (err) {
      console.log('GPS failed');
    } finally {
      setLocationLoading(false);
    }
  };

  //  Typing suggestion
  const handleLocationChange = async (text: string) => {
    handleChange(FORM_FIELDS.ADDRESS, text);
    setCoords(null);
    if (text.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const results = await getPlaceSuggestions(text);
    setSuggestions(results);
    setShowSuggestions(true);
  };


  //  Suggestion select
  const handleSelectSuggestion = async (s: { name: string; placeId: string }) => {
    handleChange(FORM_FIELDS.ADDRESS, s.name);
    setShowSuggestions(false);
    setSuggestions([]);
    const details = await getPlaceDetails(s.placeId);
    if (details?.latitude && details?.longitude) {
      setCoords({ lat: details.latitude, lng: details.longitude });
    }
  };


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
      [FORM_FIELDS.ADDRESS]: ""
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

      [FORM_FIELDS.ADDRESS]: (val: string): string => {
        if (isBartender && !val.trim()) return "Address is required for Bartenders";
        return "";
      },
    },

    onSubmit: async (formValues) => {
      try {
        const deviceState = await OneSignal.User.pushSubscription.getIdAsync();
        const playerId = deviceState ?? null;

        const payload: any = {
          name: formValues[FORM_FIELDS.FULL_NAME],
          email: formValues[FORM_FIELDS.EMAIL],
          password: formValues[FORM_FIELDS.PASSWORD],
          confirmPassword: formValues[FORM_FIELDS.CONFIRM_PASSWORD],
          role: userRole,
          phone: isBartender ? formValues[FORM_FIELDS.CONTACT_NO] : "",
          playerId
        };



        if (isBartender) {
          payload.address = formValues[FORM_FIELDS.ADDRESS];
          payload.location = {
            type: 'Point',
            coordinates: [
              coords?.lng ?? 90.4125,
              coords?.lat ?? 23.8103,
            ],
          };
        }

        const res = await registerUser(payload).unwrap();

        if (res?.success) {

          showToast(res.message || "Registration Successful!", 'success');
          router.push({
            pathname: "/email-verify",
            params: { email: formValues[FORM_FIELDS.EMAIL] }
          });
        }
      } catch (error: any) {
        const message =
          error?.data?.message ||
          error?.message ||
          "Something went wrong!";

        showToast(message, 'error');
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
                <View>
                  <FormInput
                    label={FORM_LABELS[FORM_FIELDS.ADDRESS]}
                    value={values[FORM_FIELDS.ADDRESS]}
                    onChangeText={handleLocationChange}
                    onBlur={() => handleBlur(FORM_FIELDS.ADDRESS)}
                    placeholder="Enter your address"
                    error={errors[FORM_FIELDS.ADDRESS]}
                    touched={touched[FORM_FIELDS.ADDRESS]}
                    required
                    rightIcon={
                      <TouchableOpacity onPress={handleDetectLocation} disabled={locationLoading}>
                        <Ionicons
                          name={locationLoading ? 'reload-outline' : 'location-outline'}
                          size={20}
                          color={coords ? Colors.BRAND_PRIMARY : Colors.NEUTRAL0}
                        />
                      </TouchableOpacity>
                    }
                  />

                  {showSuggestions && suggestions.length > 0 && (
                    <View style={styles.suggestionBox}>
                      {suggestions.map((s) => (
                        <TouchableOpacity
                          key={s.placeId}
                          onPress={() => handleSelectSuggestion(s)}
                          style={styles.suggestionItem}
                        >
                          <Ionicons name="location-outline" size={16} color={Colors.PLACEHOLLDER_TEXT} />
                          <Body3 color={Colors.NEUTRAL0} style={{ marginLeft: 8, flex: 1 }}>
                            {s.name}
                          </Body3>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              )}

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
                style={{ marginTop: hp(16) }}
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
    paddingVertical: hp(100)
  },
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: rs(16, 20, 24),
    paddingVertical: rs(16, 24, 32),
    // minHeight: height,
    backgroundColor: Colors.APP_BACKGROUND,
  },
  form: {
    marginTop: rs(12, 16, 20),
    gap: rs(2, 4, 4),
  },
  suggestionBox: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    marginTop: -4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_COLOR,
  },
  footer: {
    marginTop: rs(12, 16, 16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});