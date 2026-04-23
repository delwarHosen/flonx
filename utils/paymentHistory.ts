import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'payment_history';

export interface PaymentRecord {
    orderId: string;
    bartender: string;
    amount: number;
    paidAt: string;
    status: 'paid' | 'failed';
}

export const savePaymentHistory = async (record: PaymentRecord) => {
    try {
        const existing = await AsyncStorage.getItem(KEY);
        const history: PaymentRecord[] = existing ? JSON.parse(existing) : [];
        history.unshift(record); // নতুনটা সামনে
        await AsyncStorage.setItem(KEY, JSON.stringify(history));
    } catch (err) {
        console.error('Failed to save payment history:', err);
    }
};

export const getPaymentHistory = async (): Promise<PaymentRecord[]> => {
    try {
        const data = await AsyncStorage.getItem(KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};