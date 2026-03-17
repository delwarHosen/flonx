import { InputSearchIcon } from '@/assets/images/icons/BarRelatedIcon/InputSearchIcon';
import { SearchBarIcon } from '@/assets/images/icons/icon';
import { Colors } from '@/constants/theme';
import { fp, wp } from '@/utils/responsive';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

interface SearchBarProps extends TextInputProps {
  containerStyle?: ViewStyle;
  onScanPress?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  containerStyle, 
  onScanPress, 
  ...textInputProps 
}) => {
  return (
    <View style={[styles.headerRow, containerStyle]}>
      <View style={styles.searchBarContainer}>
        {/* <SearchBarIcon/> */}
        <InputSearchIcon/>
        {/* <Ionicons name="search" size={20} color="#FFFFFF" style={styles.searchIcon} /> */}
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.PLACEHOLLDER_TEXT}
          // This spreads all standard TextInput props (value, onChangeText, etc.)
          {...textInputProps} 
        />
      </View>

      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={onScanPress} 
        activeOpacity={0.7}
      >
        <SearchBarIcon/>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.INPUT_BACKGROUND, 
    // height: hp(48),
    borderRadius: 100,
    paddingHorizontal: wp(20),
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR
  },
  searchIcon: {
    marginRight: wp(10),
  },
  input: {
    flex: 1,
    color: Colors.NEUTRAL0,
    fontSize: fp(14),
    height: '100%',
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.INPUT_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR,
  },
});