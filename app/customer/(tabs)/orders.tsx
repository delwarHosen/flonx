import OrderListScreen from "@/components/order/OrderListScreen";


export default function CustomerOrderTab() {
  return (
    <OrderListScreen
      routes={{
        currentOrder:    '/customer/orders-details/current-order',
        pastOrderDetail: '/customer/orders-details/my-orders',
      }}
    />
  );
}