import { NotificationIcon } from '@/assets/images/icons/ProfileInfoIcons/NotificationIcon';
import { Colors } from '@/constants/theme';
import { useNotifications } from '@/hooks/useNotifications';
import { fp, hp, wp } from '@/utils/responsive';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NotificationBellProps {
    notificationPath: string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notificationPath }) => {
    const router = useRouter();
    const { unreadCount } = useNotifications();

    return (
        <TouchableOpacity
            onPress={() => router.push(notificationPath as any)}
            style={styles.btn}
        >
            <NotificationIcon size={24} />
            {unreadCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default NotificationBell;

const styles = StyleSheet.create({
    btn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        position: 'absolute',
        top: 6,
        right: 6,
        minWidth: hp(16),
        height: hp(16),
        borderRadius: hp(8),
        backgroundColor: Colors.BRAND_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(3),
    },
    badgeText: {
        color: '#FFF',
        fontSize: fp(9),
        fontWeight: '700',
        lineHeight: fp(12),
    },
});