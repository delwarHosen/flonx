import SectionTitle from '@/components/SectionTitle';
import { Body1, Caption1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useGetTermsConditionsQuery } from '@/redux/services/profile';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsConditionScreen() {
    const { data, isLoading } = useGetTermsConditionsQuery(undefined);
    const { width } = useWindowDimensions();

    const htmlContent = data?.description || '<p>No terms available.</p>';

    const formattedDate = data?.createdAt
        ? new Date(data.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        : '';

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={{ paddingTop: "4%" }}>
                <SectionTitle title='Terms & Condition' />
            </View>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Colors.BRAND_PRIMARY} />
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    <View style={styles.textContainer}>

                        {/* ── Static header ── */}
                        <Body1 color={Colors.NEUTRAL0} style={styles.textContent}>
                            Terms & Conditions
                        </Body1>
                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.textContent}>
                            Last Updated: {formattedDate}
                        </Caption1>

                        {/* ── HTML content from API ── */}
                        <RenderHtml
                            contentWidth={width}
                            source={{ html: htmlContent }}
                            tagsStyles={{
                                p: { color: Colors.PLACEHOLLDER_TEXT, fontSize: 13, lineHeight: 20, marginBottom: 12 },
                                h1: { color: Colors.NEUTRAL0, fontSize: 18, marginBottom: 10 },
                                h2: { color: Colors.NEUTRAL0, fontSize: 16, marginBottom: 8 },
                                h3: { color: Colors.NEUTRAL0, fontSize: 14, marginBottom: 6 },
                                li: { color: Colors.PLACEHOLLDER_TEXT, fontSize: 13, lineHeight: 20 },
                                strong: { color: Colors.NEUTRAL0 },
                                body: { color: Colors.PLACEHOLLDER_TEXT },
                            }}
                        />
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    textContainer: {
        paddingHorizontal: "5%",
        marginTop: 16,
    },
    textContent: {
        marginBottom: 12,
        lineHeight: 20,
    },
});