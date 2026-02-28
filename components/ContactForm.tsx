import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import { CustomButton } from './CustomButton';
import { Body1, Body2 } from './typo/Typography';

export default function ContactForm() {
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit=()=>{
        console.log("")
    }

    return (
        <View style={styles.container}>
            <Body1 italic color={Colors.NEUTRAL0} style={{ marginVertical: 16 }}>—Contact us</Body1>
            {/* ── Reason for Contact ── */}
            <Body2 color={Colors.NEUTRAL0} style={styles.label}>Reason for Contact</Body2>
            <TextInput
                style={styles.input}
                value={reason}
                onChangeText={setReason}
                placeholder="Subject of your contact request"
                placeholderTextColor={Colors.PLACEHOLLDER_TEXT}
            />

            {/* ── Description ── */}
            <Body2 color={Colors.NEUTRAL0} style={styles.label}>Description</Body2>
            <TextInput
                style={styles.textArea}
                value={description}
                onChangeText={setDescription}
                placeholder="Please describe your issue or question in detail"
                placeholderTextColor={Colors.PLACEHOLLDER_TEXT}
                multiline
                textAlignVertical="top"
            />

            {/* ----Submit Button---- */}
            <CustomButton
                title="Send message"
                onPress={handleSubmit}
                width="100%"
                height={44}
                borderRadius={100}
            // icon={<DoubleRightArrowIcon />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },

    label: {
        marginBottom: 2,
    },

    // Single-line input
    input: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: '#FFFFFF',
        fontSize: 14,
    },

    // Multi-line textarea
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