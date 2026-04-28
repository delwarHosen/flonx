import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StarIcon } from '@/assets/images/icons/BarRelatedIcon/StarIcon';
import CustomLoader from '@/components/CustomLoader';
import SectionTitle from '@/components/SectionTitle';
import { Body2, Caption1 } from '@/components/typo/Typography';
import { IMAGE_COMPONENTS } from '@/constants/image.index';
import { Colors } from '@/constants/theme';
import { useGetJobApplicantsQuery } from '@/redux/services/jobApi';
import { hp, wp } from '@/utils/responsive';

const ApplicantsList = () => {
    const { jobId } = useLocalSearchParams<{ jobId: string }>();
    // console.log("jobId received:", jobId);

    const { data: applicants = [], isLoading } = useGetJobApplicantsQuery(jobId, { skip: !jobId });
    console.log("applicants data:", applicants);

    const renderApplicantCard = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({
                pathname: '/customer/gigs-related/applicant-details',
                params: { applicantId: item.bartender._id, jobId, applicationId: item._id }
            })}
        >
            <View style={styles.cardLeft}>
                <Image
                    source={
                        item.bartender.profile_image && item.bartender.profile_image.trim() !== ''
                            ? { uri: item.bartender.profile_image }
                            : IMAGE_COMPONENTS.profileImg
                    }
                    style={styles.avatar}
                    contentFit="cover"
                />
                <View style={styles.info}>
                    <Body2 color={Colors.NEUTRAL0}>{item.bartender.name}</Body2>
                    <View style={styles.ratingRow}>
                        <StarIcon color='#FFB020' />
                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={{ marginLeft: 4 }}>
                            {item.bartender.avgRating.toFixed(2) ?? '4.5'} ({item.bartender.totalRatingCount ?? 5})
                        </Caption1>
                    </View>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.PLACEHOLLDER_TEXT} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={{ paddingTop: hp(16) }}>
                <SectionTitle title="Applicants" />
            </View>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <CustomLoader size={40} />
                </View>
            ) : (
                <FlatList
                    data={applicants}
                    renderItem={renderApplicantCard}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <Body2 color={Colors.PLACEHOLLDER_TEXT} style={styles.emptyText}>
                            No applicants found for this job.
                        </Body2>
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    listContent: {
        padding: 20,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.INPUT_BACKGROUND,
        padding: 10,
        borderRadius: 12,
        marginBottom: hp(12),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.BRAND_PRIMARY,
    },
    info: {
        marginLeft: wp(12),
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(5),
    },
    emptyText: {
        textAlign: 'center',
        marginTop: hp(50),
    }
});

export default ApplicantsList;