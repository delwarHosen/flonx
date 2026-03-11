import TipSelectionContent from '@/components/CommonComponents/TipSelectionContent';
import { Colors } from '@/constants/theme';

export default function GuestTip() {
    return (
        <TipSelectionContent
            customTipRoute="/guest/custom-tip-seleted" 
            continueRoute="/guest/payment-type"
            skipRoute="/guest/shop-item"
            primaryColor={Colors.BRAND_PRIMARY}
        />
    );
}