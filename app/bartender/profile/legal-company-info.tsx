import { LegalInfoContent } from '@/components/Profile/LegalInfoContent';
import { COMPANY_INFO } from '@/constants/legalData';
import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LegalCompanyInfo() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            {/* Reusable component calling with common data */}
            <LegalInfoContent data={COMPANY_INFO} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1, 
        backgroundColor: Colors.APP_BACKGROUND
    }
});