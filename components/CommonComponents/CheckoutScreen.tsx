import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Linking,
    Platform,
    RefreshControl,
    StyleSheet,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';

import { DeleteIcon } from '@/assets/images/icons/BarRelatedIcon/DeleteIcon';
import { MinusIcon } from '@/assets/images/icons/BarRelatedIcon/MinusIcon';
import { PlusIcon } from '@/assets/images/icons/BarRelatedIcon/PlusIcon';
import { CustomButton } from '../CustomButton';
import EmptyStateCard from '../EmptyStateCardProps';
import SectionTitle from '../SectionTitle';
import { Body1, Body2, Body4, Caption1, Caption3, H5, H6 } from '../typo/Typography';

import { addItem, clearCart, deleteItemCompletely, removeItem as removeLocalItem } from '@/redux/cartSlice';
import {
    useCreateOrderMutation,
    useDeleteCartMutation,
    useRemoveCartItemMutation,
    useUpdateCartQuantityMutation,
    useViewCartQuery
} from '@/redux/services/orderApi';
import { useDispatch } from 'react-redux';
import CustomLoader from '../CustomLoader';

interface CheckoutScreenProps {
    paymentPath: '/customer/items/payment-type' | '/guest/payment-type';
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ paymentPath }) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const [createPayment, { isLoading: isPaymentLoading }] = useCreateOrderMutation(undefined)

    
    const { data: cartData, isLoading: isCartLoading, isFetching, refetch } = useViewCartQuery(undefined);
    const [updateCartQuantity] = useUpdateCartQuantityMutation();
    const [removeCartItem, { isLoading: isCartRemoving }] = useRemoveCartItemMutation();
    const [deleteCart, { isLoading: isDeletingAll }] = useDeleteCartMutation();

    const [selectItem, setSelectItem] = useState<string | null>(null)
    const [localQuantities, setLocalQuantities] = useState<Record<string, number>>({});
    const debounceTimers = React.useRef<Record<string, ReturnType<typeof setTimeout>>>({});

    const cartItems = cartData?.items || [];

    const totalPrice = cartItems.reduce((sum: number, item: any) => {
        const qty = localQuantities[item.product?._id] ?? item.quantity;
        return sum + item.price * qty;
    }, 0);

    const handleUpdateQuantity = (productId: string, currentQty: number, delta: number) => {
        const localQty = localQuantities[productId] ?? currentQty;
        const newQuantity = localQty + delta;
        if (newQuantity < 1) return;

        setLocalQuantities(prev => ({ ...prev, [productId]: newQuantity }));

        if (delta > 0) {
            dispatch(addItem({ id: productId }));
        } else {
            dispatch(removeLocalItem({ id: productId }));
        }

        if (debounceTimers.current[productId]) {
            clearTimeout(debounceTimers.current[productId]);
        }
        debounceTimers.current[productId] = setTimeout(async () => {
            try {
                await updateCartQuantity({ productId, quantity: newQuantity }).unwrap();
            } catch (err) {
                setLocalQuantities(prev => ({ ...prev, [productId]: currentQty }));
            }
        }, 600);
    };

    const handleClearCart = async () => {
        Alert.alert('Clear Cart', 'Are you sure you want to remove all items?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Clear All',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await deleteCart(undefined).unwrap();
                        setLocalQuantities({});
                        dispatch(clearCart());
                    } catch (err) {
                        console.error("Clear failed:", err);
                    }
                }
            }
        ]);
    };

    const handleRemoveItem = async (productId: string) => {
        try {
            await removeCartItem(productId).unwrap();
            dispatch(deleteItemCompletely({ id: productId }));
        } catch (err) {
            console.error("Remove failed:", err);
        }
    };

    const renderItem = ({ item }: { item: any }) => {
        const displayQty = localQuantities[item.product?._id] ?? item.quantity;

        return (
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
                    <TouchableOpacity 
                        disabled={isCartRemoving}
                        onPress={() => {
                            setSelectItem(item?.product?._id)
                            handleRemoveItem(item.product?._id)
                        }} 
                        style={styles.deleteBtn}
                    >
                        {isCartRemoving && item.product?._id === selectItem ? (
                            <ActivityIndicator size={'small'} color={'#EF4444'} />
                        ) : (
                            <DeleteIcon />
                        )}
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
                        <H6 color={Colors.NEUTRAL0} italic style={styles.qtyText}>{displayQty}</H6>
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
    };

    const handlerPayment = async () => {
        try {
            const res = await createPayment({}).unwrap()
            if (!res?.success) {
                throw new Error(res?.message || "Something went wrong while creating order!")
            }
            dispatch(clearCart());
            if (res?.data?.paymentUrl) {
                Linking.openURL(res?.data?.paymentUrl);
            }
        } catch (error: any) {
            if (Platform.OS === "android") {
                ToastAndroid.show(error?.data?.message || error?.message || 'Error occurred!', ToastAndroid.SHORT);
            } else {
                Alert.alert("Error", error?.data?.message || error?.message || 'Error occurred!')
            }
        }
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.headerWrapper}>
                <SectionTitle title='Checkout' />
            </View>

            <View style={styles.clearHeader}>
                {cartItems.length > 0 && (
                    <TouchableOpacity 
                        onPress={handleClearCart} 
                        style={styles.buttonClear}
                        disabled={isDeletingAll}
                    >
                        {isDeletingAll ? (
                            <ActivityIndicator size="small" color={Colors.NEUTRAL0} />
                        ) : (
                            <Caption1 color={Colors.NEUTRAL0}>Clear Cart</Caption1>
                        )}
                    </TouchableOpacity>
                )}
            </View>

            {/* মেইন ডাটা লোডিং এর সময় কাস্টম লোডার */}
            {isCartLoading && !isFetching ? (
                <View style={styles.loaderContainer}>
                    <CustomLoader />
                </View>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<EmptyStateCard message='Your cart is empty' />}
                    refreshControl={
                        <RefreshControl refreshing={isFetching} onRefresh={refetch} tintColor={Colors.BRAND_PRIMARY} />
                    }
                />
            )}

            {cartItems?.length > 0 && (
                <View style={[styles.footer, { paddingBottom: Platform.OS === 'ios' ? insets.bottom + 15 : "12%" }]}>
                    <View style={styles.totalRow}>
                        <Body4 color={Colors.NEUTRAL0}>Total</Body4>
                        <H5 color={Colors.NEUTRAL0}>${totalPrice.toFixed(2)}</H5>
                    </View>

                    <CustomButton
                        title="Checkout"
                        isLoading={isPaymentLoading}
                        onPress={() => handlerPayment()}
                        width="100%"
                        height={hp(48)}
                        borderRadius={100}
                        backgroundColor={Colors.NEUTRAL0}
                        color={Colors.BRAND_PRIMARY}
                    />
                    <View style={{ height: 12 }} />
                </View>
            )}
        </SafeAreaView>
    );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerWrapper: {
        paddingVertical: hp(8),
        paddingBottom: hp(10)
    },
    clearHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: wp(20),
        marginBottom: hp(15)
    },
    buttonClear: {
        backgroundColor: Colors.COLOR_DANGER,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 8,
        alignItems: 'center',
        minWidth: 100, 
        justifyContent: 'center'
    },
    listContent: {
        paddingHorizontal: wp(20),
        paddingBottom: hp(150)
    },
    
    card: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 14,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#2A2344'
    },
    cardTop: {
        flexDirection: 'row',
        marginBottom: hp(12)
    },
    itemImage: {
        width: wp(78),
        height: 78,
        borderRadius: 12,
        backgroundColor: '#FEE2E2'
    },
    itemInfo: {
        flex: 1,
        marginLeft: wp(15),
        justifyContent: 'center'
    },
    ingredients: {
        fontSize: 12,
        marginVertical: 4,
        lineHeight: 16
    },
    price: {
        marginTop: 2
    },
    deleteBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#EF444433",
        alignItems: "center",
        justifyContent: "center"
    },
    divider: {
        height: 1,
        backgroundColor: "#2A2448",
        marginTop: 6
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    qtyText: {
        marginHorizontal: 15,
        marginTop: 15,
        minWidth: 20,
        textAlign: 'center'
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: 15
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 4
    },
    footer: {
        backgroundColor: Colors.BRAND_PRIMARY,
        paddingHorizontal: wp(20),
        paddingTop: hp(20),
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        elevation: 10
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(15)
    },
});