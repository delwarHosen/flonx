import { StarIcon } from '@/assets/images/icons/BarRelatedIcon/StarIcon';
import { DetailsCardComponents } from '@/components/cardComponents/DetailsCardComponents';
import { CustomButton } from '@/components/CustomButton';
import CustomLoader from '@/components/CustomLoader';
import SectionTitle from '@/components/SectionTitle';
import { Body1, Body2, Body3, Caption2 } from '@/components/typo/Typography';
import { IMAGE_COMPONENTS } from '@/constants/image.index';
import { Colors } from '@/constants/theme';
import { useGetProfileQuery } from '@/redux/services/authApi';
import { useGetBartenderByIdQuery } from '@/redux/services/bartenderApi';
import { useAddRatingMutation } from '@/redux/services/jobApi';
import { hp, wp } from '@/utils/responsive';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ApplicantProfileDetails = () => {
    const { bartenderId, jobId, existingRating } = useLocalSearchParams<{
        bartenderId: string;
        jobId: string;
        existingRating: string;
    }>();
    // const router = useRouter()
    const [modalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [isRated, setIsRated] = useState(!!existingRating && Number(existingRating) > 0);
    const [myRating, setMyRating] = useState(Number(existingRating) || 0);

    console.log("existingRating param:", existingRating);
    console.log("isRated initial:", !!existingRating && Number(existingRating) > 0);

    const { data: bartender, isLoading } = useGetBartenderByIdQuery(
        bartenderId, { skip: !bartenderId }
    );

    // console.log("bardender Details:", bartender)

    const { data: profile } = useGetProfileQuery({});
    // console.log("customer id:", profile?._id);
    // ratting endpoinds
    const [addRating, { isLoading: isRatingLoading }] = useAddRatingMutation();

    // console.log("bartenderId:", bartenderId);
    // console.log("rating:", rating);

    const applicant = bartender ? {
        id: bartender._id,
        name: bartender.name,
        email: bartender.email,
        phone: bartender.phone ?? '—',
        profileImg: bartender.profile_image?.trim()
            ? bartender.profile_image
            : IMAGE_COMPONENTS.profileImg,
        experience: bartender.experience ?? 'N/A',
        totalJobs: bartender.totalCompletedJob ?? 0,
        rating: bartender.averageRating ?? 0,
        reviewCount: bartender.totalRatings ?? 0,
        bio: bartender.bio ?? 'No bio available',
    } : null;

    // console.log("profile_image:", bartender?.profile_image);
    // console.log("profile_image trimmed:", bartender?.profile_image?.trim());
    // console.log("full bartender data:", JSON.stringify(bartender, null, 2));
    // console.log("jobId param:", jobId);
    // console.log("bartenderId param:", bartenderId);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <CustomLoader size={40} />
            </View>
        );
    }

    if (!applicant) {
        return (
            <SafeAreaView style={styles.container}>
                <Body2 color={Colors.NEUTRAL0} style={{ textAlign: 'center', marginTop: 50 }}>
                    Applicant profile not found!
                </Body2>
            </SafeAreaView>
        );
    }



    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginVertical: hp(16) }}>
                <SectionTitle title='Applicant details' />
            </View>
            <ScrollView contentContainerStyle={{ padding: "5%", alignItems: 'center' }}>
                <View style={styles.imgWrapper}>
                    <Image
                        source={
                            bartender?.profile_image?.trim()
                                ? { uri: bartender.profile_image }
                                : IMAGE_COMPONENTS.profileImg
                        }
                        style={styles.profileImg}
                    // contentFit="cover"
                    />
                </View>

                <View style={{ width: '100%', marginTop: hp(10) }}>
                    <DetailsCardComponents topLabel="Name" bottomLabel={applicant?.name ?? '—'} />
                    <DetailsCardComponents topLabel="Email" bottomLabel={applicant?.email ?? '—'} />
                    <DetailsCardComponents topLabel="Contact Phone" bottomLabel={applicant?.phone ?? '—'} />
                    <DetailsCardComponents topLabel="Experience" bottomLabel={applicant?.experience ?? '—'} />
                    <DetailsCardComponents topLabel="Total Jobs Completed" bottomLabel={applicant?.totalJobs?.toString() ?? '—'} />
                    <DetailsCardComponents topLabel="Bio" bottomLabel={applicant?.bio ?? '—'} />

                    <View style={styles.fieldBox}>
                        <Caption2 color={Colors.PLACEHOLLDER_TEXT}>Overall Rating</Caption2>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                            <StarIcon color='#FFB020' />
                            <Body2 color={Colors.NEUTRAL0} style={{ marginLeft: wp(6) }}>
                                {applicant.rating} ({applicant.reviewCount})
                            </Body2>
                        </View>
                    </View>

                    {isRated ? (
                        <View style={styles.ratingDisplayContainer}>
                            <StarIcon color={Colors.COLOR_ORANGE} size={14} />
                            <Body3 color={Colors.NEUTRAL0} style={{ marginLeft: wp(8) }}>
                                {myRating}.0 / 5
                            </Body3>
                        </View>
                    ) : (
                        <CustomButton
                            onPress={() => setModalVisible(true)}
                            title='Leave A Rating'
                            width="100%"
                            height={hp(44)}
                            borderRadius={100}
                            style={{ marginTop: hp(10) }}
                        />
                    )}
                </View>
            </ScrollView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Body1 color={Colors.NEUTRAL0}>- Rate the Applicant</Body1>
                        <Body2 color={Colors.NEUTRAL0} style={{ marginTop: hp(10), marginBottom: hp(20) }}>
                            Select a star to provide rating
                        </Body2>

                        <View style={styles.starRow}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => setRating(star)} style={{ padding: 4 }}>
                                    <StarIcon
                                        color={star <= rating ? Colors.COLOR_ORANGE : Colors.PLACEHOLLDER_TEXT}
                                        size={28}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.modalActions}>
                            <CustomButton
                                onPress={() => { setModalVisible(false); setRating(0); }}
                                title='Cancel'
                                width="90%"
                                height={hp(44)}
                                borderRadius={100}
                                color={Colors.COLOR_DANGER}
                                backgroundColor={"transparent"}
                                borderColor={Colors.COLOR_DANGER}
                                style={{ marginTop: 0 }}
                            />
                            <CustomButton
                                onPress={async () => {

                                    if (rating === 0) return;
                                    try {
                                        const result = await addRating({
                                            bartender: bartenderId,
                                            job: jobId,
                                            rating: rating,
                                        }).unwrap();

                                        // console.log("Rating success:", result);
                                        setIsRated(true);
                                        setMyRating(rating);
                                        setModalVisible(false);

                                    } catch (error: any) {
                                        console.log("Rating error:", JSON.stringify(error, null, 2));
                                        setModalVisible(false);
                                        if (
                                            error?.data?.message?.includes('already exists') ||
                                            error?.data?.message?.includes('duplicate')
                                        ) {
                                            setIsRated(true);
                                            setMyRating(rating);
                                        }
                                    }
                                }}
                                title={isRatingLoading ? 'Submitting' : 'Submit'}
                                width="90%"
                                height={hp(44)}
                                borderRadius={100}
                                style={{ marginTop: 0 }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND
    },
    imgWrapper: {
        width: 100,
        height: 100,
        borderRadius: 20,
        backgroundColor: Colors.INPUT_BACKGROUND,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.BRAND_PRIMARY
    },
    profileImg: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.INPUT_BACKGROUND
    },
    ratingDisplayContainer: {
        width: '100%',
        height: hp(44),
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(10),
    },
    fieldBox: {
        width: '100%',
        backgroundColor: Colors.INPUT_BACKGROUND,
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        width: '85%',
        backgroundColor: Colors.INPUT_BACKGROUND,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR
    },
    starRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: hp(30)
    },
    modalActions: {
        flexDirection: "row"
    },
});

export default ApplicantProfileDetails;