import TipSelectionContent from '@/components/CommonComponents/TipSelectionContent';
import { Colors } from '@/constants/theme';

export default function CustomerTip() {
    return (
        <TipSelectionContent
            customTipRoute="/customer/items/custom-tip-seleted"
            continueRoute="/customer/items/payment-type"
            skipRoute="/customer/items/shop-items"
            primaryColor={Colors.BRAND_PRIMARY_LIGHT}
        />
    );
}