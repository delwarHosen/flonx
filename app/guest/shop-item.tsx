import ShopItemsScreen from '@/components/CommonComponents/ShopItemsScreen';
import CustomLoader from '@/components/CustomLoader';
import {
    useGetCategoriesByVenueQuery,
    useGetProductsByVenueQuery,
    useGetVenueByIdQuery,
} from '@/redux/services/venueApi';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function GuestShopItem() {
    const { barId } = useLocalSearchParams<{ barId: string }>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    //  useGetVenueByIdQuery use koro — getAllVenues call kora expensive & unnecessary
    const { data: currentVenue } = useGetVenueByIdQuery(barId, { skip: !barId });

    const { data: categoryData, isLoading: isCatLoading } = useGetCategoriesByVenueQuery(barId, {
        skip: !barId,
    });

    // categories response: { meta, result: [...] }
    const categories = categoryData?.result ?? [];

    // Auto-select first category
    useEffect(() => {
        if (categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]._id);
        }
    }, [categories]);

    // categoryId API-level e pass koro — client-side filter lagbe na
    const {
        data: productsData = [],
        isFetching: isProdFetching,
        isLoading: isProdFirstLoad,
        refetch,
    } = useGetProductsByVenueQuery(
        { venueId: barId, categoryId: selectedCategory ?? undefined },
        { skip: !barId }
    );

    if (isCatLoading || isProdFirstLoad) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CustomLoader size={40}/>
            </View>
        );
    }

    return (
<<<<<<< HEAD
        <ShopItemsScreen
            barId={barId}
            venue={currentVenue ? {
                _id: currentVenue._id,
                name: currentVenue.name,
                logo: currentVenue.logo,
                address: currentVenue.address,
            } : undefined}
            categories={categories}
            items={productsData}
            isProdLoading={isProdFetching}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            isLoading={isProdFetching}
            refetch={refetch}
            paths={{
                itemDetails: '/guest/item-details',
                shopDetails: '/guest/shop-details',
                checkout: '/guest/checkout',
            }}
        />
    );
}
=======
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header Section */}
            <View style={styles.headerWrapper}>
                <SectionTitle title='Shop Items' />
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
                                itemId: item.id.toString(),
                                itemName: item.name,
                                barId: barId,
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
                        <BarCardComponents
                            item={barData}
                            onPress={() => router.push({
                                pathname: '/guest/shop-details',
                                params: { barId: barData.id }
                            })}
                        />

                        <FlatList
                            horizontal
                            data={barData.categories}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(cat) => cat.id.toString()}
                            style={styles.tabList}
                            contentContainerStyle={{ paddingRight: wp(20) }}
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
                contentContainerStyle={[
                    styles.listContent,
                    { paddingBottom: showModal ? 120 : 40 } // Dynamic padding so modal doesn't hide items
                ]}
                showsVerticalScrollIndicator={false}
            />

            {/* --- Checkout Modal --- */}
            {showModal && totalItems > 0 && (
                <View style={[
                    styles.modalOverlay,
                    { bottom: Platform.OS === 'ios' ? insets.bottom + 10 : "8%" }
                ]}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                            <View style={styles.cartBadge}>
                                <OrderTabIcon />
                            </View>
                            <View>
                                <Body4 color="#FFF" style={{ marginBottom: 2 }}>{totalItems} Items</Body4>
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
                            <Caption4 color="#1D1733">Checkout</Caption4>
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
    headerWrapper: {
        paddingBottom: hp(16)
    },
    tabList: {
        marginBottom:hp(16),
    },
    tab: {
        paddingHorizontal: wp(20),
        paddingVertical: hp(7),
        borderRadius: 100,
        backgroundColor: Colors.INPUT_BACKGROUND,
        marginRight: wp(10),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
    activeTab: {
        backgroundColor: Colors.BRAND_PRIMARY || '#A020F0',
        borderColor: Colors.BRAND_PRIMARY || '#A020F0',
    },
    listContent: {
        paddingHorizontal: wp(20),
    },
    modalOverlay: {
        position: 'absolute',
        left: wp(20),
        right: wp(20),
        backgroundColor: Colors.BRAND_PRIMARY,
        borderRadius: 100,
        padding: 20, // Slightly reduced to fit better
        borderWidth: 1.5,
        borderColor: Colors.NEUTRAL0,
        // Shadow for both platforms
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
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
        borderWidth: 0.8,
        borderColor: Colors.NEUTRAL0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkoutBtn: {
        backgroundColor: Colors.NEUTRAL0,
        paddingHorizontal: wp(20),
        paddingVertical: hp(12),
        borderRadius: 100,
    },
    priceText: {
        fontSize: 16,
        fontWeight: '800'
    }
});
>>>>>>> 598b77566d85205196026cfc4e287bae3dbcb0ef
