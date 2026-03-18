import { JobsBagIcon } from '@/assets/images/icons/BarRelatedIcon/JobsBagIcon';
import { LocationIcon } from '@/assets/images/icons/icon';
import { RightAngleIcon } from '@/assets/images/icons/ProfileInfoIcons/RightAngleIcon';
import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomButton } from '../CustomButton';
import { Body1, Body2, Body3, Caption2, Caption3 } from '../typo/Typography';

interface GigCardProps {
    item: any;
    onPress: () => void;
}

const GigCard = ({ item, onPress }: GigCardProps) => {

    const getStatusColors = (status: string) => {
        switch (status) {
            case 'Assigned':
                return { bg: '#22C55E33', text: '#22C55E' };
            case 'Completed':
                return { bg: '#3D8BFF33', text: '#3D8BFF' };
            case 'Cancelled':
                return { bg: '#EF444433', text: '#EF4444' };
            default:
                return { bg: '#FFB02033', text: Colors.COLOR_ORANGE };
        }
    };

    const tabMap: Record<string, string> = {
        'Open': 'open',
        'Assigned': 'assigned',
        'Completed': 'completed',
        'Cancelled': 'cancelled',
    };

    // const handlePress = () => {
    //     router.push({
    //         pathname: '/customer/gigs-related/gig-details',
    //         params: {
    //             id: item.id,
    //             initialTab: tabMap[item.status] ?? 'open',
    //         },
    //     });
    // };

    const statusColors = getStatusColors(item.status);

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <JobsBagIcon />
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
                    <View style={[styles.dot, { backgroundColor: statusColors.text }]} />
                    <Caption3 color={statusColors.text}>{item.status}</Caption3>
                </View>
            </View>

            <Body1 color={Colors.NEUTRAL0} style={styles.title}>{item.title}</Body1>
            <View style={styles.locationRow}>
                <LocationIcon />
                <Body3 color={Colors.PLACEHOLLDER_TEXT} style={{ marginLeft: wp(4) }}>
                    {item.location}
                </Body3>
            </View>

            <View style={styles.footer}>
                <View>
                    <Caption2 color={Colors.PLACEHOLLDER_TEXT}>Pay Rate (Per Hour)</Caption2>
                    <Body2 color={Colors.NEUTRAL0} style={{ marginTop: hp(8) }}>$ {item.payRate.toFixed(2)}</Body2>
                </View>

                <CustomButton
                    onPress={onPress}
                    icon={<RightAngleIcon color={Colors.NEUTRAL0} />}
                    width={100}
                    height={hp(44)}
                    title='View'
                    borderRadius={100}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 12,
        padding: 14,
        marginTop: hp(16),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(12),
    },
    iconContainer: {
        width: 24,
        height: 24,
        borderRadius: 6,
        padding: 4,
        backgroundColor: "#822CE733",
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFB02033',
        paddingHorizontal: wp(12),
        paddingVertical: hp(6),
        borderRadius: 100,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginRight: 4,
    },
    title: {
        marginBottom: hp(8),
        marginTop: hp(4)
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(20),
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: hp(16),
        borderTopWidth: 1,
        borderTopColor: Colors.BORDER_COLOR,
    },
});

export default GigCard;