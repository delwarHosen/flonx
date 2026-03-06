import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StarIcon } from '@/assets/images/icons/BarRelatedIcon/StarIcon';
import { DetailsCardComponents } from '@/components/cardComponents/DetailsCardComponents';
import { CustomButton } from '@/components/CustomButton';
import SectionTitle from '@/components/SectionTitle';
import { Body1, Body2 } from '@/components/typo/Typography';
import { jobPosts } from '@/constants/data/jobPosts';
import { Colors } from '@/constants/theme';

const ApplicantProfileDetails = () => {
    const { applicantId, jobId } = useLocalSearchParams<{ applicantId: string, jobId: string }>();
    const [modalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [isRated, setIsRated] = useState(false);

    const job = jobPosts.find(j => j.id === jobId);
    const applicant = job?.assignedTo?.id === applicantId
        ? job.assignedTo
        : job?.applicants.find(a => a.id === applicantId);

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
            <SectionTitle title='Applicant details' />
            <ScrollView contentContainerStyle={{ padding: "5%", alignItems: 'center' }}>
                <View style={styles.imgWrapper}>
                    <Image source={applicant.profileImg} style={styles.profileImg} />
                </View>

                <View style={{ width: '100%', marginTop: 10 }}>
                    <DetailsCardComponents topLabel="Name" bottomLabel={applicant.name} />
                    <DetailsCardComponents topLabel="Email" bottomLabel={applicant.email} />
                    <DetailsCardComponents topLabel="Contact Phone" bottomLabel={applicant.phone} />
                    <DetailsCardComponents
                        topLabel="Overall Rating"
                        bottomLabel={`${applicant.rating} (${applicant.reviewCount})`}
                    />
                    <DetailsCardComponents topLabel="Experience" bottomLabel={applicant.experience} />
                    <DetailsCardComponents topLabel="Total Jobs Completed" bottomLabel={applicant.totalJobs.toString()} />

                    
                    {isRated ? (
                        <View style={styles.ratingDisplayContainer}>
                            <StarIcon color={Colors.COLOR_ORANGE} size={20} />
                            <Body1 color={Colors.NEUTRAL0} style={{ marginLeft: 8 }}>
                                {rating}.0 / 5
                            </Body1>
                        </View>
                    ) : (
                        job?.status === 'Completed' ? (
                            <CustomButton
                                onPress={() => setModalVisible(true)}
                                title='Leave A Rating'
                                width="100%"
                                height={44}
                                borderRadius={100}
                                style={{ marginTop: 10 }}
                            />
                        ) : (
                            <CustomButton
                                onPress={() => console.log("Assigned")}
                                title='Accept & Assign Job'
                                width="100%"
                                height={44}
                                borderRadius={100}
                                style={{ marginTop: 10 }}
                            />
                        )
                    )}
                </View>
            </ScrollView>

            {/* Rating Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Body1 color={Colors.NEUTRAL0}>- Rate the Applicant</Body1>
                        <Body2 color={Colors.NEUTRAL0} style={{ marginTop: 10, marginBottom: 20, fontWeight: 500 }}>
                            Select a star to provide rating
                        </Body2>

                        <View style={styles.starRow}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                    <StarIcon
                                        color={star <= rating ? Colors.COLOR_ORANGE : Colors.NEUTRAL0}
                                        size={24}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.modalActions}>
                            <CustomButton
                                onPress={() => { setModalVisible(false); setRating(0); }}
                                title='Cancel'
                                width="90%"
                                height={44}
                                borderRadius={100}
                                color={Colors.COLOR_DANGER}
                                backgroundColor={"transparent"}
                                borderColor={Colors.COLOR_DANGER}
                            />

                            <CustomButton
                                onPress={() => {
                                    console.log("Rated:", rating);
                                    setIsRated(true); 
                                    setModalVisible(false);
                                }}
                                title='Submit'
                                width="90%"
                                height={44}
                                borderRadius={100}
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
        borderColor: Colors.BORDER_COLOR
    },
    profileImg: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.INPUT_BACKGROUND
    },

    ratingDisplayContainer: {
        width: '100%',
        height: 54,
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },

    // Modal Styles
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
        marginBottom: 30
    },
    modalActions: {
        flexDirection: "row"
    },

});

export default ApplicantProfileDetails;