import React from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import CustomLoader from './CustomLoader';

interface CustomRefreshProps {
  refreshing: boolean;
  onRefresh: () => void;
}

const CustomRefreshControl: React.FC<CustomRefreshProps> = ({ refreshing, onRefresh }) => {
  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="transparent" 
      colors={['transparent']} 
    >
     
      {refreshing && (
        <View style={styles.loaderWrapper}>
          <CustomLoader size={25} />
        </View>
      )}
    </RefreshControl>
  );
};

const styles = StyleSheet.create({
  loaderWrapper: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomRefreshControl;