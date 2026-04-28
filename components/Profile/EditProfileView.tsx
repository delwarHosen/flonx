import { CameraIcon } from '@/assets/images/icons/ProfileInfoIcons/CameraIcon'
import { WarningIcon } from '@/assets/images/icons/ProfileInfoIcons/WarningIcon'
import { CustomButton } from '@/components/CustomButton'
import { FormInput } from '@/components/inputForm/InputForm'
import ProfileImageComponent from '@/components/ProfileImageComponents'
import SectionTitle from '@/components/SectionTitle'
import { FORM_FIELDS, FORM_LABELS } from '@/constants/form'
import { IMAGE_COMPONENTS } from '@/constants/image.index'
import { Colors } from '@/constants/theme'
import { useForm } from '@/hooks/useForm'
import { useGetProfileQuery, useUpdateProfileMutation } from '@/redux/services/authApi'
import { RootState } from '@/redux/store'
import { getPlaceDetails, getPlaceSuggestions } from '@/utils/getPlaceApi'
import { hp, wp } from '@/utils/responsive'
import { validateExperience, validateName, validatePhoneNumber } from '@/utils/validation'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { showToast } from '../Toast'
import { Body2, Caption3 } from '../typo/Typography'

export default function EditProfileView() {
    const router = useRouter();
    const userRole = useSelector((state: RootState) => state.auth.userRole);
    const isBartender = userRole === "bartender";

    const { data: profile } = useGetProfileQuery({});
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const [localImage, setLocalImage] = useState<string | null>(null);

    // ── Location states ──────────────────────────────────────────────
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<{ name: string; placeId: string }[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const { values, errors, touched, handleChange, handleSubmit, setValues } = useForm({
        initialValues: {
            [FORM_FIELDS.FULL_NAME]: "",
            [FORM_FIELDS.CONTACT_NO]: "",
            [FORM_FIELDS.EXPERIENCE]: "",
            [FORM_FIELDS.ADDRESS]: "",
        },
        validationRules: {
            [FORM_FIELDS.FULL_NAME]: validateName,
            [FORM_FIELDS.CONTACT_NO]: (value: string) => isBartender ? validatePhoneNumber(value) : "",
            [FORM_FIELDS.EXPERIENCE]: (value: string) => isBartender ? validateExperience(value) : "",
            [FORM_FIELDS.ADDRESS]: (value: string) => isBartender && !value ? "Address is required" : "",
        },
        onSubmit: async (formValues) => {
            try {
                if (localImage) {
                    const imageFormData = new FormData();

                    const filename = localImage.split('/').pop() || 'profile_photo.jpg';
                    const match = /\.(\w+)$/.exec(filename);
                    const type = match ? `image/${match[1]}` : 'image/jpeg';

                    imageFormData.append('profile_image', {
                        uri: localImage,
                        name: filename,
                        type,
                    } as any);

                    imageFormData.append('name', formValues[FORM_FIELDS.FULL_NAME]);
                    imageFormData.append('phone', formValues[FORM_FIELDS.CONTACT_NO]);
                    imageFormData.append('experience', formValues[FORM_FIELDS.EXPERIENCE]);

                    if (isBartender) {
                        imageFormData.append('address', formValues[FORM_FIELDS.ADDRESS]);
                        imageFormData.append('location', JSON.stringify({
                            type: 'Point',
                            coordinates: [
                                coords?.lng ?? 90.4125,
                                coords?.lat ?? 23.8103,
                            ],
                        }));
                    }

                    await updateProfile(imageFormData).unwrap();

                } else {
                    const payload: any = {
                        name: formValues[FORM_FIELDS.FULL_NAME],
                        phone: formValues[FORM_FIELDS.CONTACT_NO],
                        experience: Number(formValues[FORM_FIELDS.EXPERIENCE]),
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

                    await updateProfile(payload).unwrap();
                }

                showToast("Profile updated successfully!");

                if (isBartender) {
                    router.push("/bartender/profile/my-profile");
                } else {
                    router.push("/customer/my-profile");
                }

            } catch (error: any) {
                console.error("Update error detail:", JSON.stringify(error, null, 2));
                if (error?.status === 401) return;
                showToast("Update failed! Please try again.");
            }
        },
    });

    // ── Profile data load ────────────────────────────────────────────
    useEffect(() => {
        if (profile) {
            setValues({
                [FORM_FIELDS.FULL_NAME]: profile.name || "",
                [FORM_FIELDS.CONTACT_NO]: profile.phone || "",
                [FORM_FIELDS.EXPERIENCE]: profile.experience?.toString() || "",
                [FORM_FIELDS.ADDRESS]: profile.address || "",
            });

            // existing coords load
            if (profile.location?.coordinates?.length === 2) {
                setCoords({
                    lng: profile.location.coordinates[0],
                    lat: profile.location.coordinates[1],
                });
            }
        }
    }, [profile]);

    // ── GPS auto-detect ──────────────────────────────────────────────
    const handleDetectLocation = async () => {
        setLocationLoading(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                showToast("Location permission required!");
                return;
            }
            const loc = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = loc.coords;
            setCoords({ lat: latitude, lng: longitude });

            const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
            const address = [place.street, place.city, place.country]
                .filter(Boolean)
                .join(', ');
            handleChange(FORM_FIELDS.ADDRESS, address);
            setSuggestions([]);
            setShowSuggestions(false);
        } catch {
            showToast("Failed to detect location.");
        } finally {
            setLocationLoading(false);
        }
    };

    // ── Manual type → suggestions ────────────────────────────────────
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

    // ── Suggestion select ────────────────────────────────────────────
    const handleSelectSuggestion = async (s: { name: string; placeId: string }) => {
        handleChange(FORM_FIELDS.ADDRESS, s.name);
        setShowSuggestions(false);
        setSuggestions([]);

        const details = await getPlaceDetails(s.placeId);
        if (details?.latitude && details?.longitude) {
            setCoords({ lat: details.latitude, lng: details.longitude });
        }
    };

    // ── Image picker ─────────────────────────────────────────────────
    const handlePickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            showToast("Permission required!");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (!result.canceled) {
            setLocalImage(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ paddingVertical: hp(20) }}>
                <SectionTitle title='Update profile' />
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingHorizontal: wp(20), paddingBottom: hp(40) }}
                >
                    <View style={{ marginTop: hp(10) }}>

                        <ProfileImageComponent
                            image={
                                localImage
                                    ? { uri: localImage }
                                    : profile?.profile_image?.trim()
                                        ? { uri: profile.profile_image }
                                        : IMAGE_COMPONENTS.profileImg
                            }
                            icon={<CameraIcon />}
                            onIconPress={handlePickImage}
                        />

                        <FormInput
                            label={FORM_LABELS[FORM_FIELDS.FULL_NAME]}
                            value={values[FORM_FIELDS.FULL_NAME]}
                            onChangeText={(text) => handleChange(FORM_FIELDS.FULL_NAME, text)}
                            placeholder='Enter your name'
                            error={errors[FORM_FIELDS.FULL_NAME]}
                            touched={touched[FORM_FIELDS.FULL_NAME]}
                        />

                        {isBartender && (
                            <>
                                <FormInput
                                    label={FORM_LABELS[FORM_FIELDS.CONTACT_NO]}
                                    value={values[FORM_FIELDS.CONTACT_NO]}
                                    onChangeText={(text) => handleChange(FORM_FIELDS.CONTACT_NO, text)}
                                    placeholder='Enter your phone number'
                                    error={errors[FORM_FIELDS.CONTACT_NO]}
                                    touched={touched[FORM_FIELDS.CONTACT_NO]}
                                />
                                <FormInput
                                    label={FORM_LABELS[FORM_FIELDS.EXPERIENCE]}
                                    value={values[FORM_FIELDS.EXPERIENCE]}
                                    onChangeText={(text) => handleChange(FORM_FIELDS.EXPERIENCE, text)}
                                    placeholder='Enter years of experience'
                                    error={errors[FORM_FIELDS.EXPERIENCE]}
                                    touched={touched[FORM_FIELDS.EXPERIENCE]}
                                />

                                {/* ── Location Field ── */}
                                <View>
                                    <FormInput
                                        label="Address"
                                        placeholder="Type or detect your location"
                                        value={values[FORM_FIELDS.ADDRESS]}
                                        onChangeText={handleLocationChange}
                                        error={errors[FORM_FIELDS.ADDRESS]}
                                        touched={touched[FORM_FIELDS.ADDRESS]}
                                        rightIcon={
                                            <TouchableOpacity
                                                onPress={handleDetectLocation}
                                                disabled={locationLoading}
                                            >
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
                                                    <Ionicons
                                                        name="location-outline"
                                                        size={16}
                                                        color={Colors.PLACEHOLLDER_TEXT}
                                                    />
                                                    <Body2
                                                        color={Colors.NEUTRAL0}
                                                        style={{ marginLeft: 8, flex: 1 }}
                                                    >
                                                        {s.name}
                                                    </Body2>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            </>
                        )}

                        <CustomButton
                            title={isLoading ? "Saving..." : "Save the changes"}
                            onPress={handleSubmit}
                            disabled={isLoading}
                            width="100%"
                            height={hp(44)}
                            borderRadius={100}
                            style={{ marginTop: hp(20) }}
                        />

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 10,
                            marginTop: hp(20),
                        }}>
                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                height: 26,
                                width: 26,
                                borderRadius: 10,
                                backgroundColor: "#EF44441A"
                            }}>
                                <WarningIcon />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Caption3 italic color={"#C9C6D6"}>
                                    Email updates are restricted as it is linked to authentication and system records.
                                </Caption3>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    suggestionBox: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        marginTop: -hp(8),
        marginBottom: hp(12),
        overflow: 'hidden',
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(16),
        paddingVertical: hp(12),
        borderBottomWidth: 1,
        borderBottomColor: Colors.BORDER_COLOR,
    },
});