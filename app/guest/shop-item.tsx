
import ShopItemsScreen from '@/components/CommonComponents/ShopItemsScreen';
import CustomLoader from '@/components/CustomLoader';
import { useGetAllVenuesQuery, useGetCategoriesByVenueQuery, useGetProductsByVenueQuery } from '@/redux/services/venueApi';
import { hp } from '@/utils/responsive';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function GuestShopItem() {
    const { barId } = useLocalSearchParams<{ barId: string }>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { data: venuesData } = useGetAllVenuesQuery({});
    const currentVenue = venuesData?.result?.find((v: any) => v._id === barId);

    const { data: categories, isLoading: isCatLoading } = useGetCategoriesByVenueQuery(barId, {
        skip: !barId,
    });

    const { data: productsData, isFetching: isProdLoading, isLoading: isProdFirstLoad } =
        useGetProductsByVenueQuery({ venueId: barId }, { skip: !barId });

    useEffect(() => {
        if (categories?.length && !selectedCategory) {
            setSelectedCategory(categories[0]._id);
        }
    }, [categories]);

    const activeItems = (productsData ?? []).filter((item: any) =>
        !selectedCategory ? true : item.category?._id === selectedCategory
    );



    if (isCatLoading || isProdFirstLoad) return <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center",marginTop:hp(100) }}>
        <CustomLoader />
    </View>;

    return (
        <ShopItemsScreen
            barId={barId}
            venue={currentVenue ? {
                _id: currentVenue._id,
                name: currentVenue.name,
                logo: currentVenue.logo,
                address: currentVenue.address,
            } : undefined}
            categories={categories}
            items={activeItems}
            isProdLoading={isProdLoading}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            paths={{
                itemDetails: '/guest/item-details',
                shopDetails: '/guest/shop-details',
                checkout: '/guest/checkout',
            }}
        />
    );
}

// import { OrderTabIcon } from '@/assets/images/icons/icon';
// import BarCardComponents from '@/components/cardComponents/BarCardComponents';
// import ItemCard from '@/components/cardComponents/ItemCard';
// import SectionTitle from '@/components/SectionTitle';
// import { Body1, Body4, Caption1, Caption4 } from '@/components/typo/Typography';
// import { bars } from '@/constants/data/barData';
// import { Colors } from '@/constants/theme';
// import { hp, wp } from '@/utils/responsive';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import { FlatList, Platform, Image as RNImage, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// const ShopItems = () => {
//     const router = useRouter();
//     const insets = useSafeAreaInsets(); // Hook for precise spacing
//     const { barId } = useLocalSearchParams();

//     const [cart, setCart] = useState<{ [key: string]: number }>({});
//     const [showModal, setShowModal] = useState(false);

//     const barData = bars.find(b => b.id.toString() === barId) || bars[0];
//     const [selectedCategory, setSelectedCategory] = useState(barData.categories[0]?.id);
//     const activeItems = barData.categories.find(cat => cat.id === selectedCategory)?.items || [];

//     const handleAddToCart = (item: any) => {
//         setCart(prev => ({ ...prev, [item.id]: (prev[item.id] || 0) + 1 }));
//         setShowModal(true);
//     };

//     const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
//     const totalPrice = activeItems.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

//     return (
//         <SafeAreaView style={styles.container} edges={['top']}>
//             {/* Header Section */}
//             <View style={styles.headerWrapper}>
//                 <SectionTitle title='Shop Items' />
//             </View>

//             <FlatList
//                 data={activeItems}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <ItemCard
//                         item={item}
//                         isInCart={!!cart[item.id]}
//                         onAdd={() => handleAddToCart(item)}
//                         onPress={() => router.push({
//                             pathname: '/guest/item-details',
//                             params: {
//                                 itemId: item.id.toString(),
//                                 itemName: item.name,
//                                 barId: barId,
//                                 itemImg: typeof item.img === 'number'
//                                     ? item.img
//                                     : RNImage.resolveAssetSource(item.img).uri,
//                                 itemIngredients: item.ingredients.join(', '),
//                                 itemPrice: item.price.toString(),
//                                 itemStatus: item.status,
//                                 itemDescription: item.description
//                             }
//                         })}
//                     />
//                 )}
//                 ListHeaderComponent={
//                     <View>
//                         <BarCardComponents
//                             item={barData}
//                             onPress={() => router.push({
//                                 pathname: '/guest/shop-details',
//                                 params: { barId: barData.id }
//                             })}
//                         />

