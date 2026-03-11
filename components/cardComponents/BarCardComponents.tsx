import { RightAngleIcon } from '@/assets/images/icons/ProfileInfoIcons/RightAngleIcon';
import { LocationIcon } from '@/assets/images/icons/icon';
import { Colors } from '@/constants/theme';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Caption2, Caption3, H6 } from '../typo/Typography';


interface BarCardProps {
    item: {
        name: string;
        logo: any;
        status: "open" | "close";
        location: string;
    };
    onPress?: () => void;
}

const BarCardComponents: React.FC<BarCardProps> = ({ item, onPress }) => {
    const isOpen = item.status === "open";

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
            {/* Left side: Logo */}
            <View style={styles.logoContainer}>
                <Image source={item.logo} style={styles.logo}
                    contentFit="contain"
                    cachePolicy="disk" />
            </View>

            {/* Center: Details */}
            <View style={styles.details}>
                <H6 color={Colors.NEUTRAL0} style={styles.name} numberOfLines={1}>{item.name}</H6>

                {/* Status Tag */}
                <View style={[styles.statusTag, { backgroundColor: isOpen ? '#22C55E33' : '#EF444433' }]}>
                    <View style={[styles.dot, { backgroundColor: isOpen ? Colors.COLOR_ACTIVE : Colors.COLOR_DANGER }]} />
                    <Caption3 color={isOpen ? Colors.COLOR_ACTIVE : Colors.COLOR_DANGER}>
                        {isOpen ? 'Open' : 'Closed'}
                    </Caption3>
                </View>

                {/* Location */}
                <View style={styles.locationContainer}>
                    <LocationIcon />

                    <Caption2 color={Colors.OTP_COLOR} style={styles.locationText} numberOfLines={1}>{item.location}</Caption2>
                </View>
            </View>

            {/* Right side: Arrow */}
            <RightAngleIcon />
        </TouchableOpacity>
    );
};

export default BarCardComponents;

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
    logoContainer: {
        width: 62,
        height: 62,
        borderRadius: 15,
        overflow: 'hidden',
    },
    logo: {
        borderWidth:1,
        borderColor:Colors.BRAND_PRIMARY,
        borderRadius:16,
        width: '100%',
        height: '100%',
    },
    details: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    name: {
        marginBottom: 4,
    },
    statusTag: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 6,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        // fontWeight: 400,
        marginLeft: 4,
    },
});