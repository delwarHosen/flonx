// redux/services/notificationApi.ts
import { baseApis } from "../base";

interface NotificationParams {
    page?: number;
    limit?: number;
}

export const NOTIFICATION_QUERY_ARGS: NotificationParams = { page: 1, limit: 50 };

export const notificationApi = baseApis.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<any, NotificationParams | void>({
            query: (params) => ({
                url: "/notification/get-notifications",
                method: "GET",
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 50,
                },
            }),
            transformResponse: (response: any) => response.data,
            providesTags: ["Notification"],
        }),

        seeAllNotifications: builder.mutation<void, void>({
            query: () => ({
                url: "/notification/see-notifications",
                method: "PATCH",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const patch = dispatch(
                    notificationApi.util.updateQueryData(
                        "getNotifications",
                        NOTIFICATION_QUERY_ARGS,
                        (draft) => {
                            // result এর isSeen update
                            draft.result.forEach((n: any) => {
                                n.isSeen = true;
                            });
                            // meta unreadCount reset
                            if (draft.meta) {
                                draft.meta.unreadCount = 0;
                            }
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    // patch.undo();
                }
            },
        }),

        seeSingleNotification: builder.mutation<void, string>({
            query: (id) => ({
                url: `/notification/see-single/${id}`,
                method: "PATCH",
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patch = dispatch(
                    notificationApi.util.updateQueryData(
                        "getNotifications",
                        NOTIFICATION_QUERY_ARGS,
                        (draft) => {
                            const target = draft.result.find((n: any) => n._id === id);
                            if (target && !target.isSeen) {
                                target.isSeen = true;
                                // meta unreadCount 1 কমাও
                                if (draft.meta && draft.meta.unreadCount > 0) {
                                    draft.meta.unreadCount -= 1;
                                }
                            }
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patch.undo();
                }
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetNotificationsQuery,
    useSeeAllNotificationsMutation,
    useSeeSingleNotificationMutation,
} = notificationApi;