// components/Profile/NotificationScreen.tsx
import { LogoIcon } from '@/assets/images/icons/ProfileInfoIcons/LogoIcon';
import { Body3, Body4, Caption1, Caption3 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import {
    NOTIFICATION_QUERY_ARGS,
    useGetNotificationsQuery,
    useSeeAllNotificationsMutation,
    useSeeSingleNotificationMutation,
} from '@/redux/services/notificationApi';
import { hp, wp } from '@/utils/responsive';
import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

interface ApiNotification {
    _id: string;
    title: string;
    message: string;
    isRead: boolean;
    isSeen: boolean;
    createdAt: string;
    type: string;
}

const formatTime = (iso: string): string => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
};

export const NotificationContent = () => {

    const { data, isLoading } = useGetNotificationsQuery(NOTIFICATION_QUERY_ARGS);

    const [seeAll, { isLoading: isMarkingAll }] = useSeeAllNotificationsMutation();
    const [seeSingle] = useSeeSingleNotificationMutation();


    const notifications: ApiNotification[] = data?.result || [];
    const hasUnread = notifications.some((n) => !n.isSeen);

    const handleMarkAll = async () => {
        if (!hasUnread) return;
        try {
            await seeAll().unwrap();
        } catch (_) { }
    };

    const handleSinglePress = async (item: ApiNotification) => {
        if (item.isSeen) return;
        try {
            await seeSingle(item._id).unwrap();
        } catch (_) { }
    };

    const renderItem = ({ item }: { item: ApiNotification }) => {
        const isUnread = !item.isSeen;

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleSinglePress(item)}
                style={[styles.card, isUnread && styles.unreadCard]}
            >
                {isUnread && <View style={styles.unreadDot} />}

                <View style={styles.iconContainer}>
                    <LogoIcon />
                </View>

                <View style={styles.textContainer}>
                    <Body3
                        italic
                        color={Colors.NEUTRAL0}
                        style={{ marginBottom: hp(4) }}
                    >
                        {item.message}
                    </Body3>
                    <Caption3 color={Colors.PLACEHOLLDER_TEXT}>
                        {formatTime(item.createdAt)}
                    </Caption3>
                </View>
            </TouchableOpacity>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color={Colors.BRAND_PRIMARY} />
            </View>
        );
    }

    return (
        <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listPadding}
            ListHeaderComponent={
                notifications.length > 0 ? (
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={handleMarkAll}
                            disabled={!hasUnread || isMarkingAll}
                            style={[
                                styles.markAllBtn,
                                (!hasUnread || isMarkingAll) && styles.markAllDisabled,
                            ]}
                        >
                            {isMarkingAll ? (
                                <ActivityIndicator
                                    size="small"
                                    color={Colors.BRAND_PRIMARY}
                                />
                            ) : (
                                <Caption1
                                    color={
                                        hasUnread
                                            ? Colors.BRAND_PRIMARY
                                            : Colors.PLACEHOLLDER_TEXT
                                    }
                                >
                                    Mark all as read
                                </Caption1>
                            )}
                        </TouchableOpacity>
                    </View>
                ) : null
            }
            ListEmptyComponent={
                <View style={styles.center}>
                    <Body4 color={Colors.PLACEHOLLDER_TEXT}>
                        No notifications yet
                    </Body4>
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    listPadding: {
        paddingHorizontal: wp(20),
        paddingBottom: hp(30),
    },
    header: {
        alignItems: 'flex-end',
        paddingVertical: hp(12),
    },
    markAllBtn: {
        paddingHorizontal: wp(12),
        paddingVertical: hp(6),
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.BRAND_PRIMARY,
    },
    markAllDisabled: {
        borderColor: Colors.BORDER_COLOR,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        marginBottom: hp(12),
        borderRadius: 12,
        padding: 12,
        backgroundColor: 'transparent',
    },
    unreadCard: {
        borderColor: Colors.BRAND_PRIMARY,
        backgroundColor: `${Colors.BRAND_PRIMARY}12`,
    },
    unreadDot: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.BRAND_PRIMARY,
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
    textContainer: { flex: 1 },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp(40),
    },
});