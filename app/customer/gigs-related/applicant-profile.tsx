import { Body2, Caption1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ApplicantProfile = ({ applicant }: any) => {
    const ProfileField = ({ label, value }: { label: string, value: string }) => (
        <View style={styles.fieldBox}>
            <Caption1 color={Colors.PLACEHOLLDER_TEXT}>{label}</Caption1>
            <Body2 color={Colors.NEUTRAL0} style={{ marginTop: 6 }}>{value}</Body2>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
                {/* Profile Image */}
                <View style={styles.imgWrapper}>
                    <Image source={applicant.profileImg} style={styles.profileImg} />
                </View>

                <View style={{ width: '100%', marginTop: 30 }}>
                    <ProfileField label="Name" value={applicant.name} />
                    <ProfileField label="Email" value={applicant.email} />
                    <ProfileField label="Contact Phone" value={applicant.phone} />
                    <ProfileField label="Experience" value={applicant.experience} />
                    <ProfileField label="Total Jobs Completed" value={applicant.totalJobs.toString()} />

                    <View style={styles.fieldBox}>
                        <Caption1 color={Colors.PLACEHOLLDER_TEXT}>Overall Rating</Caption1>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                            <Ionicons name="star" size={16} color={Colors.COLOR_ORANGE} />
                            <Body2 color={Colors.NEUTRAL0} style={{ marginLeft: 6 }}>
                                {applicant.rating} ({applicant.reviewCount})
                            </Body2>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
    imgWrapper: { width: 100, height: 100, borderRadius: 20, backgroundColor: Colors.INPUT_BACKGROUND, overflow: 'hidden', borderWidth: 1, borderColor: Colors.BORDER_COLOR },
    profileImg: { width: '100%', height: '100%' },
    fieldBox: { width: '100%', backgroundColor: Colors.INPUT_BACKGROUND, padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: Colors.BORDER_COLOR }
});

export default ApplicantProfile