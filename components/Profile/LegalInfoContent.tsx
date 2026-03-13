import { DetailsCardComponents } from '@/components/cardComponents/DetailsCardComponents';
import SectionTitle from '@/components/SectionTitle';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

interface InfoItem {
    topLabel: string;
    bottomLabel: string;
}

interface LegalInfoContentProps {
    data: InfoItem[];
}

export const LegalInfoContent: React.FC<LegalInfoContentProps> = ({ data }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingTop: "4%" }}>
                <SectionTitle title='Legal & Company Info' />
            </View>
            <View style={styles.detailsContainer}>
                {data.map((item, index) => (
                    <DetailsCardComponents
                        key={index}
                        topLabel={item.topLabel}
                        bottomLabel={item.bottomLabel}
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        paddingHorizontal: "5%",
        marginTop: 20
    }
});