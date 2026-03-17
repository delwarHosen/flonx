import { MinusIcon } from '@/assets/images/icons/BarRelatedIcon/MinusIcon';
import { PlusIcon } from '@/assets/images/icons/BarRelatedIcon/PlusIcon';
import { OrderTabIcon } from '@/assets/images/icons/icon';
import { CustomButton } from '@/components/CustomButton';
import SectionTitle from '@/components/SectionTitle';
import { Caption1, H5, H6 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ItemDetails = () => {
    const { itemName, itemImg, itemIngredients, itemPrice, itemStatus, barId, itemId } = useLocalSearchParams<{
        itemName: string;
        itemImg: string;
        itemIngredients: string;
        itemPrice: string;
        itemStatus: string;
        barId: string; // Add this
        itemId: string; // Add this
    }>();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => setQuantity(prev => prev + 1);
    const handleRemove = () => quantity > 1 && setQuantity(prev => prev - 1);

    // ItemDetails.tsx logic update
    const handleAddToCart = () => {
        if (!itemId) {
            console.error("Item ID is missing!");
            return;
        }

        // Checkout page expect korche object key (ID) : quantity (Value)
        const cartObject = {
            [itemId]: quantity
        };

        router.push({
            pathname: "/customer/items/checkout",
            params: {
                cartData: JSON.stringify(cartObject),
                barId: barId
            }
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.headerPadding}>
                <SectionTitle title='Item Details' />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.imageWrapper}>
                    <Image
                        source={typeof itemImg === 'string' && !isNaN(Number(itemImg))
                            ? Number(itemImg)
                            : { uri: itemImg as string }}
                        style={styles.mainImage}
                        contentFit="contain"
                    />
                </View>

                <View style={styles.infoCard}>
                    <H5 color={Colors.NEUTRAL0} style={styles.title}>{itemName}</H5>
                    <Caption1 italic color={Colors.OTP_COLOR} style={{ marginBottom: hp(6), textAlign: 'center' }}>
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

                    <View style={styles.quantityRow}>
                        <CustomButton
                            onPress={handleAdd}
                            icon={<PlusIcon />}
                            width={56}
                            height={56}
                            borderRadius={100}
                            color={Colors.NEUTRAL0}
                        />
                        <H6 color={Colors.NEUTRAL0} italic style={styles.qtyText}>{quantity}</H6>
                        <CustomButton
                            onPress={handleRemove}
                            icon={<MinusIcon />}
                            width={56}
                            height={56}
                            borderRadius={100}
                            color={Colors.NEUTRAL0}
                        />
                    </View>

                    <View style={styles.actionButtonContainer}>
                        <CustomButton
                            title=""
                            onPress={handleAddToCart}
                            width="100%"
                            height={hp(46)}
                            borderRadius={100}
                            icon={
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <OrderTabIcon />
                                    <Text style={{color:"white"}}>Add to Cart</Text>
                                    {/* <ButtonText color={Colors.NEUTRAL0}>Add To </ButtonText> */}
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
    headerPadding: {
        paddingVertical: Platform.OS === 'ios' ? 10 : hp(16)
    },
    imageWrapper: {
        height: 280,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    mainImage: {
        width: 220,
        height: 220,
        marginTop: hp(30),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        borderRadius: 20,
    },
    infoCard: {
        flex: 1,
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? "35%" : "30%",
        paddingHorizontal: 25,
        marginTop: -100,
        paddingBottom: 40
    },
    title: {
        marginBottom: hp(6),
        textAlign: 'center'
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(12),
        paddingVertical: hp(5),
        borderRadius: 20,
        marginTop: hp(10)
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(30)
    },
    qtyText: {
        marginHorizontal: wp(20),
        marginTop:hp(20)
    },
    actionButtonContainer: {
        width: "100%",
        marginTop: hp(40),
        paddingBottom: Platform.OS === 'ios' ? 20 : 0
    }
});