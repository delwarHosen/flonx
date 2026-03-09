import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../CustomButton';
import SectionTitle from '../SectionTitle';
import Typography, { Body3, Caption1, H4 } from '../typo/Typography';

const CustomTipSelectedPage = () => {
    const router = useRouter();
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');

    const tipOptions = [5, 10, 15, 20];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            {/* KeyboardAvoidingView use kora hoyeche jate input field cover na hoy */}
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1 }} 
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Back Button / Header */}
                    <View style={styles.header}>
                        <SectionTitle />
                    </View>

                    <View style={styles.content}>
                        {/* Title Section */}
                        <H4 color={Colors.NEUTRAL0} align="center">Tip Your Bartender</H4>
                        <Body3 color={Colors.PLACEHOLLDER_TEXT} align="center" style={{ marginTop: 10, marginBottom: 24 }}>
                            Show Your Appreciation
                        </Body3>

                        {/* Tip Selection List */}
                        {tipOptions.map((amount) => (
                            <TouchableOpacity
                                key={amount}
                                onPress={() => {
                                    setSelectedAmount(amount);
                                    setCustomAmount('');
                                }}
                                style={[
                                    styles.tipOption,
                                    selectedAmount === amount && styles.selectedTipOption
                                ]}
                            >
                                <Typography
                                    variant="h5"
                                    weight="bold"
                                    color={Colors.BRAND_PRIMARY_LIGHT}
                                    align="center"
                                >
                                    ${amount}
                                </Typography>
                            </TouchableOpacity>
                        ))}

                        {/* Input Field Section */}
                        <View style={styles.inputSection}>
                            <Caption1 color={Colors.NEUTRAL0} style={{ marginBottom: 16, marginTop: 0 }}>
                                Enter Tip Amount *
                            </Caption1>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Enter Your Amount"
                                    placeholderTextColor={Colors.PLACEHOLLDER_TEXT}
                                    style={styles.textInput}
                                    keyboardType="numeric"
                                    value={customAmount}
                                    onChangeText={(val) => {
                                        setCustomAmount(val);
                                        setSelectedAmount(null);
                                    }}
                                />
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View style={styles.actionRow}>
                            <View style={styles.buttonWrapper}>
                                <CustomButton
                                    title="Continue"
                                    onPress={() => router.push('/guest/payment-type')}
                                    width="100%"
                                    height={44}
                                    borderRadius={100}
                                />
                            </View>
                        </View>

                        {/* Skip & Continue Ordering Button */}
                        <View style={{ marginTop: 10, marginBottom: 20 }}>
                            <CustomButton
                                title="Skip & Continue Ordering"
                                 onPress={() => router.push('/guest/(tabs)/search')}
                                width="100%"
                                height={44}
                                borderRadius={100}
                                backgroundColor={Colors.NEUTRAL0}
                                color={Colors.BRAND_PRIMARY_LIGHT}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    header: {
        paddingTop: 20,
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 20,
    },
    tipOption: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: Colors.INPUT_BACKGROUND,
        marginBottom: 16,
    },
    selectedTipOption: {
        borderColor: Colors.BRAND_PRIMARY_LIGHT,
        borderWidth: 1,
    },
    inputSection: {
        marginBottom: 16,
    },
    inputContainer: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingHorizontal: 20,
        height: 48,
        justifyContent: 'center',
    },
    textInput: {
        color: Colors.NEUTRAL0,
        fontSize: 14,
        fontFamily: 'system-ui',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    buttonWrapper: {
        flex: 1,
    },
});

export default CustomTipSelectedPage;