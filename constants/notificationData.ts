export interface NotificationItem {
    id: string;
    message: string;
    date: string;
}

export const NOTIFICATION_STORE = {
    customer: [
        { id: '1', message: 'Your order is ready for pickup.', date: '16 March 2026' },
        { id: '2', message: 'An item in your order is unavailable.', date: '16 March 2026' },
        { id: '3', message: 'An item in your order is unavailable.', date: '16 March 2026' },
    ],
    bartender: [
        { id: '1', message: 'New order received from Table 5.', date: '16 March 2026' },
        { id: '2', message: 'Payment confirmed for Order #102.', date: '16 March 2026' },
    ]
};