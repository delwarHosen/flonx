import { Colors } from '@/constants/theme';
import { fp, hp, wp } from '@/utils/responsive';
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
            <Body1 italic color={Colors.NEUTRAL0} style={{ marginVertical: hp(16) }}>—Contact us</Body1>
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
                height={hp(44)}
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
        paddingHorizontal: hp(16),
        paddingVertical: wp(14),
        color: '#FFFFFF',
        fontSize: fp(14),
    },

    // Multi-line textarea
    textArea: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingHorizontal: wp(16),
        paddingTop: hp(14),
        paddingBottom: hp(14),
        color: '#FFFFFF',
        fontSize: fp(14),
        minHeight: 150,
    },
});