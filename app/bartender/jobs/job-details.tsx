import { JobsBagIcon } from '@/assets/images/icons/BarRelatedIcon/JobsBagIcon';
import { StarIcon } from '@/assets/images/icons/BarRelatedIcon/StarIcon';
import { WarningIcon } from '@/assets/images/icons/ProfileInfoIcons/WarningIcon';

import { DetailsCardComponents } from '@/components/cardComponents/DetailsCardComponents';
import { StatusInfoCard } from '@/components/cardComponents/StatusInfoCard';
import { ConfirmationModal } from '@/components/ConfirmationModalProps';
import { CustomButton } from '@/components/CustomButton';
import CustomLoader from '@/components/CustomLoader';
import SectionTitle from '@/components/SectionTitle';
import { showToast } from '@/components/Toast';
import { Body1, Body2, Body3, Caption1, Caption2 } from '@/components/typo/Typography';

import { Colors } from '@/constants/theme';
import { useCancelApplicationMutation, useCancelJobMutation, useGetSingleJobQuery } from '@/redux/services/jobApi';
import { hp, wp } from '@/utils/responsive';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const JobDetails = () => {
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    // Added a separate state for Cancel Assignment Modal
    const [showCancelAssignmentModal, setShowCancelAssignmentModal] = useState(false);
    // const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);

    const { id, applicationId, jobId, initialTab } = useLocalSearchParams<{
        id: string;
        applicationId: string;
        jobId: string;
        initialTab: string
    }>();

    const { currentData: item, isLoading, isFetching, refetch } = useGetSingleJobQuery(id, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    // console.log("Single data from job-details",item)

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    const [cancelApplication] = useCancelApplicationMutation();
    const [cancelJob] = useCancelJobMutation();



    // const item = getJobs.find(j => j.id === id);
    if (isLoading || (isFetching && !refreshing)) return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CustomLoader />
            </View>
        </SafeAreaView>
    );

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

    const statusColors = getStatusColors(item?.status);


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


    const confirmCancelApplication = async () => {
        setShowCancelModal(false);
        setLoading(true);
        try {
            const res = await cancelApplication(jobId).unwrap();
            showToast(res?.message || "Application cancelled successfully!", "success");
            router.back();
        } catch (error: any) {
            showToast(error?.data?.message || "Something went wrong!", "error");
        } finally {
            setLoading(false);
        }
    };


    // cancle applicatin which the customer was assigned me 
    const confirmCancelAssignment = () => {
        setShowCancelAssignmentModal(false);
        setTimeout(async () => {
            setLoading(true);
            try {
                const res = await cancelJob(jobId).unwrap();
                showToast(res?.message || "Assignment cancelled successfully", "success");
                setLoading(false);

                setTimeout(() => {
                    router.back();
                }, 100);

            } catch (error: any) {
                setLoading(false);
                const errorMsg = error?.data?.message || "Failed to cancel assignment";
                showToast(errorMsg, "error");
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
                            value={item.createdAt}
                            statusText="Applied"
                            statusColor={"#FFB020"}
                            statusBg={"#FFB02033"}
                        />
                        <CustomButton
                            onPress={() => setShowCancelModal(true)}
                            title='Cancel Job'
                            width={'100%'}
                            height={hp(44)}
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
                            label="Assigned on"
                            value={item.assignDate}
                            statusText="Assigned"
                            statusColor={"#22C55E"}
                            statusBg={"#22C55E33"}
                        />
                        <View style={{ marginBottom: 24 }}>
                            <CustomButton
                                onPress={() => setShowCancelAssignmentModal(true)}
                                title='Cancel Assignment'
                                width={'100%'}
                                height={hp(44)}
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
                            label="Assignmed on"
                            value={item.completedDate}
                            statusText="Assigned"
                            // statusColors={statusColors}
                            statusColor={"#3D8BFF"}
                            statusBg={"#3D8BFF33"}
                        />


                        <View style={[styles.buttonContainer]}>
                            <View >
                                <Caption2 style={{ marginBottom: hp(12) }} color={Colors.PLACEHOLLDER_TEXT}>Your Rating</Caption2>
                                <View style={{ flexDirection: "row", gap: 5 }}>
                                    {item?.rating ? (
                                        <>
                                            <StarIcon color="#FFB020" />
                                            <Body3 color={Colors.NEUTRAL0} style={{ lineHeight: 20 }}>
                                                {item?.rating}/5
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
                const cancelledByValue = item.cancelledBy?.toLowerCase();

                let displayLabel = "—";
                if (cancelledByValue === 'bartender') {
                    displayLabel = "Me";
                } else if (cancelledByValue === 'customer') {
                    displayLabel = "Customer";
                } else {
                    displayLabel = item.cancelledBy || "—";
                }
                return (
                    <>


                        <View style={{ marginBottom: hp(12), marginTop: hp(16) }}>
                            <DetailsCardComponents
                                topLabel="Cancelled By"
                                bottomLabel={displayLabel}
                            />

                            <DetailsCardComponents
                                topLabel="Cancelled On"
                                bottomLabel={
                                    item.cancellationDate
                                        ? new Date(item.cancellationDate).toLocaleDateString('en-GB', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })
                                        : '—'
                                }
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
                    <CustomLoader />
                </View>
            )}


            {/* Back Header */}
            <View style={{ paddingTop: "4%" }}>
                <SectionTitle title='Job Details' />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={Colors.BRAND_PRIMARY}
                        colors={[Colors.BRAND_PRIMARY]}
                    />
                }
            >

                <Body1 color={Colors.NEUTRAL0} italic style={styles.title}>{item?.title}</Body1>
                <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
                    <View style={[styles.dot, { backgroundColor: statusColors.text }]} />
                    <Caption1 color={statusColors.text}>{item?.status}</Caption1>
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
                // onConfirm={confirmCancelAssignment}
                onConfirm={confirmCancelApplication}
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
        <DetailsCardComponents topLabel="Location" bottomLabel={item.address} />
        <DetailsCardComponents
            topLabel="Date"
            bottomLabel={
                item.startDateTime
                    ? `${new Date(item.startDateTime).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric'
                    })} - ${item.endDateTime ? new Date(item.endDateTime).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric'
                    }) : ''}`
                    : 'N/A'
            }
        />
        <DetailsCardComponents topLabel="Time" bottomLabel={
            item?.startDateTime
                ? `${new Date(item.startDateTime).toLocaleTimeString('en-US', {
                    hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC'
                })}${item?.endDateTime ? ` - ${new Date(item?.endDateTime).toLocaleTimeString('en-US', {
                    hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC'
                })}` : ''}`
                : 'N/A'
        } />
        <DetailsCardComponents topLabel="Contact Number" bottomLabel={item.contactNumber} />
        <DetailsCardComponents topLabel="Details" bottomLabel={item.description} />
    </>
);


// <----------Payment Card-------->

const PaymentInfoCard = ({ item }: { item: any }) => {
    const start = item.startDateTime ? new Date(item.startDateTime) : null;
    const end = item.endDateTime ? new Date(item.endDateTime) : null;
    const durationHours = start && end
        ? (end.getTime() - start.getTime()) / (1000 * 60 * 60)
        : 0;
    const totalAmount = durationHours * (item.hourlyRate || 0);

    return (
        <View style={styles.paymentCard}>
            <View style={styles.paymentTextcon}>
                <View style={styles.iconContainer}>
                    <JobsBagIcon />
                </View>
                <Body2 italic color={Colors.NEUTRAL0}> Payment Info</Body2>
            </View>
            <View style={styles.payRow}>
                <Caption2 color={Colors.PLACEHOLLDER_TEXT}>Pay Rate (Per Hour)</Caption2>
                <Body2 color={Colors.NEUTRAL0}>${item.hourlyRate?.toFixed(2)}</Body2>
            </View>
            <View style={styles.payRow}>
                <Caption2 color={Colors.PLACEHOLLDER_TEXT}>Total Duration</Caption2>
                <Body2 color={Colors.NEUTRAL0}>{durationHours.toFixed(2)} hours</Body2>
            </View>
            <View style={{ height: 1.5, backgroundColor: Colors.BORDER_COLOR, marginVertical: 16 }} />
            <View style={styles.payRow}>
                <Caption1 color={Colors.PLACEHOLLDER_TEXT}>Total Amount</Caption1>
                <Body2 color={Colors.NEUTRAL0}>$ {totalAmount.toFixed(2)}</Body2>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
        marginBottom: hp(20)
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(20),
        paddingVertical: hp(12),
    },

    scrollContent: {
        paddingHorizontal: wp(20),
        paddingBottom: "20%",
        paddingTop: hp(15)
    },
    title: {
        marginBottom: hp(10),
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: wp(12),
        paddingVertical: hp(6),
        borderRadius: 100,
        marginBottom: hp(16),
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginRight: 6,
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