import SectionTitle from '@/components/SectionTitle';
import { DetailsCardComponents } from '@/components/cardComponents/DetailsCardComponents';
import { bars } from '@/constants/data/barData';
import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native'; // Added Platform
import { SafeAreaView } from 'react-native-safe-area-context';

const ShopDetails = () => {
    const router = useRouter();
    const { barId } = useLocalSearchParams();

    const barData = bars.find(b => b.id.toString() === barId) || bars[0];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Header - Added padding wrapper for consistency */}
            <View style={styles.headerWrapper}>
                <SectionTitle title='Shop Details ' />
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollContent}
                bounces={true} // Natural feel for iOS
            >
                {/* Bar Logo */}
                <View style={styles.logoWrapper}>
                    <Image source={barData.logo} style={styles.logo} contentFit="contain" />
                </View>

                {/* Details Cards */}
                <View style={styles.detailsList}>
                    <DetailsCardComponents
                        topLabel="Bar Name"
                        bottomLabel={barData.name}
                    />
                    <DetailsCardComponents
                        topLabel="Owner Name"
                        bottomLabel={barData.owner.name}
                    />
                    <DetailsCardComponents
                        topLabel="Contact Email"
                        bottomLabel={barData.owner.email}
                    />
                    <DetailsCardComponents
                        topLabel="Contact Number"
                        bottomLabel={barData.owner.phone}
                    />
                    <DetailsCardComponents
                        topLabel="Location"
                        bottomLabel={barData.location}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ShopDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    headerWrapper: {
        // paddingVertical: Platform.OS === 'ios' ? 10 : 0, 
    },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: hp(40),
        paddingHorizontal: wp(20),
    },
    logoWrapper: {
        width: 120, // Slightly larger for better visibility on high-res screens
        height: 120,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp(24),
        overflow: 'hidden',
        // Platform Shadow
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    detailsList: {
        width: '100%',
    },
});