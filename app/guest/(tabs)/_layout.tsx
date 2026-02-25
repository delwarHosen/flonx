import { OrderTabIcon, SearchBarIcon } from "@/assets/images/icon/icon";
import { Colors } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming
} from "react-native-reanimated";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.BRAND_PRIMARY,
                tabBarInactiveTintColor: Colors.NEUTRAL0,
                tabBarStyle: {
                    height: Platform.OS === "ios" ? 90 : "12%",
                    paddingBottom: Platform.OS === "ios" ? 20 : 10,
                    backgroundColor: Colors.INPUT_BACKGROUND,
                    borderTopWidth: 1,
                    borderTopColor: Colors.BORDER_COLOR,
                    paddingTop: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                },
            }}
        >
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarLabel: "Search",
                    tabBarIcon: ({ focused }) => {
                        const progress = useSharedValue(focused ? 0 : 1);

                        useDerivedValue(() => {
                            progress.value = withTiming(focused ? 1 : 0, { duration: 250 });
                        });

                        const animatedStyle = useAnimatedStyle(() => ({
                            transform: [{ translateY: -10 * progress.value }],
                            borderRadius: 25,
                            padding: 12,
                        }));

                        return (
                            <Animated.View
                                style={animatedStyle}
                            >
                                {focused ? (
                                    <LinearGradient
                                        colors={[ Colors.BRAND_PRIMARY,Colors.BRAND_PRIMARY_LIGHT]}
                                        start={{ x: -0.5, y: 1 }}
                                        end={{ x: 1, y: -0.5 }}
                                        style={{ borderRadius: 25, padding: 12 }}
                                    >
                                        <SearchBarIcon />
                                    </LinearGradient>
                                ) : (
                                    <SearchBarIcon />
                                )}
                            </Animated.View>
                        );
                    },
                }}
            />

            <Tabs.Screen
                name="order"
                options={{
                    title: "Order",
                    tabBarLabel: "Order",
                    tabBarIcon: ({ focused }) => {
                        const progress = useSharedValue(focused ? 1 : 0);

                        useDerivedValue(() => {
                            progress.value = withTiming(focused ? 1 : 0, { duration: 250 });
                        });

                        const animatedStyle = useAnimatedStyle(() => ({
                            transform: [{ translateY: -10 * progress.value }],
                            borderRadius: 25,
                            padding: 12,
                        }));

                        return (
                            <Animated.View
                                style={animatedStyle}
                            >
                                {focused ? (
                                    <LinearGradient
                                        colors={[Colors.BRAND_PRIMARY,Colors.BRAND_PRIMARY_LIGHT]}
                                        start={{ x: -0.5, y: 1 }}
                                        end={{ x: 1, y: -0.5 }}
                                        style={{ borderRadius: 25, padding: 12 }}
                                    >
                                        <OrderTabIcon />
                                    </LinearGradient>
                                ) : (
                                    <OrderTabIcon />
                                )}
                            </Animated.View>
                        );
                    },
                }}
            />
        </Tabs>
    );
}