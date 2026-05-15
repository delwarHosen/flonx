import CustomLoader from '@/components/CustomLoader';
import { PickupOrderContent } from '@/components/ItemsRelated/PickupOrderContent';
import { Colors } from '@/constants/theme';
import { useRequireCustomer } from '@/hooks/useRequireCustomer';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomerPickup() {
    const checked = useRequireCustomer();

    if (!checked) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.APP_BACKGROUND }}>
            <CustomLoader size={40} />
        </View>
    );
    const { id,
        orderCode,
        venueName,
        colorCode
    } = useLocalSearchParams<{
        id: string;
        orderCode: string,
        venueName: string;
        colorCode: string;
    }>();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colorCode || Colors.COLOR_ACTIVE }}>
            <PickupOrderContent
                pickupCode={orderCode}
                orderId={id}
                orderCode={orderCode}
                venueName={venueName}
                successRoute="/customer/items/tip-select"

            />
        </SafeAreaView>
    );
}