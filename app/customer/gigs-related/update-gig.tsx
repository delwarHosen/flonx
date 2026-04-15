import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import SectionTitle from '@/components/SectionTitle';
import { showToast } from '@/components/Toast';
import { Body2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useGetSingleJobQuery, useUpdateJobMutation } from '@/redux/services/jobApi';
import { getPlaceDetails, getPlaceSuggestions } from '@/utils/getPlaceApi';
import { hp, wp } from '@/utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UpdateGig: React.FC = () => {
    const router = useRouter();
    const { jobId } = useLocalSearchParams<{ jobId: string }>();

    const { data: job, isLoading: jobLoading } = useGetSingleJobQuery(jobId, { skip: !jobId });
    const [updateJob, { isLoading: updating }] = useUpdateJobMutation();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [description, setDescription] = useState('');

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<{ name: string; placeId: string }[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (job) {
            setTitle(job.title ?? '');
            setAddress(job.address ?? '');
            setHourlyRate(job.hourlyRate?.toString() ?? '');
            setContactNumber(job.contactNumber ?? '');
            setDescription(job.description ?? '');

            if (job.location?.coordinates) {
                setCoords({
                    lng: job.location.coordinates[0],
                    lat: job.location.coordinates[1],
                });
            }

            if (job.startDateTime) {
                const s = new Date(job.startDateTime);
                setSelectedDate(s);
                setStartTime(s);
            }
            if (job.endDateTime) {
                setEndTime(new Date(job.endDateTime));
            }
        }
    }, [job]);

    const formatDate = (date: Date) => date.toLocaleDateString('en-CA');
    const formatTime = (date: Date) =>
        date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const buildISO = (date: Date, time: Date): string => {
        const d = formatDate(date);
        const t = formatTime(time);
        return `${d}T${t}:00.000Z`;
    };

    const handleDetectLocation = async () => {
        setLocationLoading(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            const loc = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = loc.coords;
            setCoords({ lat: latitude, lng: longitude });

            const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
            const addr = [place.street, place.city, place.country]
                .filter(Boolean)
                .join(', ');
            setAddress(addr);
            setSuggestions([]);
            setShowSuggestions(false);
        } catch (err) {
            console.log('GPS failed');
        } finally {
            setLocationLoading(false);
        }
    };

    const handleLocationChange = async (text: string) => {
        setAddress(text);
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

    const handleSelectSuggestion = async (s: { name: string; placeId: string }) => {
        setAddress(s.name);
        setShowSuggestions(false);
        setSuggestions([]);

        const details = await getPlaceDetails(s.placeId);
        if (details?.latitude && details?.longitude) {
            setCoords({ lat: details.latitude, lng: details.longitude });
        }
    };

   const handleUpdate = async () => {
        try {
            
            if (!title || !address || !hourlyRate) {
               
                showToast('Please fill in all required fields.')
                return;
            }

            const payload = {
                jobId,
                title,
                address,
                location: {
                    type: 'Point',
                    coordinates: [
                        coords?.lng ?? job?.location?.coordinates[0] ?? 90.4125,
                        coords?.lat ?? job?.location?.coordinates[1] ?? 23.8103,
                    ],
                },
                startDateTime: buildISO(selectedDate, startTime),
                endDateTime: buildISO(selectedDate, endTime),
                hourlyRate: Number(hourlyRate),
                contactNumber,
                description,
            };

            await updateJob(payload).unwrap();
            showToast('Job updated successfully!',)
            router.back();
        } catch (error: any) {
            console.error("Update error full:", JSON.stringify(error));
            
         
            const errorMessage = error?.data?.message || error?.message || 'Failed to update job.';
            showToast(errorMessage,"error")
        }
    };

    if (jobLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color={Colors.BRAND_PRIMARY} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginVertical: '4%' }}>
                <SectionTitle title="Update Gig" />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <FormInput
                        label="Event Title"
                        placeholder="Enter event title"
                        value={title}
                        onChangeText={setTitle}
                    />

                    {/* Location Field with Suggestions */}
                    <View>
                        <FormInput
                            label="Event Location"
                            placeholder="Enter Event Location"
                            value={address}
                            onChangeText={handleLocationChange}
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

                    {/* Date Picker */}
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <FormInput
                            label="Event Date"
                            placeholder="Select event date"
                            value={formatDate(selectedDate)}
                            onChangeText={() => { }}
                            editable={false}
                            rightIcon={<Ionicons name="calendar-outline" size={20} color={Colors.NEUTRAL0} />}
                        />
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            minimumDate={new Date()}
                            onChange={(_, date) => {
                                setShowDatePicker(false);
                                if (date) setSelectedDate(date);
                            }}
                        />
                    )}

                    {/* Start Time */}
                    <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
                        <FormInput
                            label="Start Time"
                            placeholder="Select start time"
                            value={formatTime(startTime)}
                            onChangeText={() => { }}
                            editable={false}
                            rightIcon={<Ionicons name="time-outline" size={20} color={Colors.NEUTRAL0} />}
                        />
                    </TouchableOpacity>
                    {showStartTimePicker && (
                        <DateTimePicker
                            value={startTime}
                            mode="time"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(_, time) => {
                                setShowStartTimePicker(false);
                                if (time) setStartTime(time);
                            }}
                        />
                    )}

                    {/* End Time */}
                    <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
                        <FormInput
                            label="End Time"
                            placeholder="Select end time"
                            value={formatTime(endTime)}
                            onChangeText={() => { }}
                            editable={false}
                            rightIcon={<Ionicons name="time-outline" size={20} color={Colors.NEUTRAL0} />}
                        />
                    </TouchableOpacity>
                    {showEndTimePicker && (
                        <DateTimePicker
                            value={endTime}
                            mode="time"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(_, time) => {
                                setShowEndTimePicker(false);
                                if (time) setEndTime(time);
                            }}
                        />
                    )}

                    <FormInput
                        label="Hourly Rate"
                        placeholder="Enter hourly rate"
                        type="number"
                        value={hourlyRate}
                        onChangeText={setHourlyRate}
                    />

                    <FormInput
                        label="Contact Number"
                        placeholder="Enter contact number"
                        type="number"
                        value={contactNumber}
                        onChangeText={setContactNumber}
                    />

                    <Body2 color={Colors.NEUTRAL0} style={styles.label}>Event Description</Body2>
                    <TextInput
                        style={styles.textArea}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Provide event details, activities, and important information for attendees."
                        placeholderTextColor={Colors.PLACEHOLLDER_TEXT}
                        multiline
                        textAlignVertical="top"
                    />

                    <View style={{ marginBottom: 20 }}>
                        <CustomButton
                            title={updating ? 'Updating...' : 'Update Event'}
                            onPress={handleUpdate}
                            width="100%"
                            disabled={updating}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
    scrollContent: {
        paddingHorizontal: wp(20),
        paddingBottom: hp(20),
        marginTop: hp(16),
    },
    label: {
        marginBottom: hp(10),
        marginTop: hp(10),
    },
    textArea: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingHorizontal: wp(16),
        paddingTop: hp(14),
        paddingBottom: hp(14),
        color: '#FFFFFF',
        fontSize: 14,
        height: 150,
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

export default UpdateGig;