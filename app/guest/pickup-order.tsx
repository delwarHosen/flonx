import { PickupOrderContent } from '@/components/ItemsRelated/PickupOrderContent';
import { Colors } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GuestPickup() {
    const { id, orderCode,venueName  } = useLocalSearchParams<{ id: string; orderCode: string,  venueName: string; }>();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.COLOR_ACTIVE }}>
            <PickupOrderContent
                pickupCode={orderCode}
                orderId={id}
                orderCode={orderCode}
                venueName={venueName} 
                successRoute="/guest/order-success"
            />
        </SafeAreaView>
    );
}