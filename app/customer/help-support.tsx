import { RightAngleIcon } from '@/assets/images/icons/ProfileInfoIcons/RightAngleIcon';
import { UpAngleIcon } from '@/assets/images/icons/ProfileInfoIcons/UpAngleIcon';
import ContactForm from '@/components/ContactForm';
import SectionTitle from '@/components/SectionTitle';
import { Body1, Body2, Caption2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import React, { useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        id: '1',
        question: 'Do I need an account to place an order?',
        answer: "No. You can place an order as a guest by scanning a bar's QR code.",
    },
    {
        id: '2',
        question: 'How do tips work?',
        answer: 'Tips are added at checkout. You can choose a percentage or enter a custom amount.',
    },
    {
        id: '3',
        question: 'Can I cancel my order?',
        answer: 'Orders can be cancelled within 2 minutes of placing them, before the bar confirms.',
    },
    {
        id: '4',
        question: 'How do I get a refund?',
        answer: 'Refunds are processed automatically to your original payment method within 5–7 business days.',
    },
];

// ─── Single Accordion Item ────────────────────────────────────────────────────
interface FAQRowProps {
    item: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
}

const FAQRow: React.FC<FAQRowProps> = ({ item, isOpen, onToggle }) => {
    const [contentHeight, setContentHeight] = useState(0);
    const animatedHeight = useSharedValue(0);
    const animatedOpacity = useSharedValue(0);

    React.useEffect(() => {
        animatedHeight.value = withTiming(isOpen ? contentHeight : 0, { duration: 250 });
        animatedOpacity.value = withTiming(isOpen ? 1 : 0, { duration: 200 });
    }, [isOpen, contentHeight]);

    const animatedStyle = useAnimatedStyle(() => ({
        height: animatedHeight.value,
        opacity: animatedOpacity.value,
        overflow: 'hidden',
    }));

    return (
        <View style={styles.itemCard}>
            <TouchableOpacity
                style={styles.itemHeader}
                onPress={onToggle}
                activeOpacity={0.75}
            >
                <Body2 color={Colors.NEUTRAL0}>{item.question}</Body2>
                <View style={styles.chevron}>
                    {isOpen ? <UpAngleIcon /> : <RightAngleIcon color='#FFFFFF' />}
                </View>
            </TouchableOpacity>

            <Animated.View style={animatedStyle}>
                <View style={styles.answerInner}>
                    <Caption2 style={{ fontWeight: '400' }} color={Colors.PLACEHOLLDER_TEXT}>
                        {item.answer}
                    </Caption2>
                </View>
            </Animated.View>

            {/* Invisible measure view */}
            <View
                style={styles.hiddenMeasure}
                onLayout={e => {
                    const h = e.nativeEvent.layout.height;
                    if (h > 0) setContentHeight(h);
                }}
            >
                <Caption2 style={{ fontWeight: '400' }} color={Colors.NEUTRAL0}>
                    {item.answer}
                </Caption2>
            </View>
        </View>
    );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function HelpSupport() {
    const [openId, setOpenId] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        setOpenId(prev => (prev === id ? null : id));
    };

    const renderItem = ({ item }: { item: FAQItem }) => (
        <View style={{ paddingHorizontal: '5%' }}>
            <FAQRow
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <FlatList
                    data={FAQ_DATA}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    
                    // Header Section
                    ListHeaderComponent={
                        <View style={{ paddingHorizontal: '5%' }}>
                            <SectionTitle title="Help & Support" />
                            <Body1 italic color={Colors.NEUTRAL0} style={{ marginVertical: 16 }}>
                                — Frequently Asked Questions
                            </Body1>
                        </View>
                    }

                    // Footer Section (Contact Form)
                    ListFooterComponent={
                        <View style={{ paddingHorizontal: '5%', marginTop: 20, paddingBottom: 40 }}>
                            <ContactForm />
                        </View>
                    }

                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    style={styles.list}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    list: {
        flex: 1,
    },
    listContent: {
        flexGrow: 1,
        paddingTop: 10,
    },
    itemCard: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        overflow: 'hidden',
        paddingVertical: 10
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    chevron: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    answerInner: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    hiddenMeasure: {
        position: 'absolute',
        top: 10000,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: 16,
        opacity: 0,
    },
    separator: {
        height: 10,
    },
});