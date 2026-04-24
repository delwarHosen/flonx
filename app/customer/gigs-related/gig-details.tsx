import { JobsBagIcon } from '@/assets/images/icons/BarRelatedIcon/JobsBagIcon';
import { WarningIcon } from '@/assets/images/icons/ProfileInfoIcons/WarningIcon';

import { DetailsCardComponents } from '@/components/cardComponents/DetailsCardComponents';
import { ConfirmationModal } from '@/components/ConfirmationModalProps';
import { CustomButton } from '@/components/CustomButton';
import CustomLoader from '@/components/CustomLoader';
import SectionTitle from '@/components/SectionTitle';
import { showToast } from '@/components/Toast';
import { Body1, Body2, Caption2, Caption3 } from '@/components/typo/Typography';
import { IMAGE_COMPONENTS } from '@/constants/image.index';
import { Colors } from '@/constants/theme';
import { useCancelJobMutation, useDeleteJobMutation, useGetSingleJobQuery, useMarkJobAsCompleteMutation } from '@/redux/services/jobApi';
import { hp, wp } from '@/utils/responsive';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GigDetails = () => {
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const { id, initialTab } = useLocalSearchParams<{ id: string; initialTab: string }>();
    // const item = jobPosts.find(j => j.id === id);
    const { currentData: item, isLoading, isFetching, refetch } = useGetSingleJobQuery(id, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });

    const [deleteJob] = useDeleteJobMutation();
    const [markJobAsComplete] = useMarkJobAsCompleteMutation();
    const [cancelJob] = useCancelJobMutation();

    

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);


    if ((isLoading || isFetching) && !item) return (
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

    const statusColors = getStatusColors(item.status);

    const confirmComplete = () => {
        setShowCompleteModal(false);
        setTimeout(async () => {
            setLoading(true);
            try {
                // API Call
                const res = await markJobAsComplete(item._id).unwrap();
                showToast(res?.message || "Job marked as completed!", "success");

                router.back();
            } catch (error: any) {
                const errorMsg = error?.data?.message || "Failed to complete the job!";
                showToast(errorMsg, "error");
            } finally {
                setLoading(false);
            }
        }, 300);
    };


    const confirmCancelAssignment = () => {
        setShowCancelModal(false);

        setTimeout(async () => {
            setLoading(true);
            try {
                const res = await cancelJob(item._id).unwrap();

                showToast(res?.message || "Assignment cancelled successfully", "success");

                setLoading(false);

                router.push({
                    pathname: '/customer/(tabs)/gigs',
                    params: { resetTab: 'Cancelled' }
                });
            } catch (error: any) {
                const errorMsg = error?.data?.message || "Failed to cancel assignment!";
                showToast(errorMsg, "error");

                setLoading(false);
            }
        }, 300);
    };

    // delete modal
    const confirmDelete = () => {
        setShowDeleteModal(false);

        setTimeout(async () => {
            setLoading(true);
            try {
                const res = await deleteJob(item._id).unwrap();
                showToast(res?.message || "Job deleted successfully!", "success");

                setLoading(false);
                router.back();
            } catch (error: any) {
                setLoading(false);

                const errorMsg = error?.data?.message || "Failed to delete the job!";
                showToast(errorMsg, "error");
                console.error("Delete failed", error);
            }
        }, 300);
    };


    const renderBottomSection = () => {
        // console.log("Current initialTab:", initialTab);
        const currentStatus = item.status?.toLowerCase();
        switch (currentStatus)
        // switch (initialTab?.toLowerCase())
        {

            // ─── 1st Page: Open ──────────
            case 'open':
            case 'active':
                return (
                    <>

                        <View style={styles.actionRow}>
                            <View style={styles.buttonWrapper}>
                                <CustomButton
                                    onPress={() => router.push({
                                        pathname: "/customer/gigs-related/update-gig",
                                        params: { jobId: item._id },
                                    })}
                                    title='Update Gig'
                                    width="100%"
                                    height={hp(44)}
                                    borderRadius={100}
                                />
                            </View>
                            <View style={styles.buttonWrapper}>
                                <CustomButton
                                    onPress={() => {
                                        // console.log("Navigating with jobId:", item._id);
                                        router.push({
                                            pathname: '/customer/gigs-related/applicants-list',
                                            params: { jobId: item._id }
                                        });
                                    }}
                                    title='View Applicants'
                                    width="100%"
                                    height={hp(44)}
                                    borderRadius={100}
                                    backgroundColor={'#22C55E'}
                                />
                            </View>
                        </View>

                        <CustomButton
                            onPress={() => setShowDeleteModal(true)}
                            title='Delete Job'
                            width={'100%'}
                            height={hp(44)}
                            borderRadius={100}
                            backgroundColor={'#EF4444'}
                            style={{ marginTop: 12 }}
                        />
                    </>
                );

            // ─── 2nd Page: Assigned ───────────────────────────────────────
            case 'assigned':
                return (
                    <>
                        <TouchableOpacity
                            style={styles.assignedRow}
                            activeOpacity={0.8}
                        >
                            <View style={styles.assignedLeft}>
                                <View style={styles.assigneeInfo}>
                                    <Image
                                        source={
                                            item.bartender?.profile_image && item.bartender.profile_image.trim() !== ''
                                                ? { uri: item.bartender.profile_image }
                                                : IMAGE_COMPONENTS.profileImg
                                        }
                                        style={styles.avatar}
                                    />
                                    <View style={{ flexDirection: "column", gap: 10, marginLeft: wp(10) }}>
                                        <Caption3 color={Colors.PLACEHOLLDER_TEXT}>ASSIGNED TO</Caption3>
                                        <Body2 color={Colors.NEUTRAL0}>
                                            {item.bartender?.name ?? '—'}
                                        </Body2>
                                    </View>
                                </View>
                            </View>
                            <Body2 color={Colors.NEUTRAL0}>›</Body2>
                        </TouchableOpacity>

                        <View style={{ marginBottom: hp(24) }}>
                            <CustomButton
                                onPress={() => setShowCompleteModal(true)}
                                title='Mark As Completed'
                                width={'100%'}
                                height={hp(44)}
                                borderRadius={100}
                                backgroundColor={'#22C55E'}
                                style={{ marginTop: 16 }}
                            />
                            <CustomButton
                                onPress={() => setShowCancelModal(true)}
                                title='Cancel Assignment'
                                width={'100%'}
                                height={hp(44)}
                                borderRadius={100}
                                backgroundColor={'#EF4444'}
                                style={{ marginTop: hp(12) }}
                            />
                        </View>
                    </>
                );

            // ─── 3rd Page: Completed ──────────────────────────────────────
            case 'completed':
                return (
                    <>
                        <TouchableOpacity
                            style={styles.assignedRow}
                            onPress={() => {
                                // console.log("Job id:", item._id)
                                router.push({
                                    pathname: '/customer/gigs-related/applicant-profile-details',
                                    params: {
                                        bartenderId: item.bartender?._id,
                                        jobId: item._id,
                                        existingRating: String(item.rating ?? 0),
                                    }
                                })
                            }}
                            activeOpacity={0.8}
                        >
                            <View style={styles.assignedLeft}>
                                <View style={styles.assigneeInfo}>
                                    <Image
                                        source={
                                            item.bartender?.profile_image && item.bartender.profile_image.trim() !== ''
                                                ? { uri: item.bartender.profile_image }
                                                : IMAGE_COMPONENTS.profileImg
                                        }
                                        style={styles.avatar}
                                    />
                                    <View style={{ flexDirection: "column", gap: 10, marginLeft: wp(10) }}>
                                        <Caption3 color={Colors.PLACEHOLLDER_TEXT}>Completed By</Caption3>
                                        <Body2 color={Colors.NEUTRAL0}>
                                            {item.bartender?.name ?? '—'}
                                        </Body2>
                                    </View>
                                </View>
                            </View>
                            <Body2 color={Colors.NEUTRAL0}>›</Body2>
                        </TouchableOpacity>

                        <DetailsCardComponents
                            topLabel="Completed On"
                            bottomLabel={item.completedDate
                                ? new Date(item.completedDate).toLocaleDateString('en-GB', {
                                    day: 'numeric', month: 'long', year: 'numeric'
                                })
                                : '—'}
                        />
                    </>
                );

            // ─── 4th Page: Cancelled ──────────────────────────────────────
            case 'cancelled':
                
                const cancelledByValue = item.cancelledBy?.toLowerCase();

                let displayLabel = "—";
                if (cancelledByValue === 'customer') {
                    displayLabel = "Me";
                } else if (cancelledByValue === 'bartender') {
                    displayLabel = "Bartender";
                } else {
                    displayLabel = item.cancelledBy || "—";
                }
                return (

                    <>


                        <View style={{ marginBottom: hp(12), marginTop: hp(16), }}>
                            <DetailsCardComponents
                                topLabel="Cancelled By"
                                bottomLabel={displayLabel}
                            />

                            <DetailsCardComponents
                                topLabel="Cancelled On"
                                bottomLabel={item.cancellationDate
                                    ? new Date(item.cancellationDate).toLocaleDateString('en-GB', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })
                                    : '—'}

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


            <ConfirmationModal
                visible={showDeleteModal}
                title="Delete Listing?"
                description="Are you sure you want to delete this listing? This action cannot be undone."
                confirmText="Confirm"
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                icon={<WarningIcon size={28} />}
                confirmColor={Colors.BRAND_PRIMARY}
                confirmSecondaryColor="#A855F7"
            />

            {/* Back Header */}
            <View style={{ marginVertical: "2%" }}>
                <SectionTitle title='Gig Details' />
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

                <Body1 color={Colors.NEUTRAL0} italic style={styles.title}>{item.title}</Body1>
                <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
                    <View style={[styles.dot, { backgroundColor: statusColors.text }]} />
                    <Caption3 color={statusColors.text}>{item.status}</Caption3>
                </View>

                <GigBasicDetails item={item} />

                <PaymentInfoCard item={item} />

                {renderBottomSection()}

            </ScrollView>
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


            <ConfirmationModal
                visible={showDeleteModal}
                title="Delete Listing?"
                description="Are you sure you want to delete this listing? This action cannot be undone."
                confirmText="Confirm"
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                icon={<WarningIcon size={28} />}
                confirmColor={Colors.BRAND_PRIMARY}
                confirmSecondaryColor="#A855F7"
            />
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

            {/* Cancel Assignment Modal */}
            <ConfirmationModal
                visible={showCancelModal}
                title="Cancel Assignment?"
                description="Are you sure you want to cancel this assignment? This action will remove you from the job."
                confirmText="Confirm"
                onCancel={() => setShowCancelModal(false)}
                onConfirm={confirmCancelAssignment}
                icon={<WarningIcon size={28} />}
                confirmColor="#8B5CF6"
                confirmSecondaryColor="#A78BFA"
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
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'UTC'
                })}${item?.endDateTime ? ` - ${new Date(item?.endDateTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'UTC'
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

            <View style={{ height: 1.5, backgroundColor: Colors.BORDER_COLOR, marginVertical: hp(16) }} />

            <View style={styles.payRow}>
                <Caption2 color={Colors.PLACEHOLLDER_TEXT}>Total-Amount</Caption2>
                <Body2 color={Colors.NEUTRAL0}>$ {totalAmount.toFixed(2)}</Body2>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
        marginBottom: "20%"
    },

    scrollContent: {
        paddingHorizontal: wp(20),
        paddingVertical: hp(20),
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
        marginBottom: hp(18)

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

    payRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(10),
    },
    actionRow: {

        flexDirection: 'row',
        justifyContent: "center",
        gap: 10
    },
    buttonWrapper: {
        flex: 1,
        marginTop:hp(16)
    },

    assignedRow: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 12,
        padding: 14,
        marginTop: hp(10),
        marginBottom: hp(12),
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
        marginTop: hp(8),
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 8,
        backgroundColor: Colors.BORDER_COLOR,
        borderWidth: 1,
        borderColor: Colors.BRAND_PRIMARY
    },
});

export default GigDetails;