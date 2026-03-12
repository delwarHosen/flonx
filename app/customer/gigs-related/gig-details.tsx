import { JobsBagIcon } from '@/assets/images/icons/BarRelatedIcon/JobsBagIcon';
import { WarningIcon } from '@/assets/images/icons/ProfileInfoIcons/WarningIcon';

import { DetailsCardComponents } from '@/components/cardComponents/DetailsCardComponents';
import { ConfirmationModal } from '@/components/ConfirmationModalProps';
import { CustomButton } from '@/components/CustomButton';
import CustomLoader from '@/components/CustomLoader';
import SectionTitle from '@/components/SectionTitle';
import { Body1, Body2, Caption1, Caption2, Caption3 } from '@/components/typo/Typography';
import { jobPosts } from '@/constants/data/jobPosts';
import { Colors } from '@/constants/theme';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GigDetails = () => {
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const { id, initialTab } = useLocalSearchParams<{ id: string; initialTab: string }>();
    const item = jobPosts.find(j => j.id === id);

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
                await new Promise(resolve => setTimeout(resolve, 2000));
                router.back();
            } catch (error) {
                setLoading(false);
            }
        }, 300);
    };


    const confirmCancelAssignment = () => {
        setShowCancelModal(false);
        setTimeout(async () => {
            setLoading(true);
            try {
                // API Call logic here
                await new Promise(resolve => setTimeout(resolve, 2000));
                router.back();
            } catch (error) {
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

                await new Promise(resolve => setTimeout(resolve, 2000));
                router.back();
            } catch (error) {
                setLoading(false);
                console.error("Delete failed", error);
            }
        }, 300);
    };

    const renderBottomSection = () => {
        switch (initialTab) {

            // ─── 1st Page: Open ──────────
            case 'open':
                return (
                    <>
                        {/* <View style={styles.infoCard}>
                            <View style={{ flex: 1 }}>
                                <Body2 color={Colors.NEUTRAL0} >View Applicants</Body2>
                                <Caption3 color={Colors.PLACEHOLLDER_TEXT} style={{ marginTop: 8 }}>
                                    See all candidates who applied for this job.
                                </Caption3>
                            </View>
                            <TouchableOpacity
                                style={styles.applicantIconBtn}
                                onPress={() => router.push({
                                    pathname: '/customer/gigs-related/applicants-list',
                                    params: { jobId: item.id }
                                })}
                            >
                                <ViewDetailsIcon />
                            </TouchableOpacity>
                        </View> */}


                        <View style={styles.actionRow}>
                            <View style={styles.buttonWrapper}>
                                <CustomButton
                                    onPress={() => router.push("/customer/gigs-related/update-gig")}
                                    title='Update Listing'
                                    width="100%"
                                    height={44}
                                    borderRadius={100}
                                />
                            </View>
                            <View style={styles.buttonWrapper}>
                                <CustomButton
                                    onPress={() => router.push({
                                        pathname: '/customer/gigs-related/applicants-list',
                                        params: { jobId: item.id }
                                    })}
                                    title='View Applicants'
                                    width="100%"
                                    height={44}
                                    borderRadius={100}
                                    backgroundColor={'#22C55E'}
                                />
                            </View>
                        </View>

                        <CustomButton
                            onPress={() => setShowDeleteModal(true)}
                            title='Delete listing'
                            width={'100%'}
                            height={44}
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
                            // pathname: '/customer/gigs-related/applicant-details',
                            onPress={() => console.log("")}
                            activeOpacity={0.8}
                        >
                            <View style={styles.assignedLeft}>

                                <View style={styles.assigneeInfo}>
                                    <Image
                                        source={item.assignedTo?.profileImg}
                                        style={styles.avatar}
                                    />
                                    <View style={{ flexDirection: "column", gap: 10, marginLeft: 10 }}>
                                        <Caption3 color={Colors.PLACEHOLLDER_TEXT}>ASSIGNED TO</Caption3>
                                        <Body2 color={Colors.NEUTRAL0}>
                                            {item.assignedTo?.name ?? '—'}
                                        </Body2>
                                    </View>
                                </View>
                            </View>
                            <Body2 color={Colors.NEUTRAL0}>›</Body2>
                        </TouchableOpacity>

                        <View style={{ marginBottom: 24 }}>
                            <CustomButton
                                onPress={() => setShowCompleteModal(true)}
                                title='Mark As Completed'
                                width={'100%'}
                                height={44}
                                borderRadius={100}
                                backgroundColor={'#22C55E'}
                                style={{ marginTop: 16 }}
                            />
                            <CustomButton
                                onPress={() => setShowCancelModal(true)}
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
                        <TouchableOpacity
                            style={styles.assignedRow}
                            onPress={() => router.push({
                                pathname: '/customer/gigs-related/applicant-profile-details',
                                params: { applicantId: item.assignedTo?.id, jobId: item.id }
                            })}
                            activeOpacity={0.8}
                        >
                            <View style={styles.assignedLeft}>

                                <View style={styles.assigneeInfo}>
                                    <Image
                                        source={item.assignedTo?.profileImg}
                                        style={styles.avatar}
                                    />
                                    <View style={{ flexDirection: "column", gap: 10, marginLeft: 10 }}>
                                        <Caption3 color={Colors.PLACEHOLLDER_TEXT}>ASSIGNED TO</Caption3>
                                        <Body2 color={Colors.NEUTRAL0}>
                                            {item.assignedTo?.name ?? '—'}
                                        </Body2>
                                    </View>
                                </View>

                            </View>
                            <Body2 color={Colors.NEUTRAL0}>›</Body2>
                        </TouchableOpacity>

                        <DetailsCardComponents
                            topLabel="Completed On"
                            bottomLabel={item.completedOn ?? '—'}
                        />

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
           <View style={{marginVertical:10}}>
             <SectionTitle title='Gig Details' />
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
            <Caption2 color={Colors.PLACEHOLLDER_TEXT}>Total Amount</Caption2>
            <Body2 color={Colors.NEUTRAL0}>$ {item.totalAmount ?? '375'}</Body2>
        </View>
    </View>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND,
        marginBottom: "20%"
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
        paddingVertical: 20,
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
        flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 18
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
});

export default GigDetails;