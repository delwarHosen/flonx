import { Colors } from '@/constants/theme'
import { useCameraScanner } from '@/hooks/useCameraScanner'
import { useGetAllVenuesQuery } from '@/redux/services/venueApi'
import { hp, wp } from '@/utils/responsive'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BarCardComponents from '../cardComponents/BarCardComponents'
import CustomLoader from '../CustomLoader'
import EmptyStateCard from '../EmptyStateCardProps'
import QRScannerModal from '../QRScannerModal/QRScannerModal'
import { showToast } from '../Toast'
import SearchBar from './SearchBar'

interface VenueSearchProps {
    shopItemPath: '/customer/items/shop-items' | '/guest/shop-item';
    requireAuth: boolean;
}

const VenueSearch: React.FC<VenueSearchProps> = ({ shopItemPath }) => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const { checkPermission } = useCameraScanner();

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedQuery(query), 500);
        return () => clearTimeout(handler);
    }, [query]);

    const { data, isLoading, isFetching, refetch } = useGetAllVenuesQuery({
        searchTerm: debouncedQuery,
    });

    const venues = data?.result || [];

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const handleOpenScanner = async () => {
        const isAllowed = await checkPermission();
        if (isAllowed) setIsScannerOpen(true);
    };

    const onScanSuccess = (qrData: string) => {
        setIsScannerOpen(false);

        try {
            const segments = qrData.split('/').filter(Boolean);
            const barId = segments[segments.length - 1];

            if (barId) {
                router.push({
                    pathname: shopItemPath,
                    params: { barId },
                });
            } else {
                showToast("Error, Invalid QR Code");
            }
        } catch {
            showToast("Error, Could not read QR Code");
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

            <QRScannerModal
                isVisible={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScan={onScanSuccess}
            />

            <SearchBar
                placeholder="Search"
                value={query}
                onChangeText={setQuery}
                onScanPress={handleOpenScanner}
            />

            {(isLoading || (isFetching && !refreshing)) && !venues.length ? (
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                    <CustomLoader size={30} />
                </View>
            ) : (
                <FlatList
                    data={venues}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <BarCardComponents
                            item={{
                                name: item.name,
                                logo: item.logo,
                                status: 'open',
                                location: item.address,
                            }}
                            onPress={() => router.push({
                                pathname: shopItemPath,
                                params: { barId: item._id }
                            })}
                        />
                    )}
                    ListEmptyComponent={
                        !isFetching ? <EmptyStateCard message="No venues found" /> : null
                    }
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={Colors.BRAND_PRIMARY}
                            colors={[Colors.BRAND_PRIMARY]}
                        />
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default VenueSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp(20),
        backgroundColor: Colors.APP_BACKGROUND,
    },
    listContent: {
        paddingBottom: hp(40),
        paddingTop: hp(10),
    },
});