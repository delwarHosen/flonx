import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import SectionTitle from '@/components/SectionTitle';
import { Body2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface GigFormValues {
    [key: string]: string;
    eventTitle: string;
    eventLocation: string;
    eventDate: string;
    eventTime: string;
    hourlyRate: string;
    contactNumber: string;
    eventDescription: string;
}

const UpdateGig: React.FC = () => {
    const [description, setDescription] = useState<string>('');

    
    const { values, handleChange, handleSubmit, errors, touched } = useForm<GigFormValues>({
        initialValues: {
            eventTitle: '',
            eventLocation: '',
            eventDate: '',
            eventTime: '',
            hourlyRate: '',
            contactNumber: '',
            eventDescription: '',
        },
        validationRules: {
            eventTitle: (v) => (!v ? 'Event title is required' : ''),
            eventLocation: (v) => (!v ? 'Location is required' : ''),
            eventDate: (v) => (!v ? 'Date is required' : ''),
            eventTime: (v) => (!v ? 'Time is required' : ''),
            hourlyRate: (v) => (!v ? 'Hourly rate is required' : ''),
            contactNumber: (v) => (!v ? 'Contact number is required' : ''),
            eventDescription: (v) => (!v ? 'Description is required' : ''),
        },
        onSubmit: (finalValues: GigFormValues) => {
            console.log('Publishing Event:', finalValues);
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginVertical:20}}>
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
                        value={values.eventTitle}
                        onChangeText={(text: string) => handleChange('eventTitle', text)}
                        error={errors.eventTitle}
                        touched={touched.eventTitle}
                    />

                    <FormInput
                        label="Event Location"
                        placeholder="Enter Event Location"
                        value={values.eventLocation}
                        onChangeText={(text: string) => handleChange('eventLocation', text)}
                        error={errors.eventLocation}
                        touched={touched.eventLocation}
                    />

                    <FormInput
                        label="Event Date"
                        placeholder="Select event date(s)"
                        value={values.eventDate}
                        onChangeText={(text: string) => handleChange('eventDate', text)}
                        error={errors.eventDate}
                        touched={touched.eventDate}
                        rightIcon={<Ionicons name="calendar-outline" size={20} color={Colors.NEUTRAL0} />}
                    />

                    <FormInput
                        label="Event Time"
                        placeholder="Select start and end time"
                        value={values.eventTime}
                        onChangeText={(text: string) => handleChange('eventTime', text)}
                        error={errors.eventTime}
                        touched={touched.eventTime}
                        rightIcon={<Ionicons name="time-outline" size={20} color={Colors.NEUTRAL0} />}
                    />

                    <FormInput
                        label="Hourly Rate"
                        placeholder="Enter hourly rate"
                        type="number"
                        value={values.hourlyRate}
                        onChangeText={(text: string) => handleChange('hourlyRate', text)}
                        error={errors.hourlyRate}
                        touched={touched.hourlyRate}
                    />

                    <FormInput
                        label="Contact Number"
                        placeholder="Enter contact number"
                        type="number"
                        value={values.contactNumber}
                        onChangeText={(text: string) => handleChange('contactNumber', text)}
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

                    <View style={{  marginBottom: 20 }}>
                        <CustomButton
                            title="Publish Event"
                            onPress={handleSubmit}
                            width="100%"
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
        paddingHorizontal: '5%',
        paddingBottom: 20,
        marginTop: 16
    },
    label: {
        marginBottom: 10,
        marginTop: 10
    },
    input: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        color: '#FFFFFF',
        fontSize: 14,
    },
    textArea: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 14,
        color: '#FFFFFF',
        fontSize: 14,
        height: 150,
    },
});

export default UpdateGig;