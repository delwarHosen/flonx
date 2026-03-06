import { StarIcon } from '@/assets/images/icons/BarRelatedIcon/StarIcon';
import { WarningIcon } from '@/assets/images/icons/ProfileInfoIcons/WarningIcon';
import { DetailsCardComponents } from '@/components/cardComponents/DetailsCardComponents';
import { ConfirmationModal } from '@/components/ConfirmationModalProps';
import { CustomButton } from '@/components/CustomButton';
import CustomLoader from '@/components/CustomLoader';
import SectionTitle from '@/components/SectionTitle';
import { Body2, Caption2 } from '@/components/typo/Typography';
import { jobPosts } from '@/constants/data/jobPosts';
import { Colors } from '@/constants/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ApplicantDetails = () => {
    const [showAssignModal, setShowAssignModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const { applicantId, jobId } = useLocalSearchParams<{ applicantId: string, jobId: string }>();

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


    const handleAssignConfirm = () => {
        setShowAssignModal(false);

        setTimeout(async () => {
            setLoading(true);
            try {

                await new Promise(resolve => setTimeout(resolve, 2000));
                setLoading(false);
                // router.push("/customer/gigs/")

            } catch (error) {
                setLoading(false);
                console.error("Assignment failed", error);
            }
        }, 300);
    };


    return (
        <SafeAreaView style={styles.container}>
            <SectionTitle title='Applicant details ' />
            <ScrollView contentContainerStyle={{ padding: "5%", alignItems: 'center' }}>
                <View style={styles.imgWrapper}>
                    <Image source={applicant.profileImg} style={styles.profileImg} />
                </View>

                <View style={{ width: '100%', marginTop: 10 }}>
                    <DetailsCardComponents
                        topLabel="Name"
                        bottomLabel={applicant.name}
                    />
                    <DetailsCardComponents
                        topLabel="Email"
                        bottomLabel={applicant.email}
                    />
                    <DetailsCardComponents
                        topLabel="Contact Phone"
                        bottomLabel={applicant.phone}
                    />
                    <DetailsCardComponents
                        topLabel="Experience"
                        bottomLabel={applicant.experience}
                    />
                    <DetailsCardComponents
                        topLabel="Total Jobs Completed"
                        bottomLabel={applicant.totalJobs.toString()}
                    />

                    <DetailsCardComponents
                        topLabel="Overall Rating"
                        bottomLabel={`${applicant.rating} (${applicant.reviewCount})`}
                    />

                    <View style={styles.fieldBox}>
                        <Caption2 color={Colors.PLACEHOLLDER_TEXT}>Overall Rating</Caption2>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                            <StarIcon />
                            <Body2 color={Colors.NEUTRAL0} style={{ marginLeft: 6 }}>
                                {applicant.rating} ({applicant.reviewCount})
                            </Body2>
                        </View>
                    </View>
                    <CustomButton
                        onPress={() => setShowAssignModal(true)}
                        title='Accept & Assign Job'
                        width="100%"
                        height={44}
                        borderRadius={100}
                    />
                </View>
            </ScrollView>

            {/* Modal and loader */}
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

            {/* Modal */}
            <ConfirmationModal
                visible={showAssignModal}
                title="Assign Job to Applicant?"
                description={`Are you sure you want to accept and assign this job to ${applicant.name}?`}
                confirmText="Confirm"
                onCancel={() => setShowAssignModal(false)}
                onConfirm={handleAssignConfirm}
                icon={<WarningIcon size={28} />}
                confirmColor="#8B5CF6"
                confirmSecondaryColor="#A78BFA"
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
    imgWrapper: { width: 100, height: 100, borderRadius: 20, backgroundColor: Colors.INPUT_BACKGROUND, overflow: 'hidden', borderWidth: 1, borderColor: Colors.BORDER_COLOR },
    profileImg: { width: '100%', height: '100%', backgroundColor: Colors.INPUT_BACKGROUND },
    fieldBox: { width: '100%', backgroundColor: Colors.INPUT_BACKGROUND, padding: 14, borderRadius: 10, borderWidth: 1, borderColor: Colors.BORDER_COLOR }
});

export default ApplicantDetails