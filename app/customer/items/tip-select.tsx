import TipSelectionContent from '@/components/CommonComponents/TipSelectionContent';
import { Colors } from '@/constants/theme';
import { useRequireCustomer } from '@/hooks/useRequireCustomer';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function CustomerTip() {
    const checked = useRequireCustomer();

    if (!checked) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.APP_BACKGROUND }}>
            <ActivityIndicator size="large" color={Colors.BRAND_PRIMARY} />
        </View>
    );
    const { orderId } = useLocalSearchParams<{ orderId: string }>();

    return (
        <TipSelectionContent
            orderId={orderId}
            // role="customer"  
            customTipRoute="/customer/items/custom-tip-seleted"
            continueRoute="/customer/items/orders"
            skipRoute="/customer/(tabs)/orders"
            primaryColor={Colors.BRAND_PRIMARY_LIGHT}
        />
    );
}