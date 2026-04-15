
import ShopDetailsScreen from '@/components/CommonComponents/ShopDetailsScreen';
import CustomLoader from '@/components/CustomLoader';
import { Colors } from '@/constants/theme';
import { useGetAllVenuesQuery } from '@/redux/services/venueApi';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function CustomerShopDetails() {
    const { barId } = useLocalSearchParams();
    const { data: venuesData, isLoading } = useGetAllVenuesQuery({});
    const barData = venuesData?.result?.find((v: any) => v._id === barId);

    if (isLoading) return <CustomLoader size={50} />;
    if (!barData) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: Colors.NEUTRAL0 }}>Venue not found!</Text>
        </View>
    );

    return (
        <ShopDetailsScreen
            name={barData.name}
            logo={barData.logo}
            ownerName={barData.venueOwner?.name}
            email={barData.email || barData.venueOwner?.email}
            phone={barData.phone || barData.venueOwner?.phone}
            address={barData.address}
        />
    );
}
