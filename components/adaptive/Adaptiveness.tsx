// components/adaptive/Adaptiveness.ts
import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Design reference sizes (iPhone 11 Pro)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Device category
export const isSmallDevice: boolean = SCREEN_WIDTH < 375;
export const isLargeDevice: boolean = SCREEN_WIDTH >= 428;
export const isTablet: boolean = SCREEN_WIDTH >= 768;

/**
 * Scale size based on screen width
 */
export const scale = (size: number): number => {
  const scaleFactor = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scaleFactor;

  if (isTablet) {
    return size + (newSize - size) * 0.5;
  }

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Moderate scale - less aggressive
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

/**
 * Vertical scale
 */
export const verticalScale = (size: number): number => {
  const scaleFactor = SCREEN_HEIGHT / BASE_HEIGHT;
  const minScale = 0.85;
  const maxScale = 1.15;
  const constrainedScale = Math.max(minScale, Math.min(maxScale, scaleFactor));

  return Math.round(PixelRatio.roundToNearestPixel(size * constrainedScale));
};

/**
 * Moderate vertical scale
 */
export const moderateVerticalScale = (size: number, factor: number = 0.3): number => {
  return size + (verticalScale(size) - size) * factor;
};

/**
 * Font scale with min/max constraints
 */
export const fontScale = (size: number): number => {
  const scaled = scale(size);

  if (scaled < 11) return 11;
  if (isTablet && scaled > size * 1.3) return size * 1.3;

  return scaled;
};

/**
 * Spacing
 */
export const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
};

/**
 * Device info
 */
export const deviceInfo = {
  isSmallDevice,
  isLargeDevice,
  isTablet,
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
};