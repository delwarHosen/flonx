import { BrowseIcon, JobsIcon, ProfileIcon } from "@/assets/images/icons/icon";
import { Colors } from "@/constants/theme";
import { fp, hp } from "@/utils/responsive";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text } from "react-native";
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
                    height: Platform.OS === "ios" ? hp(90) : hp(100),
                    paddingBottom: Platform.OS === "ios" ? 20 : 10,
                    backgroundColor: Colors.INPUT_BACKGROUND,
                    borderTopWidth: 1,
                    borderTopColor: Colors.BORDER_COLOR,
                },
                tabBarLabelStyle: {
                    fontSize: fp(14),
                },
                
            }}
        >
            <Tabs.Screen
                name="browse"
                options={{
                    title: "Browse",
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ color, fontSize: fp(11), fontWeight: focused ? "700" : "400" }}>
                            Browse
                        </Text>
                    ),
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
                                        colors={[Colors.BRAND_PRIMARY, Colors.BRAND_PRIMARY_LIGHT]}
                                        start={{ x: -0.5, y: 1 }}
                                        end={{ x: 1, y: -0.5 }}
                                        style={{ borderRadius: 25, padding: 12 }}
                                    >
                                        <BrowseIcon />
                                    </LinearGradient>
                                ) : (
                                    <BrowseIcon />
                                )}
                            </Animated.View>
                        );
                    },
                }}
            />
        
        
            <Tabs.Screen
                name="my-jobs"
                options={{
                    title: "My Jobs",
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ color, fontSize: fp(11), fontWeight: focused ? "700" : "400" }}>
                            My Jobs
                        </Text>
                    ),
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
                                        colors={[Colors.BRAND_PRIMARY, Colors.BRAND_PRIMARY_LIGHT]}
                                        start={{ x: -0.5, y: 1 }}
                                        end={{ x: 1, y: -0.5 }}
                                        style={{ borderRadius: 25, padding: 12 }}
                                    >
                                        <JobsIcon />
                                    </LinearGradient>
                                ) : (
                                    <JobsIcon />
                                )}
                            </Animated.View>
                        );
                    },
                }}
            />

           

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ color, fontSize: fp(11), fontWeight: focused ? "700" : "400" }}>
                            Profile
                        </Text>
                    ),
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
                                        colors={[Colors.BRAND_PRIMARY, Colors.BRAND_PRIMARY_LIGHT]}
                                        start={{ x: -0.5, y: 1 }}
                                        end={{ x: 1, y: -0.5 }}
                                        style={{ borderRadius: 25, padding: 12 }}
                                    >
                                        <ProfileIcon />
                                    </LinearGradient>
                                ) : (
                                    <ProfileIcon />
                                )}
                            </Animated.View>
                        );
                    },
                }}
            />

        </Tabs>
    );
}