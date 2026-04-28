import { useStripe } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    LayoutAnimation,
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
import {
    SavedCard,
    useLazyGetSavedCardsQuery,
    useSaveCardMutation,
    useTipToBartenderMutation
} from '@/redux/services/orderApi';
import { hp, wp } from '@/utils/responsive';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../CustomButton';
import SaveCardPermissionModal from '../SaveCardPermissionModal';
import SavedCardsModal from '../Savedcardsmodal';
import SectionTitle from '../SectionTitle';
import { showToast } from '../Toast';
import Typography, { Body3, Caption1, H4 } from '../typo/Typography';

interface TipSelectionProps {
    customTipRoute?: string;
    continueRoute: string;
    skipRoute: string;
    orderId: string;
    primaryColor?: string;
};

const TipSelectionContent: React.FC<TipSelectionProps> = ({
    continueRoute,
    skipRoute,
    orderId,
    primaryColor = Colors.BRAND_PRIMARY_LIGHT
}) => {
    const router = useRouter();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const inputRef = React.useRef<TextInput>(null);

    // ── Saved Cards State ──
    const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
    const [showCardsModal, setShowCardsModal] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
    const [isFetchingCards, setIsFetchingCards] = useState(false);
    const [isSavedCardPaying, setIsSavedCardPaying] = useState(false);

    // ── Save Card Permission State ──
    const [showSaveCardModal, setShowSaveCardModal] = useState(false);
    const [pendingSuccessData, setPendingSuccessData] = useState<any>(null);
    const [newCardInfo, setNewCardInfo] = useState<{ last4: string; brand: string } | null>(null);

    const [tipToBartender, { isLoading }] = useTipToBartenderMutation();
    const [saveCard] = useSaveCardMutation();
    const [triggerGetSavedCards] = useLazyGetSavedCardsQuery();

    const tipOptions = [5, 10, 15, 20];
    const { width } = useWindowDimensions();
    const dynamicPadding = width * 0.065;

    const getFinalAmount = () => {
        return showCustomInput ? parseFloat(customAmount) : selectedAmount;
    };

    React.useEffect(() => {
        if (showCustomInput) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [showCustomInput]);

    // ── Main payment button handler ──
    const handleTopBartender = async () => {
        const finalAmount = getFinalAmount();

        if (!finalAmount || finalAmount <= 0) {
            showToast("Selection Required, Please select a tip amount or enter a custom one.", "error");
            return;
        }

        try {
            setIsFetchingCards(true);
            const result = await triggerGetSavedCards().unwrap();
            console.log('💳 Saved Cards Response:', JSON.stringify(result, null, 2));
            const cards = result?.data || [];
            setSavedCards(cards);

            if (cards.length > 0) {
                setSelectedCardId(cards[0].id);
                setShowCardsModal(true);
            } else {
                await payWithNewCard(finalAmount);
            }
        } catch (error: any) {
            console.log('💳 getSavedCards error:', JSON.stringify(error, null, 2));
            await payWithNewCard(finalAmount);
        } finally {
            setIsFetchingCards(false);
        }
    };

    // ── Pay with NEW card (Stripe sheet) ──
    const payWithNewCard = async (amount?: number) => {
        const finalAmount = amount ?? getFinalAmount();
        setShowCardsModal(false);
        try {
            const data = await tipToBartender({ id: orderId, amount: finalAmount! }).unwrap();
            console.log('📦 tipToBartender (new card) response:', JSON.stringify(data, null, 2));

            const { error: initError } = await initPaymentSheet({
                paymentIntentClientSecret: data.clientSecret,
                merchantDisplayName: 'Flonx',
            });

            if (initError) {
                showToast(initError.message);
                return;
            }

            const { error: paymentError } = await presentPaymentSheet();

            if (paymentError) {
                if (paymentError.code !== 'Canceled') showToast(paymentError.message);
                return;
            }

            setPendingSuccessData(data);
            setNewCardInfo({
                last4: data.last4 || '',
                brand: data.brand || '',
            });
            setShowSaveCardModal(true);

        } catch (error: any) {
            showToast(error?.data?.message || error?.message || 'Payment failed!');
        }
    };

    // ── Pay with SAVED card ──
    const payWithSavedCard = async () => {
        if (!selectedCardId) return;
        const finalAmount = getFinalAmount();
        console.log('💰 Paying with savedCard ID:', selectedCardId);
        setIsSavedCardPaying(true);
        try {
            const data = await tipToBartender({ id: orderId, amount: finalAmount!, paymentMethodId: selectedCardId } as any).unwrap();
            console.log('✅ tipToBartender (saved card) response:', JSON.stringify(data, null, 2));
            setShowCardsModal(false);
            await onPaymentSuccess();
        } catch (error: any) {
            console.log('❌ payWithSavedCard error:', JSON.stringify(error, null, 2));
            setShowCardsModal(false);
            showToast(error?.data?.message || error?.message || 'Payment failed!');
        } finally {
            setIsSavedCardPaying(false);
        }
    };

    // ── Save card - Yes ──
    const handleSaveCard = async () => {
        setShowSaveCardModal(false);
        await onPaymentSuccess();
    };

    // ── Save card - No ──
    const handleSkipSaveCard = async () => {
        setShowSaveCardModal(false);
        try {
            await saveCard({
                paymentIntentId: pendingSuccessData?.paymentIntentId,
            }).unwrap();
        } catch (err) {
            console.log('removeCard error:', JSON.stringify(err, null, 2));
        }
        await onPaymentSuccess();
    };

    // ── Common success handler ──
    const onPaymentSuccess = async () => {
        showToast('Payment successful!');
        router.push(continueRoute as any);
    };

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
                                    title={isLoading || isFetchingCards ? "Loading" : "Continue"}
                                    onPress={handleTopBartender}
                                    disabled={isLoading || isFetchingCards}
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
                                router.push(skipRoute as any);
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

            <SaveCardPermissionModal
                visible={showSaveCardModal}
                last4={newCardInfo?.last4 || ''}
                brand={newCardInfo?.brand || ''}
                onSave={handleSaveCard}
                onSkip={handleSkipSaveCard}
            />

            <SavedCardsModal
                visible={showCardsModal}
                paymentMethods={savedCards}
                selectedCardId={selectedCardId}
                onSelectCard={setSelectedCardId}
                onPayWithSelected={payWithSavedCard}
                onPayWithNewCard={payWithNewCard}
                onClose={() => setShowCardsModal(false)}
                isLoading={isSavedCardPaying}
                totalAmount={getFinalAmount() || 0}
            />
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