import { OrderTabIcon } from '@/assets/images/icons/icon';
import BarCardComponents from '@/components/cardComponents/BarCardComponents';
import ItemCard from '@/components/cardComponents/ItemCard';
import SectionTitle from '@/components/SectionTitle';
import { Body1, Caption1 } from '@/components/typo/Typography';
import { bars } from '@/constants/data/barData';
import { Colors } from '@/constants/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image as RNImage, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShopItems = () => {
    const router = useRouter();
    const { barId } = useLocalSearchParams();

    const [cart, setCart] = useState<{ [key: string]: number }>({});
    const [showModal, setShowModal] = useState(false);


    const barData = bars.find(b => b.id.toString() === barId) || bars[0];
    const [selectedCategory, setSelectedCategory] = useState(barData.categories[0]?.id);
    const activeItems = barData.categories.find(cat => cat.id === selectedCategory)?.items || [];


    const handleAddToCart = (item: any) => {
        setCart(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
        setShowModal(true);
    };


    const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const totalPrice = activeItems.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);



    return (
        <SafeAreaView style={styles.container}>
            {/* 1. Header with Back Button */}
            <View style={styles.header}>
                <SectionTitle title='Shop Item' />
            </View>

            <FlatList
                data={activeItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ItemCard
                        item={item}
                        isInCart={!!cart[item.id]}
                        onAdd={() => handleAddToCart(item)}
                        onPress={() => router.push({
                            pathname: '/guest/item-details',
                            params: {
                                itemName: item.name,
                                itemImg: typeof item.img === 'number'
                                    ? item.img
                                    : RNImage.resolveAssetSource(item.img).uri,
                                itemIngredients: item.ingredients.join(', '),
                                itemPrice: item.price.toString(),
                                itemStatus: item.status,
                                itemDescription: item.description
                            }
                        })}
                    />
                )}
                ListHeaderComponent={
                    <View>
                        {/* 2. Dynamic Bar Info Card */}
                        <BarCardComponents
                            item={barData}
                            onPress={() => router.push({
                                pathname: '/guest/shop-details',
                                params: { barId: barData.id }
                            })}
                        />

                        {/* 3. Horizontal Category Tabs */}
                        <FlatList
                            horizontal
                            data={barData.categories}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(cat) => cat.id.toString()}
                            style={styles.tabList}
                            renderItem={({ item: cat }) => (
                                <TouchableOpacity
                                    onPress={() => setSelectedCategory(cat.id)}
                                    style={[
                                        styles.tab,
                                        selectedCategory === cat.id && styles.activeTab
                                    ]}
                                >
                                    <Body1 color={selectedCategory === cat.id ? '#FFF' : Colors.OTP_COLOR}>
                                        {cat.name}
                                    </Body1>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                }
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />


            {/* --- Checkout Modal --- */}
            {showModal && totalItems > 0 && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                            <View style={styles.cartBadge}>
                                <OrderTabIcon />
                            </View>
                            <View>
                                <Body1 color="#FFF" style={{ fontWeight: '800', marginBottom: 10 }}>{totalItems} Items</Body1>
                                <Caption1 color="#1D1733" style={styles.priceText}>${totalPrice}</Caption1>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.checkoutBtn}
                            onPress={() => router.push({
                                pathname: "/guest/checkout",
                                params: {
                                    cartData: JSON.stringify(cart),
                                    barId: barId
                                }
                            })}
                        >
                            <Body1 color="#1D1733" style={{ fontWeight: '700' }}>Checkout</Body1>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

        </SafeAreaView>
    );
};

export default ShopItems;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    header: {
        marginVertical: 16
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.INPUT_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabList: {
        marginBottom: 20,
    },
    tab: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 100,
        backgroundColor: Colors.INPUT_BACKGROUND,
        marginRight: 10,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
    activeTab: {
        backgroundColor: Colors.BRAND_PRIMARY || '#A020F0',
        borderColor: Colors.BRAND_PRIMARY || '#A020F0',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    modalOverlay: {
        position: 'absolute',
        bottom: "15%",
        left: 20,
        right: 20,
        backgroundColor: Colors.BRAND_PRIMARY,
        borderRadius: 100,
        padding: 26,
        borderWidth: 1,
        borderColor: Colors.NEUTRAL0,
        // elevation: 5,
    },
    modalContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartBadge: {
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: .8,
        borderColor: Colors.NEUTRAL0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutBtn: {
        backgroundColor: Colors.NEUTRAL0,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
    },
    priceText: {
        fontSize: 16,
        fontWeight: 800
    }
});