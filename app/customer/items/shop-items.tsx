import ShopItemsScreen from '@/components/CommonComponents/ShopItemsScreen';
import CustomLoader from '@/components/CustomLoader';
import {
    useGetCategoriesByVenueQuery,
    useGetProductsByVenueQuery,
    useGetVenueByIdQuery,
} from '@/redux/services/venueApi';
import { RootState } from '@/redux/store';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

export default function CustomerShopItems() {
    const { barId } = useLocalSearchParams<{ barId: string }>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const token = useSelector((state: RootState) => state.auth.token);

    //  useGetVenueByIdQuery use koro — getAllVenues call kora expensive & unnecessary
    const { data: currentVenue } = useGetVenueByIdQuery(barId, {
        skip: !barId || !token,
    });

    const { data: categoryData, isLoading: isCatLoading } = useGetCategoriesByVenueQuery(barId, {
        skip: !barId || !token,
    });

    // categories response: { meta, result: [...] }
    const categories = categoryData?.result ?? [];

    // Auto-select first category
    useEffect(() => {
        if (categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0]._id);
        }
    }, [categories]);

    //  categoryId API-level e pass koro — client-side filter lagbe na
    const {
        data: productsData = [],
        isFetching,
        isLoading,
        refetch,
    } = useGetProductsByVenueQuery(
        { venueId: barId, categoryId: selectedCategory ?? undefined },
        {
            // skip when no barId OR no token — prevents "query not started" crash
            skip: !barId || !token,
        }
    );

    if (isCatLoading || isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CustomLoader size={40}/>
            </View>
        );
    }

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
            items={productsData}
            isLoading={isFetching}
            isProdLoading={isFetching}
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