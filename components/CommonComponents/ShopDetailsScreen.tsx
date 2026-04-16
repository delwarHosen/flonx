
import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
import { Image } from 'expo-image';
import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionTitle from '../SectionTitle';
import { DetailsCardComponents } from '../cardComponents/DetailsCardComponents';

interface ShopDetailsScreenProps {
    name: string;
    logo: any;
    ownerName?: string;
    email?: string;
    phone?: string;
    address?: string;
}

const ShopDetailsScreen: React.FC<ShopDetailsScreenProps> = ({
    name, logo, ownerName, email, phone, address,
}) => {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.headerWrapper}>
                <SectionTitle title='Shop Details' />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                bounces={true}
            >
                <View style={styles.logoWrapper}>
                    <Image
                        source={typeof logo === 'string' ? { uri: logo } : logo}
                        style={styles.logo}
                        contentFit="cover"
                    />
                </View>

                <View style={styles.detailsList}>
                    <DetailsCardComponents topLabel="Bar Name" bottomLabel={name} />
                    <DetailsCardComponents topLabel="Owner Name" bottomLabel={ownerName || 'N/A'} />
                    <DetailsCardComponents topLabel="Contact Email" bottomLabel={email || 'N/A'} />
                    <DetailsCardComponents topLabel="Contact Number" bottomLabel={phone || 'N/A'} />
                    <DetailsCardComponents topLabel="Location" bottomLabel={address || 'N/A'} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ShopDetailsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
    headerWrapper: { paddingVertical: Platform.OS === 'ios' ? hp(10) : hp(10) },
    scrollContent: {
        alignItems: 'center',
        paddingBottom: hp(40),
        paddingHorizontal: wp(20),
    },
    logoWrapper: {
        width: 120,
        height: 120,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp(24),
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.BRAND_PRIMARY,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.1,
                shadowRadius: 4
            },
            android: { elevation: 3 },
        }),
    },
    logo: {
        width: '100%',
        height: '100%',
       
    },
    detailsList: { width: '100%' },
});