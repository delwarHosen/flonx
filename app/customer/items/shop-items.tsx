import ShopItemsScreen from '@/components/CommonComponents/ShopItemsScreen';
import CustomLoader from '@/components/CustomLoader';
import { useGetAllVenuesQuery, useGetCategoriesByVenueQuery, useGetProductsByVenueQuery } from '@/redux/services/venueApi';
import { RootState } from '@/redux/store';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

export default function CustomerShopItems() {
    const { barId } = useLocalSearchParams<{ barId: string }>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    // const reduxBarId = useSelector((state: RootState) => state.cart.barId);   // এটা add করো
    // const reduxCart = useSelector((state: RootState) => state.cart.items);

    const token = useSelector((state: RootState) => state.auth.token);

    const { data: venuesData } = useGetAllVenuesQuery({});
    const currentVenue = venuesData?.result?.find((v: any) => v._id === barId);

    const { data: categories, isLoading: isCatLoading } = useGetCategoriesByVenueQuery(barId, {
        skip: !barId || !token,
    });

    const {
        data: productsData,
        isFetching,
        isLoading,
        refetch
    } = useGetProductsByVenueQuery(
        { venueId: barId },
        {
            // skip when no barId OR no token — prevents "query not started" crash
            skip: !barId || !token,
        }
    );


    useEffect(() => {
        if (categories?.length && !selectedCategory) {
            setSelectedCategory(categories[0]._id);
        }
    }, [categories]);

    const activeItems = (productsData ?? []).filter((item: any) =>
        !selectedCategory ? true : item.category?._id === selectedCategory
    );

    if ((isLoading || isCatLoading) && !isFetching) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                <CustomLoader />
            </View>
        );
    }


    // console.log('reduxBarId:', reduxBarId, 'current barId:', barId, 'cart:', reduxCart);
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
            isLoading={isFetching}
            isProdLoading={false}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            refetch={refetch}
            paths={{
                itemDetails: '/customer/items/item-details',
                shopDetails: '/customer/items/shop-details',
                checkout: '/customer/items/checkout',
            }}
        />
    );
}