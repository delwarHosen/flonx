import { DeleteIcon } from '@/assets/images/icons/BarRelatedIcon/DeleteIcon';
import { MinusIcon } from '@/assets/images/icons/BarRelatedIcon/MinusIcon';
import { PlusIcon } from '@/assets/images/icons/BarRelatedIcon/PlusIcon';
import { CustomButton } from '@/components/CustomButton';
import SectionTitle from '@/components/SectionTitle';
import { Body1, Body2, Body4, Caption1, Caption3, H5, H6 } from '@/components/typo/Typography';
import { bars } from '@/constants/data/barData';
import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// --- Types ---
interface Item {
    id: number;
    name: string;
    ingredients: string[];
    price: number;
    img: any;
    status: 'in_stock' | 'out_of_stock' | string;
    description?: string;
}

interface CartItem extends Item {
    quantity: number;
}

const Checkout: React.FC = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets(); // For iPhone Notch/Home bar responsiveness
    const { cartData, barId } = useLocalSearchParams<{ cartData: string; barId: string }>();
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        if (cartData && barId) {
            try {
                const initialCart: { [key: string]: number } = JSON.parse(cartData);
                const currentBar = bars.find(b => b.id.toString() === barId) || bars[0];

                const allItemsInBar: Item[] = currentBar.categories.flatMap(cat => cat.items);

                const matchedItems: CartItem[] = allItemsInBar
                    .filter(item => initialCart[item.id.toString()])
                    .map(item => ({
                        ...item,
                        quantity: initialCart[item.id.toString()]
                    }));

                setCartItems(matchedItems);
            } catch (error) {
                console.error("Failed to parse cart data", error);
            }
        }
        setIsInitialLoading(false);
    }, [cartData, barId]);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(prev => prev.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        ));
    };

    const removeItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const renderItem = ({ item }: { item: CartItem }) => (
        <View style={styles.card}>
            <View style={styles.cardTop}>
                <Image
                    source={typeof item.img === 'string' ? { uri: item.img } : item.img}
                    style={styles.itemImage}
                />
                <View style={styles.itemInfo}>
                    <Body1 color={Colors.NEUTRAL0}>{item.name}</Body1>
                    <Caption1 color={Colors.PLACEHOLLDER_TEXT} italic style={styles.ingredients} numberOfLines={2}>
                        {item.ingredients.join(', ')}
                    </Caption1>
                    <Body2 color={Colors.NEUTRAL0} style={styles.price}>${item.price}</Body2>
                </View>

                <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteBtn}>
                    <DeleteIcon />
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardBottom}>
                <View style={styles.quantityContainer}>
                    <CustomButton
                        onPress={() => updateQuantity(item.id, 1)}
                        icon={<PlusIcon />}
                        width={40}
                        height={40}
                        borderRadius={100}
                        color={Colors.NEUTRAL0}
                    />

                    <H6 color={Colors.NEUTRAL0} italic style={styles.qtyText}>{item.quantity}</H6>

                    <CustomButton
                        onPress={() => updateQuantity(item.id, -1)}
                        icon={<MinusIcon />}
                        width={40}
                        height={40}
                        borderRadius={100}
                        color={Colors.NEUTRAL0}
                    />
                </View>

                <View style={[
                    styles.statusBadge,
                    { backgroundColor: item.status === 'in_stock' ? '#22C55E33' : '#EF444433' }
                ]}>
                    <View style={[
                        styles.statusDot,
                        { backgroundColor: item.status === 'in_stock' ? '#22C55E' : '#EF4444' }
                    ]} />
                    <Caption3 color={item.status === 'in_stock' ? '#22C55E' : '#EF4444'}>
                        {item.status === 'in_stock' ? 'In Stock' : 'Out Of Stock'}
                    </Caption3>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Header */}
            <View style={styles.headerWrapper}>
                <SectionTitle title='Checkout' />
            </View>

            {
                isInitialLoading ? (
                    <ActivityIndicator color={Colors.BRAND_PRIMARY} style={{ marginTop: hp(50) }} />
                ) : (
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Body1 color="#AAA">Your cart is empty</Body1>
                            </View>
                        }
                    />
                )
            }


            {/* Bottom Section - Responsive Footer */}
            <View style={[
                styles.footer,
                { paddingBottom: Platform.OS === 'ios' ? insets.bottom + 15 : "15%" }
            ]}>
                <View style={styles.totalRow}>
                    <Body4 color={Colors.NEUTRAL0}>Total</Body4>
                    <H5 color={Colors.NEUTRAL0} style={styles.totalAmount}>${totalPrice}</H5>
                </View>

                <CustomButton
                    title="Checkout"
                    onPress={() => router.push("/guest/payment-type")}
                    width="100%"
                    height={hp(44)}
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

export default Checkout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    headerWrapper: {
        paddingVertical: Platform.OS === 'ios' ? hp(10) : hp(16),
        paddingBottom: hp(20)
    },
    listContent: {
        paddingHorizontal: wp(20),
        paddingBottom: hp(30),
    },
    emptyContainer: {
        marginTop: 100,
        alignItems: 'center'
    },
    card: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 14,
        padding: 12,
        marginBottom: hp(16),
        borderWidth: 1,
        borderColor: '#2A2344',
    },
    cardTop: {
        flexDirection: 'row',
        marginBottom: hp(12)
    },
    itemImage: {
        width: 78,
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
        marginVertical: hp(4),
        lineHeight: 16
    },
    price: {
        // fontWeight: '700',
        marginTop: 2
    },
    deleteBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#EF444433",
        alignItems: "center",
        justifyContent: "center",
    },
    divider: {
        height: 1,
        backgroundColor: "#2A2448",
        // marginBottom: 14,
        marginTop: hp(6)
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyText: {
        marginHorizontal: wp(15),
        marginTop: hp(15),
        minWidth: 20,
        textAlign: 'center'
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(10),
        paddingVertical: hp(4),
        borderRadius: 20,
        marginTop: hp(15)
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 4
    },
    footer: {
        backgroundColor: Colors.BRAND_PRIMARY,
        paddingHorizontal: wp(25),
        paddingTop: hp(20),
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        // Elevation for Android, Shadow for iOS
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
            android: {
                elevation: 10,
            }
        })
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 15
    },
    totalAmount: {
        // fontWeight: '800'
    },
    stripeText: {
        textAlign: 'center',
        marginTop: hp(15),
        opacity: 0.7,
        fontSize: 11
    }
});