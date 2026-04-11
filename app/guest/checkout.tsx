import CheckoutScreen from "@/components/CommonComponents/CheckoutScreen";


export default function GuestCheckout() {
    return <CheckoutScreen paymentPath="/guest/payment-type" />;
}
