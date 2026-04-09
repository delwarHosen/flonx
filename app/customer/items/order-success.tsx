import OrderSuccessContent from "@/components/CommonComponents/OrderSuccessContent";
import { useLocalSearchParams } from "expo-router";

export default function OrderSuccess() {
    const { orderId } = useLocalSearchParams<{ orderId: string }>();
    return (
        <OrderSuccessContent
            title="Success"
            tipRoute="/customer/items/tip-select"
            orderAgainRoute="/customer/items/shop-items"
            orderId={orderId}
        />
    );
}