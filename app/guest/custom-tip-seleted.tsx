import CustomTipContent from '@/components/CommonComponents/CustomTipContent';
import { Colors } from '@/constants/theme';

export default function GuestCustomTip() {
    return (
        <CustomTipContent
            continueRoute="/guest/payment-type"
            skipRoute="/guest/(tabs)/search"
            primaryColor={Colors.BRAND_PRIMARY_LIGHT}
        />
    );
}