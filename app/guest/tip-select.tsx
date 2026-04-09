import TipSelectionContent from '@/components/CommonComponents/TipSelectionContent';
import { Colors } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';

export default function GuestTip() {
    const { orderId } = useLocalSearchParams<{ orderId: string }>();
    return (
        <TipSelectionContent
            orderId={orderId}
            // role="guest"
            customTipRoute="/guest/custom-tip-seleted"
            continueRoute="/guest/order"
            skipRoute="/guest/(tabs)/search"
            primaryColor={Colors.BRAND_PRIMARY}
        />
    );
}