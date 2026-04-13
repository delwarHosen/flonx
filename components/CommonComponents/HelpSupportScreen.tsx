// components/Profile/HelpSupportScreen.tsx
import { HelpSupportContent } from '@/components/Profile/HelpSupportContent';
import SectionTitle from '@/components/SectionTitle';
import { Body1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useGetFaqQuery } from '@/redux/services/profile';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpSupportScreen() {
    const { data: faqData, isLoading } = useGetFaqQuery({});

    const displayData = (faqData ?? []).map((item: any) => ({
        id: item._id,
        question: item.question,
        answer: item.answer,
    }));

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={{ paddingTop: '4%' }}>
                <SectionTitle title="Help & Support" />
            </View>
            <View style={{ paddingHorizontal: '5%' }}>
                <Body1 italic color={Colors.NEUTRAL0} style={{ marginVertical: '3.5%' }}>
                    — Frequently Asked Questions
                </Body1>
            </View>

            {isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={Colors.BRAND_PRIMARY} />
                </View>
            ) : (
                <HelpSupportContent data={displayData} />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
});