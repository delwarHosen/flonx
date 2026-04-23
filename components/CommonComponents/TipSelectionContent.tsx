import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    LayoutAnimation,
    Linking,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';

import { Colors } from '@/constants/theme';
import { useTipToBartenderMutation } from '@/redux/services/orderApi';
import { hp, wp } from '@/utils/responsive';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../CustomButton';
import SectionTitle from '../SectionTitle';
import { showToast } from '../Toast';
import Typography, { Body3, Caption1, H4 } from '../typo/Typography';

interface TipSelectionProps {
    customTipRoute?: string;
    continueRoute: string;
    skipRoute: string;
    orderId: string;
    primaryColor?: string;
    // role: 'guest' | 'customer';
};

const TipSelectionContent: React.FC<TipSelectionProps> = ({
    continueRoute,
    skipRoute,
    orderId,
    primaryColor = Colors.BRAND_PRIMARY_LIGHT
}) => {
    const router = useRouter();
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const inputRef = React.useRef<TextInput>(null);

    const [tipToBartender, { isLoading }] = useTipToBartenderMutation();

    const tipOptions = [5, 10, 15, 20];
    const { width } = useWindowDimensions();
    const dynamicPadding = width * 0.065;

    React.useEffect(() => {
        if (showCustomInput) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [showCustomInput]);


    const handleTopBartender = async () => {
        const finalAmount = showCustomInput ? parseFloat(customAmount) : selectedAmount;

        if (!finalAmount || finalAmount <= 0) {
            showToast("Selection Required, Please select a tip amount or enter a custom one.", "error");
            return;
        }

        try {
            const res = await tipToBartender({
                id: orderId,
                amount: finalAmount
            }).unwrap();

            if (res?.paymentUrl) {
                await Linking.openURL(res.paymentUrl);
            } else {
                throw new Error("Payment link not found");
            }
        } catch (error: any) {
            const msg = error?.data?.message || error?.message || 'Payment failed';

            showToast(msg, "error");
        }
    };


    // console.log("skipRoute:", skipRoute)
    // console.log("continueRoute:", continueRoute)

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ marginVertical: hp(15) }}>
                        <SectionTitle />
                    </View>

                    <View style={[styles.content, { paddingHorizontal: dynamicPadding }]}>
                        <H4 color={Colors.NEUTRAL0} align="center">Tip Your Bartender</H4>
                        <Body3
                            color={Colors.PLACEHOLLDER_TEXT}
                            align="center"
                            style={{ marginTop: hp(10), marginBottom: hp(24) }}
                        >
                            Show Your Appreciation
                        </Body3>

                        {tipOptions.map((amount) => (
                            <TouchableOpacity
                                key={amount}
                                onPress={() => {
                                    if (showCustomInput) {
                                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                        setShowCustomInput(false);
                                        setCustomAmount('');
                                        Keyboard.dismiss();
                                    }
                                    setSelectedAmount(amount);
                                }}
                                style={[
                                    styles.tipOption,
                                    selectedAmount === amount && !showCustomInput && { borderColor: primaryColor, borderWidth: 2 }
                                ]}
                            >
                                <Typography
                                    variant="h5"
                                    weight="bold"
                                    color={selectedAmount === amount && !showCustomInput ? primaryColor : Colors.NEUTRAL0}
                                    align="center"
                                >
                                    ${amount}
                                </Typography>
                            </TouchableOpacity>
                        ))}

                        {showCustomInput && (
                            <View style={styles.inputSection}>
                                <Caption1 color={Colors.NEUTRAL0} style={{ marginBottom: 16 }}>
                                    Enter Tip Amount ($)
                                </Caption1>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        ref={inputRef}
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
                        )}

                        <View style={styles.actionRow}>
                            {!showCustomInput && (
                                <View style={styles.buttonWrapper}>
                                    <CustomButton
                                        title="Custom"
                                        onPress={() => {
                                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                            setShowCustomInput(true);
                                            setSelectedAmount(null);
                                        }}
                                        width="100%"
                                        height={hp(44)}
                                        borderRadius={100}
                                        backgroundColor={Colors.BRAND_PRIMARY}
                                    />
                                </View>
                            )}
                            <View style={styles.buttonWrapper}>
                                <CustomButton
                                    title={isLoading ? "Loading" : "Continue"}
                                    onPress={handleTopBartender}
                                    disabled={isLoading}
                                    width="100%"
                                    height={hp(44)}
                                    borderRadius={100}
                                />
                            </View>
                        </View>

                        <CustomButton
                            title={'Skip & Continue Ordering'}
                            onPress={() => {
                                console.log("Navigating to:", skipRoute);  
                                router.push(skipRoute as any)
                            }}
                            width="100%"
                            height={hp(44)}
                            borderRadius={100}
                            backgroundColor={Colors.NEUTRAL0}
                            color={primaryColor}
                            style={{ marginTop: hp(16), marginBottom: hp(20) }}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
    content: { flex: 1, paddingTop: hp(20) },
    tipOption: {
        width: '100%',
        paddingVertical: hp(10),
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: Colors.INPUT_BACKGROUND,
        marginBottom: hp(16),
        justifyContent: 'center'
    },
    inputSection: { marginBottom: hp(16) },
    inputContainer: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingHorizontal: wp(20),
        height: hp(48),
        justifyContent: 'center',
    },
    textInput: {
        color: Colors.NEUTRAL0,
        fontSize: 14,
        paddingVertical: Platform.OS === 'ios' ? hp(10) : 0,
        height: '100%'
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16
    },
    buttonWrapper: { flex: 1 },
});

export default TipSelectionContent;