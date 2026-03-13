import { HelpSupportContent } from '@/components/Profile/HelpSupportContent';
import SectionTitle from '@/components/SectionTitle';
import { Body1 } from '@/components/typo/Typography';
import { FAQ_DATA_STORE } from '@/constants/faqData';
import { Colors } from '@/constants/theme';
import { RootState } from '@/redux/store';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function HelpSupport() {
    // Redux store theke user role neya holo
    const userRole = useSelector((state: RootState) => state.auth.userRole);

    // 
    const displayData = userRole === 'bartender' ? FAQ_DATA_STORE.bartender : FAQ_DATA_STORE.customer;

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={{paddingTop:"4%"}}>
                <SectionTitle title="Help & Support" />
            </View>
            <View style={{ paddingHorizontal: '5%' }}>
                
                <Body1 italic color={Colors.NEUTRAL0} style={{ marginVertical: "3.5%" }}>
                    — Frequently Asked Questions 
                </Body1>
            </View>

            <HelpSupportContent data={displayData} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
});