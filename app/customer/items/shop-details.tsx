import SectionTitle from '@/components/SectionTitle';
import { DetailsCardComponents } from '@/components/cardComponents/DetailsCardComponents';
import { bars } from '@/constants/data/barData';
import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ShopDetails = () => {
    const router = useRouter();
    const { barId } = useLocalSearchParams();


    const barData = bars.find(b => b.id.toString() === barId) || bars[0];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={{paddingVertical:hp(16)}}>
                <SectionTitle title='Shop Details ' />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
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
   
    scrollContent: {
        alignItems: 'center',
        // paddingBottom: 40,
        paddingHorizontal: wp(20),
    },
    logoWrapper: {
        width: wp(100),
        height: 100,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: 30,
        marginBottom:hp(16),
        overflow: 'hidden',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    detailsList: {
        width: '100%',
    },
});