//                         <FlatList
//                             horizontal
//                             data={barData.categories}
//                             showsHorizontalScrollIndicator={false}
//                             keyExtractor={(cat) => cat.id.toString()}
//                             style={styles.tabList}
//                             contentContainerStyle={{ paddingRight: wp(20) }}
//                             renderItem={({ item: cat }) => (
//                                 <TouchableOpacity
//                                     onPress={() => setSelectedCategory(cat.id)}
//                                     style={[
//                                         styles.tab,
//                                         selectedCategory === cat.id && styles.activeTab
//                                     ]}
//                                 >
//                                     <Body1 color={selectedCategory === cat.id ? '#FFF' : Colors.OTP_COLOR}>
//                                         {cat.name}
//                                     </Body1>
//                                 </TouchableOpacity>
//                             )}
//                         />
//                     </View>
//                 }
//                 contentContainerStyle={[
//                     styles.listContent,
//                     { paddingBottom: showModal ? 120 : 40 } // Dynamic padding so modal doesn't hide items
//                 ]}
//                 showsVerticalScrollIndicator={false}
//             />

//             {/* --- Checkout Modal --- */}
//             {showModal && totalItems > 0 && (
//                 <View style={[
//                     styles.modalOverlay,
//                     { bottom: Platform.OS === 'ios' ? insets.bottom + 10 : "8%" }
//                 ]}>
//                     <View style={styles.modalContent}>
//                         <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
//                             <View style={styles.cartBadge}>
//                                 <OrderTabIcon />
//                             </View>
//                             <View>
//                                 <Body4 color="#FFF" style={{ marginBottom: 2 }}>{totalItems} Items</Body4>
//                                 <Caption1 color="#1D1733" style={styles.priceText}>${totalPrice}</Caption1>
//                             </View>
//                         </View>

//                         <TouchableOpacity
//                             style={styles.checkoutBtn}
//                             onPress={() => router.push({
//                                 pathname: "/guest/checkout",
//                                 params: {
//                                     cartData: JSON.stringify(cart),
//                                     barId: barId
//                                 }
//                             })}
//                         >
//                             <Caption4 color="#1D1733">Checkout</Caption4>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             )}
//         </SafeAreaView>
//     );
// };

// export default ShopItems;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.APP_BACKGROUND,
//     },
//     headerWrapper: {
//         paddingBottom: hp(16)
//     },
//     tabList: {
//         marginBottom:hp(16),
//     },
//     tab: {
//         paddingHorizontal: wp(20),
//         paddingVertical: hp(7),
//         borderRadius: 100,
//         backgroundColor: Colors.INPUT_BACKGROUND,
//         marginRight: wp(10),
//         borderWidth: 1,
//         borderColor: Colors.BORDER_COLOR,
//     },
//     activeTab: {
//         backgroundColor: Colors.BRAND_PRIMARY || '#A020F0',
//         borderColor: Colors.BRAND_PRIMARY || '#A020F0',
//     },
//     listContent: {
//         paddingHorizontal: wp(20),
//     },
//     modalOverlay: {
//         position: 'absolute',
//         left: wp(20),
//         right: wp(20),
//         backgroundColor: Colors.BRAND_PRIMARY,
//         borderRadius: 100,
//         padding: 20, // Slightly reduced to fit better
//         borderWidth: 1.5,
//         borderColor: Colors.NEUTRAL0,
//         // Shadow for both platforms
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 4.65,
//         elevation: 8,
//     },
//     modalContent: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     cartBadge: {
//         width: 40,
//         height: 40,
//         borderRadius: 10,
//         borderWidth: 0.8,
//         borderColor: Colors.NEUTRAL0,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     checkoutBtn: {
//         backgroundColor: Colors.NEUTRAL0,
//         paddingHorizontal: wp(20),
//         paddingVertical: hp(12),
//         borderRadius: 100,
//     },
//     priceText: {
//         fontSize: 16,
//         fontWeight: '800'
//     }
// });