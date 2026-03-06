import { DeleteIcon } from '@/assets/images/icons/BarRelatedIcon/DeleteIcon';
import { MinusIcon } from '@/assets/images/icons/BarRelatedIcon/MinusIcon';
import { PlusIcon } from '@/assets/images/icons/BarRelatedIcon/PlusIcon';
import { CustomButton } from '@/components/CustomButton';
import SectionTitle from '@/components/SectionTitle';
import { Body1, Body2, Caption1, H5, H6 } from '@/components/typo/Typography';
import { bars } from '@/constants/data/barData';
import { Colors } from '@/constants/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Types aligned with your barData ---
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
    const { cartData, barId } = useLocalSearchParams<{ cartData: string; barId: string }>();

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        if (cartData && barId) {
            try {
                const initialCart: { [key: string]: number } = JSON.parse(cartData);
                const currentBar = bars.find(b => b.id.toString() === barId) || bars[0];

                // Flattening all items from all categories of the bar
                const allItemsInBar: Item[] = currentBar.categories.flatMap(cat => cat.items);

                // Mapping items with their respective quantities
                const matchedItems: CartItem[] = allItemsInBar
                    .filter(item => initialCart[item.id])
                    .map(item => ({
                        ...item,
                        quantity: initialCart[item.id]
                    }));

                setCartItems(matchedItems);
            } catch (error) {
                console.error("Failed to parse cart data", error);
            }
        }
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
                    <Body1 color={Colors.NEUTRAL0} style={styles.itemName}>{item.name}</Body1>
                    <Caption1 color={Colors.PLACEHOLLDER_TEXT} italic style={styles.ingredients}>
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
                        width={44}
                        height={44}
                        borderRadius={100}
                    />

                    <H6 color={Colors.NEUTRAL0} italic style={styles.qtyText}>{item.quantity}</H6>

                    <CustomButton
                        onPress={() => updateQuantity(item.id, -1)}
                        icon={<MinusIcon />}
                        width={44}
                        height={44}
                        borderRadius={100}
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
                    <Caption1 color={item.status === 'in_stock' ? '#22C55E' : '#EF4444'}>
                        {item.status === 'in_stock' ? 'In Stock' : 'Out Of Stock'}
                    </Caption1>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View>
                <SectionTitle title='Checkout' />
            </View>

            <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={{ marginTop: 100, alignItems: 'center' }}>
                        <Body1 color="#AAA">Your cart is empty</Body1>
                    </View>
                }
            />

            {/* Bottom Section */}
            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Body1 color={Colors.NEUTRAL0} style={styles.totalLabel}>Total</Body1>
                    <H5 color={Colors.NEUTRAL0} style={styles.totalAmount}>${totalPrice}</H5>
                </View>

                <CustomButton
                    title=" Checkout"
                    onPress={() =>router.push("/customer/items/payment-type")}
                    width="100%"
                    height={44}
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

    listContent: { paddingHorizontal: 20, paddingBottom: 30,
        marginTop:20
     },
    card: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 14,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#2A2344',
    
    },
    cardTop: {
        flexDirection: 'row',
        marginBottom: 12
    },
    itemImage: {
        width: 78,
        height: 78,
        borderRadius: 12,
        backgroundColor: '#FEE2E2'
    },
    itemInfo: {
        flex: 1, marginLeft: 15,
        justifyContent: 'center'
    },
    itemName: {
        fontWeight: '400'
    },
    ingredients: {
        fontSize: 13,
        marginVertical: 6,
        lineHeight: 18
    },
    price: {
        fontWeight: '700'
    },
    deleteBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#EF444433",
        padding: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -5
    },
    divider: {
        height: 1.5,
        backgroundColor: "#2A2448",
        marginBottom: 14,
        marginTop: 6
    },
    cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    qtyText: {
        marginHorizontal: 35,
        marginTop: 16
    },
    statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    statusDot: { width: 4, height: 4, borderRadius: 2, marginRight: 6 },
    footer: {
        backgroundColor: Colors.BRAND_PRIMARY,
        padding: 25,
    },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    totalLabel: {

        fontWeight: '700'
    },
    totalAmount: {
        fontWeight: '800'
    },
   
    stripeText: { textAlign: 'center', marginTop: 15, opacity: 0.9 }
});