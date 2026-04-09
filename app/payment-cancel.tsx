import { Colors } from '@/constants/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function PaymentCancel() {
    const router = useRouter();
    const { role } = useLocalSearchParams<{ role: string }>();

    useEffect(() => {
        if (role === 'customer') {
            router.replace('/customer/items/orders' as any);
        } else {
            router.replace('/guest/order' as any);
        }
    }, [role]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.APP_BACKGROUND }}>
            <ActivityIndicator size="large" color={Colors.BRAND_PRIMARY} />
        </View>
    );
}