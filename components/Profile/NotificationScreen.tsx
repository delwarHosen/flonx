import { LogoIcon } from '@/assets/images/icons/ProfileInfoIcons/LogoIcon';
import SectionTitle from '@/components/SectionTitle';
import { Body3, Caption3 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

const NOTIFICATIONS = [
    {
        id: '1',
        message: 'Your order is ready for pickup.',
        date: '16 March 2026',
    },
    {
        id: '2',
        message: 'An item in your order is unavailable.',
        date: '16 March 2026',
    },
    {
        id: '3',
        message: 'Your profile has been updated.',
        date: '16 March 2026',
    },
];

export default function NotificationScreen() {

    const renderItem = ({ item }: { item: typeof NOTIFICATIONS[0] }) => (
        // এখানে leftSection এর বদলে notificationCard নাম দিলাম এবং ডিজাইন ক্লিন করলাম
        <View style={styles.notificationCard}>
            <View style={styles.iconContainer}>
                <LogoIcon size={24} />
            </View>

            <View style={styles.textContainer}>
                <Body3 italic color={Colors.NEUTRAL0} style={{ marginBottom: 4 }}>
                    {item.message}
                </Body3>
                <Caption3 color={Colors.PLACEHOLLDER_TEXT}>
                    {item.date}
                </Caption3>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header Section */}
            <View style={styles.header}>
                <SectionTitle title='Notification' />
            </View>

            {/* FlatList Section */}
            <FlatList
                data={NOTIFICATIONS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                // যদি ডাটা না থাকে তবে এই মেসেজটি দেখাবে
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Body3 color={Colors.PLACEHOLLDER_TEXT}>No new notifications</Body3>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: Colors.APP_BACKGROUND 
    },
    header: {
        marginBottom: 10,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40, // নিচ থেকে একটু জায়গা রাখা হয়েছে
    },
    notificationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        marginBottom: 16,
        borderRadius: 12,
        padding: 12,
        backgroundColor: Colors.INPUT_BACKGROUND,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    emptyContainer: {
        height: height * 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    }
})