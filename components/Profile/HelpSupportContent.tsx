import { RightAngleIcon } from '@/assets/images/icons/ProfileInfoIcons/RightAngleIcon';
import { UpAngleIcon } from '@/assets/images/icons/ProfileInfoIcons/UpAngleIcon';
import ContactForm from '@/components/ContactForm';
import { Body2, Caption2 } from '@/components/typo/Typography';
import { FAQItem } from '@/constants/faqData';
import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

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
            <TouchableOpacity style={styles.itemHeader} onPress={onToggle} activeOpacity={0.75}>
                <Body2 color={Colors.NEUTRAL0}>{item.question}</Body2>
                <View style={styles.chevron}>
                    {isOpen ? <UpAngleIcon /> : <RightAngleIcon color='#FFFFFF' />}
                </View>
            </TouchableOpacity>

            <Animated.View style={animatedStyle}>
                <View style={styles.answerInner}>
                    <Caption2 color={Colors.PLACEHOLLDER_TEXT}>
                        {item.answer}
                    </Caption2>
                </View>
            </Animated.View>

            <View style={styles.hiddenMeasure} onLayout={e => {
                const h = e.nativeEvent.layout.height;
                if (h > 0) setContentHeight(h);
            }}>
                <Caption2 color={Colors.NEUTRAL0}>{item.answer}</Caption2>
            </View>
        </View>
    );
};

export const HelpSupportContent = ({ data }: { data: FAQItem[] }) => {
    const [openId, setOpenId] = useState<string | null>(null);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={{ paddingHorizontal: wp(20) }}>
                        <FAQRow item={item} isOpen={openId === item.id} onToggle={() => setOpenId(openId === item.id ? null : item.id)} />
                    </View>
                )}
                ListHeaderComponent={<View style={{ height: 10 }} />}
                ListFooterComponent={
                    <View style={{ paddingHorizontal: wp(20), marginTop: hp(20), paddingBottom: hp(40) }}>
                        <ContactForm />
                    </View>
                }
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, paddingTop: hp(10) }}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
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
        paddingVertical: 16
    },
    chevron: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    answerInner: {
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    hiddenMeasure: {
        position: 'absolute',
        top: 10000,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingBottom: 16,
        opacity: 0
    },
    separator: {
        height: 10
    },
});