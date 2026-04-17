import TipSelectionContent from '@/components/CommonComponents/TipSelectionContent';
import CustomLoader from '@/components/CustomLoader';
import { Colors } from '@/constants/theme';
import { useRequireCustomer } from '@/hooks/useRequireCustomer';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function CustomerTip() {
    const checked = useRequireCustomer();

    if (!checked) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.APP_BACKGROUND }}>
           <CustomLoader/>
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