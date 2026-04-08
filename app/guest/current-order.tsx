import { CurrentOrderScreen } from "@/components/order/CurrentOrderScreen";

 
export default function GuestCurrentOrder() {
  return (
    <CurrentOrderScreen
      pickupRoute="/guest/pickup-order"
      fallbackRoute="/guest/(tabs)/order"
    />
  );
}