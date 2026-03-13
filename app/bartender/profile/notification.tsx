import { NotificationContent } from '@/components/Profile/NotificationScreen';
import SectionTitle from '@/components/SectionTitle';
import { NOTIFICATION_STORE } from '@/constants/notificationData';
import { Colors } from '@/constants/theme';
import { RootState } from '@/redux/store';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function NotificationScreen() {
    // Redux theke user role fetch kora
    const userRole = useSelector((state: RootState) => state.auth.userRole);

    // Role onujayi data select kora
    const displayData = userRole === 'bartender' 
        ? NOTIFICATION_STORE.bartender 
        : NOTIFICATION_STORE.customer;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.APP_BACKGROUND }}>
            <View style={{ paddingTop: '4%' }}>
                <SectionTitle title='Notification' />
            </View>

            {/* Reusable list component */}
            <NotificationContent data={displayData} />
        </SafeAreaView>
    );
}