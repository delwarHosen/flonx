import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Body1, Body2, Body4, Caption1, Caption3, H5, H6 } from './typo/Typography';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// ── Card brand icons (SVG-based Text fallback, replace with real SVG if needed) ──
const BRAND_COLORS: Record<string, string> = {
    visa: '#822CE7',
    mastercard: '#EB001B',
    amex: '#007BC1',
    discover: '#FF6600',
    default: '#6B7280',
};

const BRAND_LABELS: Record<string, string> = {
    visa: 'VISA',
    mastercard: 'MasterCard',
    amex: 'AMEX',
    discover: 'Discover',
};

interface PaymentMethod {
    id: string;
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
    type: string;
}

interface SavedCardsModalProps {
    visible: boolean;
    paymentMethods: PaymentMethod[];
    selectedCardId: string | null;
    onSelectCard: (id: string) => void;
    onPayWithSelected: () => void;
    onPayWithNewCard: () => void;
    onClose: () => void;
    isLoading?: boolean;
    totalAmount: number;
}

const CardBrandBadge = ({ brand }: { brand: string }) => {
    const color = BRAND_COLORS[brand.toLowerCase()] || BRAND_COLORS.default;
    const label = BRAND_LABELS[brand.toLowerCase()] || brand.toUpperCase();
    return (
        <View style={[styles.brandBadge, { backgroundColor: color + '22', borderColor: color + '55' }]}>
            <Body4 color={color} style={{ fontWeight: '700', letterSpacing: 0.5 }}>
                {label}
            </Body4>
        </View>
    );
};

