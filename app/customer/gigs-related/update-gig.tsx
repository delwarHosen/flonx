import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import SectionTitle from '@/components/SectionTitle';
import { Body2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useGetSingleJobQuery, useUpdateJobMutation } from '@/redux/services/jobApi';
import { hp, wp } from '@/utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
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

    // Pre-fill fields when job data loads
    useEffect(() => {
        if (job) {
            setTitle(job.title ?? '');
            setAddress(job.address ?? '');
            setHourlyRate(job.hourlyRate?.toString() ?? '');
            setContactNumber(job.contactNumber ?? '');
            setDescription(job.description ?? '');
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

    const handleUpdate = async () => {
        try {
            const payload = {
                jobId,
                title,
                address,
                startDateTime: buildISO(selectedDate, startTime),
                endDateTime: buildISO(selectedDate, endTime),
                hourlyRate: Number(hourlyRate),
                contactNumber,
                description,
            };
            console.log("jobId:", jobId);
            console.log("payload:", payload);
            await updateJob(payload).unwrap();
            ToastAndroid.show('Job updated successfully!', ToastAndroid.LONG);
            router.back();
        } catch (error: any) {
            console.error("Update error full:", JSON.stringify(error));  // এটা দিয়ে replace করো
            ToastAndroid.show(
                error?.data?.message ?? 'Failed to update job.',
                ToastAndroid.LONG
            );
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
                <ScrollView contentContainerStyle={styles.scrollContent}>

                    <FormInput
                        label="Event Title"
                        placeholder="Enter event title"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <FormInput
                        label="Event Location"
                        placeholder="Enter Event Location"
                        value={address}
                        onChangeText={setAddress}
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
});

export default UpdateGig;