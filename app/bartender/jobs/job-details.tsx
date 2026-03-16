import { JobsBagIcon } from '@/assets/images/icons/BarRelatedIcon/JobsBagIcon';
import { StarIcon } from '@/assets/images/icons/BarRelatedIcon/StarIcon';
import { WarningIcon } from '@/assets/images/icons/ProfileInfoIcons/WarningIcon';

import { DetailsCardComponents } from '@/components/cardComponents/DetailsCardComponents';
import { StatusInfoCard } from '@/components/cardComponents/StatusInfoCard';
import { ConfirmationModal } from '@/components/ConfirmationModalProps';
import { CustomButton } from '@/components/CustomButton';
import CustomLoader from '@/components/CustomLoader';
import SectionTitle from '@/components/SectionTitle';
import { Body1, Body2, Body3, Caption1, Caption2 } from '@/components/typo/Typography';
import { getJobs } from '@/constants/data/getJobs';

import { Colors } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const JobDetails = () => {
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    // Added a separate state for Cancel Assignment Modal
    const [showCancelAssignmentModal, setShowCancelAssignmentModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const { id, initialTab } = useLocalSearchParams<{ id: string; initialTab: string }>();
    const item = getJobs.find(j => j.id === id);

    if (!item) return null;

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

    const statusColors = getStatusColors(item.status);


    const confirmComplete = () => {
        setShowCompleteModal(false);
        setTimeout(async () => {
            setLoading(true);
            try {
                // API Call logic here
                await new Promise(resolve => setTimeout(resolve, 1000));
                router.back();
            } catch (error) {
                setLoading(false);
            }
        }, 300);
    };


    const confirmCancelAssignment = () => {
        setShowCancelAssignmentModal(false); // Update to specific assignment state
        setShowCancelModal(false); // For Application cancel
        setTimeout(async () => {
            setLoading(true);
            try {
                // API Call logic here
                await new Promise(resolve => setTimeout(resolve, 1000));
                router.back();
            } catch (error) {
                setLoading(false);
            }
        }, 300);
    };




    const renderBottomSection = () => {
        switch (initialTab) {

            // ─── 1st Page: Open ──────────
            case 'open':
                return (
                    <>

                        <StatusInfoCard
                            label="Applied on"
                            value={item.appliedOn}
                            statusText="Applied"
                            // statusColors={statusColors}
                            statusColor={"#FFB020"}
                            statusBg={"#FFB02033"}
                        />

                        <CustomButton
                            onPress={() => setShowCancelModal(true)}
                            title='Cancel Application'
                            width={'100%'}
                            height={44}
                            borderRadius={100}
                            style={{ marginTop: 12 }}
                            backgroundColor={Colors.COLOR_DANGER}
                        />

                    </>
                );

            // ─── 2nd Page: Assigned ───────────────────────────────────────
            case 'assigned':
                return (
                    <>

                        <StatusInfoCard
                            label="Assignment on"
                            value={item.assignedOn}
                            statusText="Assigned"
                            // statusColors={statusColors}
                            statusColor={"#22C55E"}
                            statusBg={"#22C55E33"}
                        />

                        <View style={{ marginBottom: 24 }}>
                            <CustomButton
                                onPress={() => setShowCancelAssignmentModal(true)}
                                title='Cancel Assignment'
                                width={'100%'}
                                height={44}
                                borderRadius={100}
                                backgroundColor={'#EF4444'}
                                style={{ marginTop: 12 }}
                            />
                        </View>
                    </>
                );

            // ─── 3rd Page: Completed ──────────────────────────────────────
            case 'completed':
                return (
                    <>
                        <StatusInfoCard
                            label="Assignment on"
                            value={item.completedOn}
                            statusText="Assigned"
                            // statusColors={statusColors}
                            statusColor={"#3D8BFF"}
                            statusBg={"#3D8BFF33"}
                        />


                        <View style={[styles.buttonContainer]}>
                            <View >
                                <Caption2 style={{ marginBottom: 12 }} color={Colors.PLACEHOLLDER_TEXT}>Your Rating</Caption2>
                                <View style={{ flexDirection: "row", gap: 5 }}>
                                    {item?.applicants?.[0]?.rating ? (
                                        <>
                                            <StarIcon color="#FFB020" />
                                            <Body3 color={Colors.NEUTRAL0} style={{ lineHeight: 20 }}>
                                                {item.applicants[0].rating}/5
                                            </Body3>
                                        </>
                                    ) : (
                                        <Body3 color={Colors.NEUTRAL0} style={{ lineHeight: 20 }}>
                                            Not Rated
                                        </Body3>
                                    )}
                                </View>
                            </View>
                        </View>

                    </>
                );

            // ─── 4th Page: Cancelled ──────────────────────────────────────
            case 'cancelled':
                return (
                    <>


                        <View style={{ marginBottom: 12, marginTop: 16, }}>
                            <DetailsCardComponents
                                topLabel="Cancelled By"
                                bottomLabel={item.cancelledBy ?? '—'}
                            />

                            <DetailsCardComponents
                                topLabel="Cancelled On"
                                bottomLabel={item.cancelledOn ?? '—'}
                            />
                        </View>


                    </>
                );

            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

            {/* Loader */}
            {loading && (
                <View style={[StyleSheet.absoluteFill, {
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 999
                }]}>
                    <CustomLoader size={55} />
                </View>
            )}


            {/* Back Header */}
            <View style={{ paddingTop: "4%" }}>
                <SectionTitle title='Job Details' />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <Body1 color={Colors.NEUTRAL0} italic style={styles.title}>{item.title}</Body1>
                <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
                    <View style={[styles.dot, { backgroundColor: statusColors.text }]} />
                    <Caption1 color={statusColors.text}>{item.status}</Caption1>
                </View>

                <GigBasicDetails item={item} />

                <PaymentInfoCard item={item} />


                {renderBottomSection()}

            </ScrollView>


            {/* Mark Job as Complete Modal */}
            <ConfirmationModal
                visible={showCompleteModal}
                title="Mark Job as Complete?"
                description="Are you sure you want to mark this job as completed?"
                confirmText="Confirm"
                onCancel={() => setShowCompleteModal(false)}
                onConfirm={confirmComplete}
                icon={<WarningIcon size={28} />}
                confirmColor="#8B5CF6"
                confirmSecondaryColor="#A78BFA"
            />

            {/* Cancel Application Modal */}
            <ConfirmationModal
                visible={showCancelModal}
                title="Cancel Application?"
                description="Are you sure you want to cancel your application?You will no longer be considered for this job."
                confirmText="Confirm"
                onCancel={() => setShowCancelModal(false)}
                onConfirm={confirmCancelAssignment}
                icon={<WarningIcon size={28} />}
                confirmColor="#8B5CF6"
                confirmSecondaryColor="#A78BFA"
            />

            {/* Cancel Assignment Modal */}
            <ConfirmationModal
                visible={showCancelAssignmentModal}
                title="Cancel Assignment?"
                description="Are you sure you want to cancel this assignment?You will be removed from this job."
                confirmText="Yes, Cancel"
                onCancel={() => setShowCancelAssignmentModal(false)}
                onConfirm={confirmCancelAssignment}
                icon={<WarningIcon size={28} color="#EF4444" />}
                confirmColor="#822CE7"
                confirmSecondaryColor="#BB82FF"
            />
        </SafeAreaView>
    );
};



// ---- Gig details----->
const GigBasicDetails = ({ item }: { item: any }) => (
    <>
        <DetailsCardComponents topLabel="Location" bottomLabel={item.location} />
        <DetailsCardComponents topLabel="Date" bottomLabel={item.date} />
        <DetailsCardComponents topLabel="Time" bottomLabel={item.time} />
        <DetailsCardComponents topLabel="Contact Number" bottomLabel={item.contactNumber} />
        <DetailsCardComponents topLabel="Details" bottomLabel={item.details} />
    </>
);


// <----------Payment Card-------->

const PaymentInfoCard = ({ item }: { item: any }) => (
    <View style={styles.paymentCard}>
        <View style={styles.paymentTextcon}>
            <View style={styles.iconContainer}>
                <JobsBagIcon />
            </View>
            <Body2 italic color={Colors.NEUTRAL0}> Payment Info</Body2>
        </View>

        <View style={styles.payRow}>
            <Caption2 color={Colors.PLACEHOLLDER_TEXT}>Pay Rate (Per Hour)</Caption2>
            <Body2 color={Colors.NEUTRAL0}>${item.payRate?.toFixed(2)}</Body2>
        </View>
        <View style={styles.payRow}>
            <Caption2 color={Colors.PLACEHOLLDER_TEXT}>Total Duration</Caption2>
            <Body2 color={Colors.NEUTRAL0}>{item.totalDuration ?? '15 hours'}</Body2>
        </View>

        <View style={{ height: 1.5, backgroundColor: Colors.BORDER_COLOR, marginVertical: 16 }} />

        <View style={styles.payRow}>
            <Caption1 color={Colors.PLACEHOLLDER_TEXT}>Total Amount</Caption1>
            <Body2 color={Colors.NEUTRAL0}>$ {item.totalAmount ?? '375'}</Body2>
        </View>
    </View>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
        marginBottom: 20
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: Colors.INPUT_BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: "20%",
        paddingTop: 15
    },
    title: {
        marginBottom: 10,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        marginBottom: 16,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginRight: 6,
    },
    statusBadgeType: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginTop: 10,
        borderRadius: 100,
    },
    infoCard: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        marginTop: 16,
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentCard: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 12,
        padding: 14,
        marginTop: 16,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
    },
    paymentTextcon: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginBottom: 18
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
    paymentTitle: {
        // marginBottom: 12,
    },
    payRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    actionRow: {

        flexDirection: 'row',
        justifyContent: "center",
        gap: 10
    },
    buttonWrapper: {
        flex: 1,
    },
    applicantIconBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.BRAND_PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    assignedRow: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 12,
        padding: 14,
        marginTop: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    assignedLeft: {
        flex: 1,
    },
    assigneeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 8,
        backgroundColor: Colors.BORDER_COLOR,
        borderWidth: 1,
        borderColor: Colors.BRAND_PRIMARY
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    }
});

export default JobDetails;