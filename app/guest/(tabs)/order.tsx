import OrderListScreen from "@/components/order/OrderListScreen";


export default function GuestOrderTab() {
  return (
    <OrderListScreen
      routes={{
        currentOrder: '/guest/current-order',
        pastOrderDetail: '/guest/orders-details/my-orders',
        pickupOrder: '/guest/pickup-order',
      }}
    />
  );
}