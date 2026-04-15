import { JobsBagIcon } from '@/assets/images/icons/BarRelatedIcon/JobsBagIcon';
import { WarningIcon } from '@/assets/images/icons/ProfileInfoIcons/WarningIcon';
import { DetailsCardComponents } from '@/components/cardComponents/DetailsCardComponents';
import { ConfirmationModal } from '@/components/ConfirmationModalProps';
import { CustomButton } from '@/components/CustomButton';
import CustomLoader from '@/components/CustomLoader';
import SectionTitle from '@/components/SectionTitle';
import { showToast } from '@/components/Toast';
import { Body1, Body2, Caption1, Caption2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useApplyForJobMutation, useGetSingleJobQuery } from '@/redux/services/jobApi';
import { hp } from '@/utils/responsive';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const JobDetails = () => {
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const { id } = useLocalSearchParams<{ id: string }>();
    // const item = getJobs.find(j => j.id === id);
    const { data: item, isLoading } = useGetSingleJobQuery(id, { skip: !id });
    const [applyForJob] = useApplyForJobMutation();

    if (!item) return null;


    const statusColors = { bg: '#FFB02033', text: Colors.COLOR_ORANGE };

    // apply job
    const confirmApply = async () => {
        setShowApplyModal(false);
        setLoading(true);
        try {
            await applyForJob(id).unwrap();
            showToast("Applied Successfully!")
            router.back();
        } catch (error: any) {
            const message = error?.data?.message || "Something went wrong!";
            showToast(message,"error")
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            {/* Loader */}
            {isLoading && (
                <View style={styles.loaderOverlay}>
                    <CustomLoader size={55} />
                </View>
            )}

            <View style={{ marginTop: "4%" }}>
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

                {/* Open Job specific bottom section */}
                {/* <StatusInfoCard
                    label="Applied on"
                    value={item.appliedOn || "Not Applied yet"}
                    statusText="Open"
                    statusColor={"#FFB020"}
                    statusBg={"#FFB02033"}
                /> */}

                <CustomButton
                    onPress={() => setShowApplyModal(true)}
                    title='Apply for The jobs'
                    width={'100%'}
                    height={hp(44)}
                    borderRadius={100}
                    style={{ marginTop: 12 }}
                />
            </ScrollView>

            {/* Application Confirmation Modal */}
            <ConfirmationModal
                visible={showApplyModal}
                title="Apply for this Job?"
                description="Are you sure you want to apply for this position? Your profile will be shared with the employer."
                confirmText="Confirm"
                onCancel={() => setShowApplyModal(false)}
                onConfirm={confirmApply}
                icon={<WarningIcon size={28} />}
                confirmColor="#8B5CF6"
                confirmSecondaryColor="#A78BFA"
            />
        </SafeAreaView>
    );
};

// ---- Gig details Component ----->
const GigBasicDetails = ({ item }: { item: any }) => (
    <>
        <DetailsCardComponents topLabel="Location" bottomLabel={item.address} />
        <DetailsCardComponents
            topLabel="Date"
            bottomLabel={item.startDateTime
                ? new Date(item.startDateTime).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric'
                })
                : 'N/A'
            }
        />
        <DetailsCardComponents
            topLabel="Event Time"
            bottomLabel={
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
            }
        />

        <DetailsCardComponents topLabel="Contact Number" bottomLabel={item.contactNumber} />
        <DetailsCardComponents topLabel="Details" bottomLabel={item.description} />
    </>
);

// <----------Payment Card Component -------->
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

    },
    loaderOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: "20%",
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
    paymentCard: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: 12,
        padding: 14,
        marginTop: 16,
        marginBottom: 16,
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
    payRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default JobDetails;