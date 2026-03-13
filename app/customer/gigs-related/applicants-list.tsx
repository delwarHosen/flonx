import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StarIcon } from '@/assets/images/icons/BarRelatedIcon/StarIcon';
import SectionTitle from '@/components/SectionTitle';
import { Body2, Caption1 } from '@/components/typo/Typography';
import { jobPosts } from '@/constants/data/jobPosts';
import { Colors } from '@/constants/theme';

const ApplicantsList = () => {
    const { jobId } = useLocalSearchParams<{ jobId: string }>();
    const job = jobPosts.find(j => j.id === jobId); 
    const applicants = job?.applicants || []; 

    const renderApplicantCard = ({ item }: { item: any }) => (
        <TouchableOpacity 
            style={styles.card}
            onPress={() => router.push({
                pathname: '/customer/gigs-related/applicant-details',
                params: { applicantId: item.id, jobId: jobId }
            })}
        >
            <View style={styles.cardLeft}>
                <Image source={item.profileImg} style={styles.avatar} />
                <View style={styles.info}>
                    <Body2 color={Colors.NEUTRAL0} >{item.name}</Body2>
                    <View style={styles.ratingRow}>
                        <StarIcon color='#FFB020'/>
                        <Caption1 color={Colors.PLACEHOLLDER_TEXT} style={{ marginLeft: 4 }}>
                            {item.rating} ({item.reviewCount})
                        </Caption1>
                    </View>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.PLACEHOLLDER_TEXT} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <View style={{paddingTop:"4%"}}>
              <SectionTitle  title="Applicants" />
          </View>
            
            <FlatList
                data={applicants}
                renderItem={renderApplicantCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Body2 color={Colors.PLACEHOLLDER_TEXT} style={styles.emptyText}>
                        No applicants found for this job.
                    </Body2>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_BACKGROUND, //
    },
    listContent: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.INPUT_BACKGROUND, 
        padding: 10,
        borderRadius: 12,
        marginBottom: 12,
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
        marginLeft: 12,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
    }
});

export default ApplicantsList;