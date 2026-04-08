import { CurrentOrderScreen } from "@/components/order/CurrentOrderScreen";


export default function CustomerCurrentOrder() {
    return (
        <CurrentOrderScreen
            pickupRoute="/customer/items/pickup-order"
            fallbackRoute="/customer/(tabs)/orders"
        />
    );
}