const SavedCardsModal: React.FC<SavedCardsModalProps> = ({
    visible,
    paymentMethods,
    selectedCardId,
    onSelectCard,
    onPayWithSelected,
    onPayWithNewCard,
    onClose,
    isLoading,
    totalAmount,
}) => {
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 280,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    damping: 20,
                    stiffness: 180,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: SCREEN_HEIGHT,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const renderCard = ({ item }: { item: PaymentMethod }) => {
        const isSelected = selectedCardId === item.id;
        return (
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => onSelectCard(item.id)}
                style={[styles.cardItem, isSelected && styles.cardItemSelected]}
            >
                {/* Radio */}
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                    {isSelected && <View style={styles.radioDot} />}
                </View>

                {/* Brand Badge */}
                <CardBrandBadge brand={item.brand} />

                {/* Card Number */}
                <View style={styles.cardNumberRow}>
                    <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.maskedDigits}>
                        {'**** **** **** '}
                    </Caption1>
                    <H6 color={Colors.NEUTRAL0} style={styles.last4}>
                        {item.last4}
                    </H6>
                </View>

                {/* Expiry */}
                <Caption3 color={Colors.PLACEHOLLDER_TEXT} style={styles.expiry}>
                    {String(item.expMonth).padStart(2, '0')}/{item.expYear}
                </Caption3>
            </TouchableOpacity>
        );
    };

    return (
        <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
            {/* Backdrop */}
            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
            </TouchableWithoutFeedback>

            {/* Sheet */}
            <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
                {/* Handle */}
                <View style={styles.handle} />

                {/* Header */}
                <View style={styles.sheetHeader}>
                    <View>
                        <H5 color={Colors.NEUTRAL0}>Previously Used Cards</H5>
                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={{ marginTop: 2 }}>
                           Choose a card to continue payment
                        </Caption1>
                    </View>
                    <View style={styles.amountBadge}>
                        <Caption3 color={Colors.NEUTRAL0} style={{ fontWeight: '600' }}>
                            Total
                        </Caption3>
                        <Body2 color={Colors.NEUTRAL0} style={{ fontWeight: '700' }}>
                            ${totalAmount.toFixed(2)}
                        </Body2>
                    </View>
                </View>

                {/* Card List */}
                <FlatList
                    data={paymentMethods}
                    keyExtractor={(item) => item.id}
                    renderItem={renderCard}
                    style={styles.cardList}
                    contentContainerStyle={{ paddingBottom: hp(8) }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={paymentMethods.length > 3}
                />

                {/* Divider */}
                <View style={styles.dividerRow}>
                    <View style={styles.dividerLine} />
                    <Caption3 color={Colors.PLACEHOLLDER_TEXT} style={styles.dividerText}>or</Caption3>
                    <View style={styles.dividerLine} />
                </View>

                {/* New Card Button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onPayWithNewCard}
                    style={styles.newCardBtn}
                >
                    <View style={styles.newCardIcon}>
                        <Body1 color={Colors.BRAND_PRIMARY} style={{ fontSize: 18 }}>＋</Body1>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Body2 color={Colors.NEUTRAL0} style={{ fontWeight: '600' }}>
                            Pay with New Card
                        </Body2>
                        <Caption3 color={Colors.PLACEHOLLDER_TEXT}>
                            Add & save a new payment method
                        </Caption3>
                    </View>
                    <Caption1 color={Colors.PLACEHOLLDER_TEXT}>›</Caption1>
                </TouchableOpacity>

                {/* Pay Button */}
                {selectedCardId && (
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={onPayWithSelected}
                        disabled={isLoading}
                        style={[styles.payBtn, isLoading && { opacity: 0.7 }]}
                    >
                        <Body1
                            color={Colors.BRAND_PRIMARY}
                            style={{ fontWeight: '700', letterSpacing: 0.3 }}
                        >
                            {isLoading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
                        </Body1>
                    </TouchableOpacity>
                )}

                <View style={{ height: hp(24) }} />
            </Animated.View>
        </Modal>
    );
};

export default SavedCardsModal;

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.65)',
    },
    sheet: {
        position: 'absolute',
        bottom: hp(30),
        left: 0,
        right: 0,
        backgroundColor: '#1A1530',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: wp(20),
        paddingTop: hp(12),
        maxHeight: SCREEN_HEIGHT * 0.82,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 20,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#3A3058',
        alignSelf: 'center',
        marginBottom: hp(18),
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: hp(20),
    },
    amountBadge: {
        backgroundColor: Colors.BRAND_PRIMARY + '18',
        borderWidth: 1,
        borderColor: Colors.BRAND_PRIMARY + '40',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 6,
        alignItems: 'center',
    },
    cardList: {
        maxHeight: SCREEN_HEIGHT * 0.38,
    },
    cardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#241E3A',
        borderRadius: 16,
        paddingHorizontal: wp(14),
        paddingVertical: hp(14),
        marginBottom: hp(10),
        borderWidth: 1.5,
        borderColor: '#2A2448',
        gap: 10,
    },
    cardItemSelected: {
        borderColor: Colors.BRAND_PRIMARY,
        backgroundColor: Colors.BRAND_PRIMARY + '12',
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3A3058',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        borderColor: Colors.BRAND_PRIMARY,
    },
    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.BRAND_PRIMARY,
    },
    brandBadge: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 3,
        minWidth: 52,
        alignItems: 'center',
    },
    cardNumberRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    maskedDigits: {
        letterSpacing: 1,
        fontSize: 13,
    },
    last4: {
        fontWeight: '700',
        fontSize: 15,
    },
    expiry: {
        minWidth: 46,
        textAlign: 'right',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(16),
        gap: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#2A2448',
    },
    dividerText: {
        paddingHorizontal: 4,
    },
    newCardBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#241E3A',
        borderRadius: 16,
        paddingHorizontal: wp(14),
        paddingVertical: hp(14),
        borderWidth: 1.5,
        borderColor: '#2A2448',
        borderStyle: 'dashed',
        gap: 12,
        marginBottom: hp(16),
    },
    newCardIcon: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: Colors.BRAND_PRIMARY + '20',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.BRAND_PRIMARY + '40',
    },
    payBtn: {
        backgroundColor: Colors.NEUTRAL0,
        borderRadius: 100,
        paddingVertical: hp(15),
        alignItems: 'center',
        justifyContent: 'center',
    },
});