import React, { useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export interface Tab {
  key: string;
  label: string;
}

interface CustomTabsProps {
  tabs: Tab[];
  activeIndex: number;
  onTabChange: (index: number, key: string) => void;
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  activeIndex,
  onTabChange,
}) => {
  const animValues = useRef(
    tabs.map((_, i) => new Animated.Value(i === 0 ? 1 : 0))
  ).current;

  const handlePress = (index: number) => {
    Animated.spring(animValues[activeIndex], {
      toValue: 0,
      useNativeDriver: true,
      tension: 130,
      friction: 9,
    }).start();

    Animated.spring(animValues[index], {
      toValue: 1,
      useNativeDriver: true,
      tension: 130,
      friction: 9,
    }).start();

    onTabChange(index, tabs[index].key);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;

        const translateY = animValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        });

        const bubbleScale = animValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1],
        });

        const bubbleOpacity = animValues[index].interpolate({
          inputRange: [0, 0.6, 1],
          outputRange: [0, 0.7, 1],
        });

        const labelOpacity = animValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0.4, 1],
        });

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => handlePress(index)}
            activeOpacity={0.85}
          >
            <Animated.View
              style={[styles.tabInner, { transform: [{ translateY }] }]}
            >
              <Animated.View
                style={[
                  styles.bubble,
                  {
                    opacity: bubbleOpacity,
                    transform: [{ scale: bubbleScale }],
                  },
                ]}
              >
                <Text style={styles.bubbleText}>
                  {tab.label.charAt(0).toUpperCase()}
                </Text>
              </Animated.View>

              <Animated.Text
                style={[
                  styles.label,
                  isActive && styles.labelActive,
                  { opacity: labelOpacity },
                ]}
              >
                {tab.label}
              </Animated.Text>
            </Animated.View>

            <View
              style={[
                styles.dot,
                { backgroundColor: isActive ? '#822CE7' : 'transparent' },
              ]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1D1733',
    height: 72,
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 72,
    paddingBottom: 4,
  },
  tabInner: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bubble: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#822CE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: '#822CE7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.65,
    shadowRadius: 14,
    elevation: 10,
  },
  bubbleText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  label: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  labelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 4,
  },
});

export default CustomTabs;