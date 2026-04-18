// app/customer/notification এবং app/bartender/profile/notification
import { NotificationContent } from '@/components/Profile/NotificationScreen';
import SectionTitle from '@/components/SectionTitle';
import { Colors } from '@/constants/theme';
// import { NOTIFICATION_QUERY_ARGS, useGetNotificationsQuery } from '@/redux/services/notificationApi';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationScreen() {
    // const { refetch } = useGetNotificationsQuery(NOTIFICATION_QUERY_ARGS);

    // useEffect(() => {
    //     refetch();
    // }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.APP_BACKGROUND }}>
            <View style={{ paddingTop: '4%' }}>
                <SectionTitle title="Notification" />
            </View>
            <NotificationContent />
        </SafeAreaView>
    );
}