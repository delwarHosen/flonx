import { Body2, Caption1, Caption2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

// Props Interface
interface StatusInfoCardProps {
  label: string;          
  value?: string;         
  statusText: string;      
  statusColor: string;     
  statusBg: string;       
  style?: ViewStyle;      
}

export const StatusInfoCard: React.FC<StatusInfoCardProps> = ({
  label,
  value,
  statusText,
  statusColor,
  statusBg,
  style,
}) => {
  return (
    <View style={[styles.infoCard, style]}>
      <View style={{ flex: 1 }}>
        <Caption2 color={Colors.PLACEHOLLDER_TEXT}>{label}</Caption2>
        <Body2 italic color={Colors.PLACEHOLLDER_TEXT} style={{ marginTop: 8 }}>
          {value ?? '—'}
        </Body2>
      </View>

      {/* Dynamic Badge: Background color updates here */}
      <View style={[styles.statusBadgeType, { backgroundColor: statusBg }]}>
        {/* Dynamic Dot: Background color updates here */}
        <View style={[styles.dot, { backgroundColor: statusColor }]} />
        
        {/* Dynamic Text: Color updates here */}
        <Caption1 color={statusColor}>
          {statusText}
        </Caption1>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  statusBadgeType: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 6,
  },
});