import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption1, H3 } from '../typo/Typography';

interface TitleSectionProps {
  title: string;
  description: string;
  style?: object; // optional extra style for container
  titleColor?: string;
  descriptionColor?: string;
}

export const AuthHeading: React.FC<TitleSectionProps> = ({
  title,
  description,
  style,
  titleColor = Colors.NEUTRAL0,
  descriptionColor = Colors.PLACEHOLLDER_TEXT
}) => {
  return (
    <View style={[styles.container, style]}>
      <H3 italic color={titleColor}>{title}</H3>
      <Caption1 style={styles.description} color={descriptionColor}>
        {description}
      </Caption1>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 24,
  },
  description: {
    marginTop: 16,
  },
});
