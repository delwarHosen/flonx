import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Platform,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Constants & Theme
import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';

// Components & Icons
import { DeleteIcon } from '@/assets/images/icons/BarRelatedIcon/DeleteIcon';
import { MinusIcon } from '@/assets/images/icons/BarRelatedIcon/MinusIcon';
import { PlusIcon } from '@/assets/images/icons/BarRelatedIcon/PlusIcon';
import { CustomButton } from '../CustomButton';
import EmptyStateCard from '../EmptyStateCardProps';
import SectionTitle from '../SectionTitle';
import { Body1, Body2, Body4, Caption1, Caption3, H5, H6 } from '../typo/Typography';

// API Hooks
import {
    useDeleteCartMutation,
    useRemoveCartItemMutation,
    useUpdateCartQuantityMutation,
    useViewCartQuery
} from '@/redux/services/orderApi';

interface CheckoutScreenProps {
    paymentPath: '/customer/items/payment-type' | '/guest/payment-type';
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ paymentPath }) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // সরাসরি API Query থেকে ডাটা
    const { data: cartData, isLoading: isCartLoading } = useViewCartQuery(undefined);
    const [updateCartQuantity] = useUpdateCartQuantityMutation();
    const [removeCartItem] = useRemoveCartItemMutation();
    const [deleteCart] = useDeleteCartMutation();

    const cartItems = cartData?.items || [];
    const totalPrice = cartData?.totalPrice || 0;

    // ১. কোয়ান্টিটি আপডেট (PATCH Query)
    const handleUpdateQuantity = async (productId: string, currentQty: number, delta: number) => {
        const newQuantity = currentQty + delta;
        if (newQuantity < 1) return;
        try {
            await updateCartQuantity({ productId, quantity: newQuantity }).unwrap();
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    // ২. কার্ট ক্লিয়ার করার অ্যালার্ট এবং ফাংশন
    const handleClearCart = async () => {
        Alert.alert('Clear Cart', 'Are you sure you want to remove all items?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Clear All',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deleteCart(undefined).unwrap();
                    } catch (err) {
                        console.error("Clear failed:", err);
                    }
                }
            }
        ]);
    };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.cardTop}>
                <Image source={{ uri: item.product?.image }} style={styles.itemImage} contentFit="cover" />
                <View style={styles.itemInfo}>
                    <Body1 color={Colors.NEUTRAL0}>{item.product?.name}</Body1>
                    <Caption1 color={Colors.PLACEHOLLDER_TEXT} italic style={styles.ingredients} numberOfLines={2}>
                        {item.product?.tags?.length ? item.product.tags.join(', ') : item.product?.description}
                    </Caption1>
                    <Body2 color={Colors.NEUTRAL0} style={styles.price}>${item.price}</Body2>
                </View>
                <TouchableOpacity onPress={() => removeCartItem(item.product?._id)} style={styles.deleteBtn}>
                    <DeleteIcon />
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardBottom}>
                <View style={styles.quantityContainer}>
                    <CustomButton
                        onPress={() => handleUpdateQuantity(item.product?._id, item.quantity, 1)}
                        icon={<PlusIcon />}
                        width={40}
                        height={40}
                        borderRadius={100}
                        color={Colors.NEUTRAL0}
                    />
                    <H6 color={Colors.NEUTRAL0} italic style={styles.qtyText}>{item.quantity}</H6>
                    <CustomButton
                        onPress={() => handleUpdateQuantity(item.product?._id, item.quantity, -1)} 
                        icon={<MinusIcon />} 
                        width={40} 
                        height={40} 
                        borderRadius={100} 
                        color={Colors.NEUTRAL0} 
                    />
                </View>
                <View style={[styles.statusBadge, { backgroundColor: item.product?.isAvailable !== false ? '#22C55E33' : '#EF444433' }]}>
                    <View style={[styles.statusDot, { backgroundColor: item.product?.isAvailable !== false ? '#22C55E' : '#EF4444' }]} />
                    <Caption3 color={item.product?.isAvailable !== false ? '#22C55E' : '#EF4444'}>
                        {item.product?.isAvailable !== false ? 'In Stock' : 'Out Of Stock'}
                    </Caption3>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.headerWrapper}>
                <SectionTitle title='Checkout' />
            </View>

            {/* Clear Cart Button */}
            <View style={styles.clearHeader}>
                {cartItems.length > 0 && (
                    <TouchableOpacity onPress={handleClearCart} style={styles.buttonClear}>
                        <Caption1 color={Colors.NEUTRAL0}>Clear Cart</Caption1>
                    </TouchableOpacity>
                )}
            </View>

            {isCartLoading ? (
                <ActivityIndicator color={Colors.BRAND_PRIMARY} style={{ marginTop: hp(50) }} />
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<EmptyStateCard message='Your cart is empty' />}
                />
            )}

            <View style={[styles.footer, { paddingBottom: Platform.OS === 'ios' ? insets.bottom + 15 : "12%" }]}>
                <View style={styles.totalRow}>
                    <Body4 color={Colors.NEUTRAL0}>Total</Body4>
                    <H5 color={Colors.NEUTRAL0}>${totalPrice}</H5>
                </View>

                <CustomButton
                    title="Checkout"
                    onPress={() => router.push(paymentPath as any)}
                    width="100%"
                    height={hp(48)}
                    borderRadius={100}
                    backgroundColor={Colors.NEUTRAL0}
                    color={Colors.BRAND_PRIMARY}
                />

                <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={styles.stripeText}>
                    Powered by Stripe • No signup required
                </Caption1>
            </View>
        </SafeAreaView>
    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
    headerWrapper: { paddingVertical: hp(8), paddingBottom: hp(10) },
    clearHeader: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: wp(20), marginBottom: hp(15) },
    buttonClear: { backgroundColor: Colors.COLOR_DANGER, borderRadius: 12, paddingHorizontal: 15, paddingVertical: 8, alignItems: 'center' },
    listContent: { paddingHorizontal: wp(20), paddingBottom: hp(150) },
    card: { backgroundColor: Colors.INPUT_BACKGROUND, borderRadius: 14, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: '#2A2344' },
    cardTop: { flexDirection: 'row', marginBottom: hp(12) },
    itemImage: { width: wp(78), height: 78, borderRadius: 12, backgroundColor: '#FEE2E2' },
    itemInfo: { flex: 1, marginLeft: wp(15), justifyContent: 'center' },
    ingredients: { fontSize: 12, marginVertical: 4, lineHeight: 16 },
    price: { marginTop: 2 },
    deleteBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#EF444433", alignItems: "center", justifyContent: "center" },
    divider: { height: 1, backgroundColor: "#2A2448", marginTop: 6 },
    cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    quantityContainer: { flexDirection: 'row', alignItems: 'center' },
    qtyText: { marginHorizontal: 15, marginTop: 15, minWidth: 20, textAlign: 'center' },
    statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginTop: 15 },
    statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 4 },
    footer: { backgroundColor: Colors.BRAND_PRIMARY, paddingHorizontal: wp(20), paddingTop: hp(20), borderTopLeftRadius: 24, borderTopRightRadius: 24, position: 'absolute', bottom: 0, width: '100%', elevation: 10 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp(15) },
    stripeText: { textAlign: 'center', marginTop: hp(15), opacity: 0.7, fontSize: 11 },
});