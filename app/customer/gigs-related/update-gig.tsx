import { CustomButton } from '@/components/CustomButton';
import { FormInput } from '@/components/inputForm/InputForm';
import SectionTitle from '@/components/SectionTitle';
import { Body2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UpdateGig = () => {

  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');

  const existingGigData = {
    eventTitle: 'Private Birthday Party',
    eventLocation: 'Austin, Texas, USA',
    eventDate: '22, 23 February 2026',
    eventTime: '6:00 PM – 11:00 PM',
    hourlyRate: '25.00',
    contactNumber: '+1 (212) 555-0148',
    eventDescription: 'Join us for an evening of networking...',
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useForm({
    initialValues: existingGigData,
    validationRules: {
      eventTitle: (v) => (!v ? 'Required' : ''),
      eventLocation: (v) => (!v ? 'Required' : ''),
      eventDate: (v) => (!v ? 'Required' : ''),
      eventTime: (v) => (!v ? 'Required' : ''),
      hourlyRate: (v) => (!v ? 'Required' : ''),
      contactNumber: (v) => (!v ? 'Required' : ''),
      eventDescription: (v) => (!v ? 'Required' : ''),
    },
    onSubmit: (updatedValues) => {
      console.log('Updating Gig:', updatedValues);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <SectionTitle title="Update Gig" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <FormInput
          label="Event Title"
          value={values.eventTitle}
          onChangeText={(t) => handleChange('eventTitle', t)}

          error={errors.eventTitle}
          touched={touched.eventTitle}
        />

        <FormInput
          label="Event Location"
          value={values.eventLocation}
          onChangeText={(t) => handleChange('eventLocation', t)}

          error={errors.eventLocation}
          touched={touched.eventLocation}
        />

        <FormInput
          label="Event Date"
          value={values.eventDate}
          onChangeText={(t) => handleChange('eventDate', t)}

          error={errors.eventDate}
          touched={touched.eventDate}
        />

        <FormInput
          label="Event Time"
          value={values.eventTime}
          onChangeText={(t) => handleChange('eventTime', t)}

          error={errors.eventTime}
          touched={touched.eventTime}
        />

        <FormInput
          label="Hourly Rate"
          type="number"
          value={values.hourlyRate}
          onChangeText={(t) => handleChange('hourlyRate', t)}

          error={errors.hourlyRate}
          touched={touched.hourlyRate}
        />

        <FormInput
          label="Contact Number"
          type="number"
          value={values.contactNumber}
          onChangeText={(t) => handleChange('contactNumber', t)}

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

        <View style={{ marginTop: 30, marginBottom: 20 }}>
          <CustomButton
            title="Save The Changes"
            onPress={handleSubmit}
            width="100%"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
  scrollContent: {
    paddingHorizontal: '5%',
    paddingBottom: 20
  },
  label: {
    marginBottom: 10,
    marginTop: 10
  },

  // Single-line input
  input: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    // paddingHorizontal: 16,
    // paddingVertical: 14,
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
    minHeight: 150,
  },
});

export default UpdateGig;