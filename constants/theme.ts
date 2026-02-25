/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const appBackground = "#0F0B1A";
const neutral0 = "#FFFFFF";
const placeholderText = "#C9C6D6";
const BRAND_PRIMARY = "#822CE7";
const BRAND_PRIMARY_LIGHT = "#BB82FF";
// const secondaryColor="#1D1733";
const colorActive = "#22C55E";
const colorDanger = "#EF4444";
const colorOranger = "#FFB020";
const borderColor = "#2A2448";
const inputBackground = "#1D1733";
const iconBgColor="#FFFFFF0D"


export const Colors = {
  light: {
    text: '#11181C',
    background: "#0F0B1A",
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#0F0B1A',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },

  APP_BACKGROUND: appBackground,
  NEUTRAL0: neutral0,
  PLACEHOLLDER_TEXT: placeholderText,
  BRAND_PRIMARY: BRAND_PRIMARY,
  BRAND_PRIMARY_LIGHT: BRAND_PRIMARY_LIGHT,
  COLOR_ACTIVE: colorActive,
  COLOR_DANGER: colorDanger,
  COLOR_ORANGE: colorOranger,
  BORDER_COLOR: borderColor,
  INPUT_BACKGROUND: inputBackground,
  ICON_BG_COLOR: iconBgColor


};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
