import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import SectionTitle from '@/components/SectionTitle';
import { Body2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { useCreateJobMutation } from '@/redux/services/jobApi';
import { hp, wp } from '@/utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GigFormValues {
    [key: string]: string;
    eventTitle: string;
    eventLocation: string;
    hourlyRate: string;
    contactNumber: string;
    eventDescription: string;
}

const AddGig: React.FC = () => {
    const [description, setDescription] = useState<string>('');
    const [createJob, { isLoading }] = useCreateJobMutation();
    const router = useRouter();

    // Date & Time states
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    // Location states
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);

    // Format helpers
    const formatDate = (date: Date) =>
        date.toLocaleDateString('en-CA');

    const formatTime = (date: Date) =>
        date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const buildISO = (date: Date, time: Date): string => {
        const d = formatDate(date);
        const t = formatTime(time);
        return `${d}T${t}:00.000Z`;
    };

    // GPS location detect
    const handleDetectLocation = async () => {
        setLocationLoading(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocationLoading(false);
                return;
            }
            const loc = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = loc.coords;
            setCoords({ lat: latitude, lng: longitude });

            const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
            const address = [place.street, place.city, place.country]
                .filter(Boolean)
                .join(', ');
            handleChange('eventLocation', address);
        } catch (err) {
            console.log('GPS failed, use manual input');
        } finally {
            setLocationLoading(false);
        }
    };

    const { values, handleChange, errors, touched } = useForm<GigFormValues>({
        initialValues: {
            eventTitle: '',
            eventLocation: '',
            hourlyRate: '',
            contactNumber: '',
            eventDescription: '',
        },
        validationRules: {
            eventTitle: (v) => (!v ? 'Event title is required' : ''),
            eventLocation: (v) => (!v ? 'Location is required' : ''),
            hourlyRate: (v) => (!v ? 'Hourly rate is required' : ''),
            contactNumber: (v) => (!v ? 'Contact number is required' : ''),
            eventDescription: (v) => (!v ? 'Description is required' : ''),
        },
        onSubmit: () => { },
    });

    const handlePublish = async () => {
        // console.log(' Button clicked!');
        // ToastAndroid.show('Button clicked!', ToastAndroid.SHORT);

        try {
            const payload = {
                title: values.eventTitle,
                address: values.eventLocation,
                location: {
                    type: 'Point',
                    coordinates: [
                        coords?.lng ?? 90.4125,
                        coords?.lat ?? 23.8103,
                    ],
                },
                startDateTime: buildISO(selectedDate, startTime),
                endDateTime: buildISO(selectedDate, endTime),
                hourlyRate: Number(values.hourlyRate),
                contactNumber: values.contactNumber,
                description: description,
            };

            // console.log(' Payload:', JSON.stringify(payload, null, 2));
            // ToastAndroid.show('Submitting...', ToastAndroid.SHORT);

            const result = await createJob(payload).unwrap();
            console.log(' Job created:', result);
            ToastAndroid.show('Job published successfully!', ToastAndroid.LONG);
            router.back();
        } catch (error: any) {
            console.error(' Failed:', error);
            ToastAndroid.show(
                error?.data?.message ?? 'Failed to publish job.',
                ToastAndroid.LONG
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginVertical: hp(16) }}>
                <SectionTitle title="Add Gig" />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>

                    <FormInput
                        label="Event Title"
                        placeholder="Enter event title"
                        value={values.eventTitle}
                        onChangeText={(text) => handleChange('eventTitle', text)}
                        error={errors.eventTitle}
                        touched={touched.eventTitle}
                    />

                    <FormInput
                        label="Event Location"
                        placeholder="Type your location manually"
                        value={values.eventLocation}
                        onChangeText={(text) => {
                            handleChange('eventLocation', text);
                            setCoords(null);
                        }}
                        error={errors.eventLocation}
                        touched={touched.eventLocation}
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

                    {/* Start Time Picker */}
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

                    {/* End Time Picker */}
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
                        value={values.hourlyRate}
                        onChangeText={(text) => handleChange('hourlyRate', text)}
                        error={errors.hourlyRate}
                        touched={touched.hourlyRate}
                    />

                    <FormInput
                        label="Contact Number"
                        placeholder="Enter contact number"
                        type="number"
                        value={values.contactNumber}
                        onChangeText={(text) => handleChange('contactNumber', text)}
                        error={errors.contactNumber}
                        touched={touched.contactNumber}
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

                    <View style={{ marginBottom: hp(20) }}>
                        <CustomButton
                            title={isLoading ? 'Publishing...' : 'Publish Event'}
                            onPress={handlePublish}
                            width="100%"
                            disabled={isLoading}
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
});

export default AddGig;