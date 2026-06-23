import TipSelectionContent from '@/components/CommonComponents/TipSelectionContent';
import { Colors } from '@/constants/theme';
import { useLocalSearchParams } from 'expo-router';

export default function GuestTip() {
    const params = useLocalSearchParams();
    const orderId = params.orderId as string;

    return (
        <TipSelectionContent
            orderId={orderId}
            role="guest"
            customTipRoute="/guest/custom-tip-seleted"
            continueRoute="/guest/order"
            skipRoute="/guest/(tabs)/search"
            primaryColor={Colors.BRAND_PRIMARY}
        />
    );
}