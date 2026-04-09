import OrderSuccessContent from "@/components/CommonComponents/OrderSuccessContent";
import { useLocalSearchParams } from "expo-router";

export default function OrderSuccess() {
      const { orderId } = useLocalSearchParams<{ orderId: string }>();
    return (
        <OrderSuccessContent
            title="Order Completed"
            tipRoute="/guest/tip-select"
            orderAgainRoute="/guest/shop-item"
            orderId={orderId}
        />
    );
}