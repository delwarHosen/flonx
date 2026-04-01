import { DeleteIcon } from '@/assets/images/icons/BarRelatedIcon/DeleteIcon';
import { MinusIcon } from '@/assets/images/icons/BarRelatedIcon/MinusIcon';
import { PlusIcon } from '@/assets/images/icons/BarRelatedIcon/PlusIcon';
import { Colors } from '@/constants/theme';
import { useCreateOrderMutation } from '@/redux/services/orderApi';
import { hp, wp } from '@/utils/responsive';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton } from '../CustomButton';
import EmptyStateCard from '../EmptyStateCardProps';
import SectionTitle from '../SectionTitle';
import { Body1, Body2, Body4, Caption1, Caption3, H5, H6 } from '../typo/Typography';

interface CartItem {
    _id: string;
    name: string;
    image: string;
    price: number;
    tags: string[];
    description: string;
    isAvailable: boolean;
    quantity: number;
}

interface CheckoutScreenProps {
    paymentPath: '/customer/items/payment-type' | '/guest/payment-type';
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ paymentPath }) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { cartData } = useLocalSearchParams<{ cartData: string; barId: string }>();
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (cartData) {
            try {
                const parsed = JSON.parse(cartData);
                const items = Array.isArray(parsed)
                    ? parsed
                    : Object.entries(parsed).map(([_id, quantity]) => ({ _id, quantity }));
                setCartItems(items);
            } catch (error) {
                console.error("Failed to parse cart data", error);
            }
        }
        setIsInitialLoading(false);
    }, [cartData]);

    const updateQuantity = (_id: string, delta: number) => {
        setCartItems(prev => prev.map(item =>
            item._id === _id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (_id: string) => {
        setCartItems(prev => prev.filter(item => item._id !== _id));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // STRIPE PAYMENT
    const handleCheckout = async () => {
        try {
            // const result = await createOrder({
            //     shippingAddress: "68c57a195f295298cb454b0b",
            //     paymentMethod: "Stripe",
            //     selectedRateId: "19293fc722754654b9ed4b088b90f770",
            //     shipmentId: "d727cfedf2be4161889669f723da4051",
            // }).unwrap();

            // console.log("Order created:", result);
            router.push(paymentPath as any);

        } catch (err) {
            console.error("Order failed:", err);
        }
    };


    const renderItem = ({ item }: { item: CartItem }) => (
        <View style={styles.card}>
            <View style={styles.cardTop}>
                <Image source={{ uri: item.image }} style={styles.itemImage} contentFit="cover" />
                <View style={styles.itemInfo}>
                    <Body1 color={Colors.NEUTRAL0}>{item.name}</Body1>
                    <Caption1 color={Colors.PLACEHOLLDER_TEXT} italic style={styles.ingredients} numberOfLines={2}>
                        {item.tags?.length ? item.tags.join(', ') : item.description}
                    </Caption1>
                    <Body2 color={Colors.NEUTRAL0} style={styles.price}>${item.price}</Body2>
                </View>
                <TouchableOpacity onPress={() => removeItem(item._id)} style={styles.deleteBtn}>
                    <DeleteIcon />
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardBottom}>
                <View style={styles.quantityContainer}>

                    <CustomButton
                        onPress={() => updateQuantity(item._id, 1)}
                        icon={<PlusIcon />}
                        width={40}
                        height={40}
                        borderRadius={100}
                        color={Colors.NEUTRAL0}
                    />
                    <H6 color={Colors.NEUTRAL0} italic style={styles.qtyText}>{item.quantity}</H6>
                    <CustomButton
                        onPress={() => updateQuantity(item._id, -1)} icon={<MinusIcon />} width={40} height={40} borderRadius={100} color={Colors.NEUTRAL0} />
                </View>
                <View style={[styles.statusBadge, { backgroundColor: item.isAvailable ? '#22C55E33' : '#EF444433' }]}>
                    <View style={[styles.statusDot, { backgroundColor: item.isAvailable ? '#22C55E' : '#EF4444' }]} />
                    <Caption3 color={item.isAvailable ? '#22C55E' : '#EF4444'}>
                        {item.isAvailable ? 'In Stock' : 'Out Of Stock'}
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

            {isInitialLoading ? (
                <ActivityIndicator color={Colors.BRAND_PRIMARY} style={{ marginTop: hp(50) }} />
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <EmptyStateCard message='Your cart is empty' />
                        </View>
                    }
                />
            )}

            <View style={[styles.footer, { paddingBottom: Platform.OS === 'ios' ? insets.bottom + 15 : "15%" }]}>
                <View style={styles.totalRow}>
                    <Body4 color={Colors.NEUTRAL0}>Total</Body4>
                    <H5 color={Colors.NEUTRAL0} style={styles.totalAmount}>${totalPrice}</H5>
                </View>

                <CustomButton
                    title={isLoading ? "Processing..." : "Checkout"}
                    onPress={handleCheckout}
                    width="100%"
                    height={hp(48)}
                    borderRadius={100}
                    backgroundColor={Colors.NEUTRAL0}
                    borderColor={Colors.BRAND_PRIMARY}
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
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND
    },
    headerWrapper: {
        paddingVertical: Platform.OS === 'ios' ? 10 : hp(16),
        paddingBottom: hp(20)
    },
    listContent: {
        paddingHorizontal: wp(20),
        paddingBottom: hp(30)
    },
    emptyContainer: {
        marginTop: hp(20),
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
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.2,
                shadowRadius: 5
            },
            android: { elevation: 10 }
        })
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    totalAmount: {},
    stripeText: {
        textAlign: 'center',
        marginTop: hp(15),
        opacity: 0.7,
        fontSize: 11
    },
});