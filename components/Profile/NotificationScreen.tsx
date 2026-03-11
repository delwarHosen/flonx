import { LogoIcon } from '@/assets/images/icons/ProfileInfoIcons/LogoIcon';
import { Body3, Caption3 } from '@/components/typo/Typography';
import { NotificationItem } from '@/constants/notificationData';
import { Colors } from '@/constants/theme';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export const NotificationContent = ({ data }: { data: NotificationItem[] }) => {
    const renderItem = ({ item }: { item: NotificationItem }) => (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <LogoIcon />
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
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listPadding}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    listPadding: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: Colors.BRAND_PRIMARY,
        marginBottom: 16,
        borderRadius: 12,
        padding: 12,
        backgroundColor: 'transparent',
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
    },
});