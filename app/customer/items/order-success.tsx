import OrderSuccessContent from "@/components/CommonComponents/OrderSuccessContent";

export default function OrderSuccess() {
    return (
        <OrderSuccessContent
            title="Success"
            tipRoute="/customer/items/tip-select"
            orderAgainRoute="/customer/items/shop-items"
        />
    );
}