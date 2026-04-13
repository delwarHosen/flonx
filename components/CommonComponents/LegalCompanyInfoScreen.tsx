// components/Profile/LegalCompanyInfoScreen.tsx
import { LegalInfoContent } from '@/components/Profile/LegalInfoContent';
import { Colors } from '@/constants/theme';
import { useGetLegalInfoQuery } from '@/redux/services/profile';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LegalCompanyInfoScreen() {
    const { data: legalData, isLoading } = useGetLegalInfoQuery({});

    const infoItems = legalData ? [
        { topLabel: 'Company Name', bottomLabel: legalData.companyName ?? '-' },
        { topLabel: 'Business Type', bottomLabel: legalData.businessType ?? '-' },
        { topLabel: 'Registered Address', bottomLabel: legalData.registeredAddress ?? '-' },
        { topLabel: 'Jurisdiction', bottomLabel: legalData.jurisdiction ?? '-' },
        { topLabel: 'Contact Email', bottomLabel: legalData.contactEmail ?? '-' },
        { topLabel: 'Contact Phone', bottomLabel: legalData.contactPhone ?? '-' },
        { topLabel: 'Official Website', bottomLabel: legalData.officialWebsite ?? '-' },
    ] : [];

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.BRAND_PRIMARY} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <LegalInfoContent data={infoItems} />
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
        backgroundColor: Colors.APP_BACKGROUND,
    },
});