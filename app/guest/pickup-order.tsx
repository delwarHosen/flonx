import { PickupOrderContent } from '@/components/ItemsRelated/PickupOrderContent';
import { Colors } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GuestPickup() {
    const params = useLocalSearchParams();
    
    const id = params.id as string;
    const orderCode = params.orderCode as string;
    const venueName = params.venueName as string;
    const colorCode = params.colorCode as string;

    console.log('Params:', { id, orderCode, venueName, colorCode }); // debug

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colorCode || Colors.COLOR_ACTIVE }}>
            <PickupOrderContent
                pickupCode={orderCode}
                orderId={id}
                orderCode={orderCode}
                venueName={venueName}
                successRoute="/guest/tip-select"
            />
        </SafeAreaView>
    );
}