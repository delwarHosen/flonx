import { Body2, Caption2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { hp, wp } from '@/utils/responsive';
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
          {value
            ? new Date(value).toLocaleDateString('en-GB', {
              day: 'numeric', month: 'long', year: 'numeric'
            })
            : '—aa'}
        </Body2>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    marginTop: hp(16),
    borderRadius: 10,
    padding: 14,
    marginBottom: hp(12),
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadgeType: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(12),
    paddingVertical: hp(6),
    borderRadius: 100,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 6,
  },
});