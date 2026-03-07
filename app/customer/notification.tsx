import { LogoIcon } from '@/assets/images/icons/ProfileInfoIcons/LogoIcon'
import SectionTitle from '@/components/SectionTitle'
import { Body3, Caption3 } from '@/components/typo/Typography'
import { Colors } from '@/constants/theme'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


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
        message: 'An item in your order is unavailable.',
        date: '16 March 2026',
    },
    
];

export default function NotificationScreen() {

   
    const renderItem = ({ item }: { item: typeof NOTIFICATIONS[0] }) => (
        <View style={styles.leftSection}>
            <View style={styles.iconContainer}>
                <LogoIcon />
            </View>

            <View style={styles.textContainer}>
                <Body3 italic color={Colors.NEUTRAL0} style={{ marginBottom: 6 }}>
                    {item.message}
                </Body3>
                <Caption3 color={Colors.PLACEHOLLDER_TEXT}>
                    {item.date}
                </Caption3>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.APP_BACKGROUND }}>
            <View>
                <SectionTitle title='Notification' />
            </View>

           
            <FlatList
                data={NOTIFICATIONS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.mainContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: Colors.BRAND_PRIMARY,
        marginBottom: 16,
        borderRadius: 10,
        padding: 10
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        backgroundColor: Colors.INPUT_BACKGROUND,
    },
    textContainer: {
        flex: 1, 
        flexDirection: 'column',
    },
})