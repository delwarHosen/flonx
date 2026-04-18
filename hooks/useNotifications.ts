// hooks/useNotifications.ts
import { NOTIFICATION_QUERY_ARGS, useGetNotificationsQuery } from '@/redux/services/notificationApi';

export const useNotifications = () => {
    const { data, isLoading } = useGetNotificationsQuery(NOTIFICATION_QUERY_ARGS);

    const notifications = data?.result || [];
    const unreadCount = data?.meta?.unreadCount ?? 0;

    return { notifications, unreadCount, isLoading };
};