import { MinusIcon } from '@/assets/images/icons/BarRelatedIcon/MinusIcon';
import { PlusIcon } from '@/assets/images/icons/BarRelatedIcon/PlusIcon';
import { OrderTabIcon } from '@/assets/images/icons/icon';
import { CustomButton } from '@/components/CustomButton';
import SectionTitle from '@/components/SectionTitle';
import { ButtonText, Caption1, H5, H6 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ItemDetails = () => {
    const { itemName, itemImg, itemIngredients, itemPrice, itemStatus } = useLocalSearchParams<{
        itemName: string;
        itemImg: string;
        itemIngredients: string;
        itemPrice: string;
        itemStatus: string;
    }>();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => setQuantity(prev => prev + 1);
    const handleRemove = () => quantity > 1 && setQuantity(prev => prev - 1);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header - No changes to SectionTitle */}
            <View >
                <SectionTitle title='Item Details' />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                {/* Image Section - Floating half outside the card */}
                <View style={styles.imageWrapper}>
                    <Image
                        source={typeof itemImg === 'string' && !isNaN(Number(itemImg))
                            ? Number(itemImg)
                            : { uri: itemImg as string }}
                        style={styles.mainImage}
                        contentFit="contain"
                    />
                    {/* <Image
                        source={ require('../../assets/images/Mojito.png')}
                        style={styles.mainImage}
                        contentFit="contain"
                    /> */}
                </View>

                {/* Info Card - Pulling up with negative margin */}
                <View style={styles.infoCard}>
                    <H5 color={Colors.NEUTRAL0} style={styles.title}>{itemName}</H5>
                    <Caption1 italic color={Colors.OTP_COLOR} style={{ marginBottom: 6 }}>
                        {itemIngredients || "No ingredients listed"}
                    </Caption1>

                    <View style={[
                        styles.statusBadge,
                        { backgroundColor: itemStatus === 'in_stock' ? '#22C55E33' : '#EF444433' }
                    ]}>
                        <View style={[
                            styles.dot,
                            { backgroundColor: itemStatus === 'in_stock' ? Colors.COLOR_ACTIVE : Colors.COLOR_DANGER }
                        ]} />
                        <Caption1 color={itemStatus === 'in_stock' ? Colors.COLOR_ACTIVE : Colors.COLOR_DANGER}>
                            {itemStatus === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                        </Caption1>
                    </View>

                    {/* Quantity Row - Using your CustomButton as is */}
                    <View style={styles.quantityRow}>
                        <CustomButton
                            onPress={handleAdd}
                            icon={<PlusIcon />}
                            width={56}
                            height={56}
                            borderRadius={100}
                        />

                        <H6 color={Colors.NEUTRAL0} style={styles.qtyText}>{quantity}</H6>

                        <CustomButton
                            onPress={handleRemove}
                            icon={<MinusIcon />}
                            width={56}
                            height={56}
                            borderRadius={100}
                        />
                    </View>

                    {/* Add to Cart - Using your CustomButton as is */}
                    <View style={{ width: "100%", marginTop: 32 }}>
                        <CustomButton
                            title=""
                            onPress={() => { }}
                            width="100%"
                            height={44}
                            borderRadius={100}
                            icon={
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <OrderTabIcon />
                                    <ButtonText color={Colors.NEUTRAL0}>Add To Cart</ButtonText>
                                </View>
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ItemDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND
    },
    imageWrapper: {
        height: 250,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    mainImage: {
        width: 220,
        height: 220,
        marginTop: 50,
        borderWidth:1,
        borderColor:Colors.BORDER_COLOR,
        borderRadius:20
    },
    infoCard: {
        flex: 1,
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center',
        paddingTop: "40%",
        paddingHorizontal: 20,
        marginTop: -100,
    },
    title: {
        marginBottom: 12
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#152C26',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        marginTop: 10
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.COLOR_ACTIVE
        , marginRight: 6
    },
    quantityRow: {
        flexDirection: 'row', alignItems: 'center',
    },
    qtyText: {marginHorizontal: 35,
        marginTop:16
     },

});