import CustomLoader from '@/components/CustomLoader';
import OrderDetailsScreen from '@/components/order/OrderDetailsScreen';
import { Colors } from '@/constants/theme';
import { useRequireCustomer } from '@/hooks/useRequireCustomer';
import { View } from 'react-native';

export default function CustomerMyOrders() {
    const checked = useRequireCustomer();

    if (!checked) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.APP_BACKGROUND }}>
            <CustomLoader/>
        </View>
    );
    return <OrderDetailsScreen tipRoute="/customer/items/tip-select" />;
}