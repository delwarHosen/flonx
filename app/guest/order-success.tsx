import OrderSuccessContent from "@/components/CommonComponents/OrderSuccessContent";


export default function OrderSuccess() {
    return (
        <OrderSuccessContent
            title="Order Completed"
            tipRoute="/guest/tip-select"
            orderAgainRoute="/guest/shop-item"
        />
    );
}