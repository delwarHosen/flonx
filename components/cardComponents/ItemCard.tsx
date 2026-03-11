import { PlusIcon } from '@/assets/images/icons/BarRelatedIcon/PlusIcon';
import { OrderTabIcon } from '@/assets/images/icons/icon';
import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../CustomButton';
import { Body1, Caption1, H6 } from '../typo/Typography';


interface ItemCardProps {
    item: {
        name: string;
        img: any;
        price: number;
        ingredients: string[];
    };
    onAdd?: () => void;
    isInCart?: boolean;
}


const ItemCard: React.FC<ItemCardProps & { onPress?: () => void }> = ({ item, onAdd, onPress,isInCart }) => {
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
            <Image source={item.img} style={styles.image} contentFit="cover" />

            <View style={styles.details}>
                <Body1 color={Colors.NEUTRAL0} >{item.name}</Body1>
                <Caption1 italic color={Colors.OTP_COLOR} style={styles.itemDetails} numberOfLines={1}>
                    {item.ingredients.join(', ')}
                </Caption1>
                <H6 color={Colors.NEUTRAL0} style={{marginTop:4}}>${item.price}</H6>
            </View>

            <View style={styles.addButton}>
                <CustomButton
                    onPress={onAdd ?? (() => { })}
                    icon={isInCart ? <OrderTabIcon /> : <PlusIcon />}
                    width={36}
                    height={36}
                    borderRadius={100}
                />
            </View>
        </TouchableOpacity>
    );
};

export default ItemCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 14,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
    image: {
        borderWidth: 1,
        borderColor: Colors.BRAND_PRIMARY,
        width: 68,
        height: 68,
        borderRadius: 16,
        backgroundColor: '#FFE4E1',
    },
    itemHeading: {
        fontWeight: 400,
        // marginBottom: 6
    },
    itemDetails: {
        fontSize: 13,
        // marginBottom: 6
    },
    details: {
        flex: 1,
        marginLeft: 15,
    },
    addButton: {
        marginTop: -50
    },
});