import { GigIcon, HomeIcon, OrderTabIcon, ProfileIcon, SearchBarIcon } from "@/assets/images/icons/icon";
import { Colors } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useRef } from "react";
import { BackHandler, Platform } from "react-native";
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming
} from "react-native-reanimated";

export default function TabsLayout() {
    const router = useRouter();
    const tabHistory = useRef<string[]>(['home']);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (tabHistory.current.length > 1) {
                    tabHistory.current.pop();
                    const prevTab = tabHistory.current[tabHistory.current.length - 1];
                    router.replace(`/customer/(tabs)/${prevTab}` as any);
                    return true;
                }
                return false;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

    return (
        <Tabs
            screenListeners={{
                tabPress: (e) => {
                    const tabName = e.target?.split('-')[0];
                    if (tabName && tabHistory.current[tabHistory.current.length - 1] !== tabName) {
                        tabHistory.current.push(tabName);
                    }
                },
            }}
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
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarLabel: "Home",
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
                            <Animated.View style={animatedStyle}>
                                {focused ? (
                                    <LinearGradient
                                        colors={[Colors.BRAND_PRIMARY, Colors.BRAND_PRIMARY_LIGHT]}
                                        start={{ x: -0.5, y: 1 }}
                                        end={{ x: 1, y: -0.5 }}
                                        style={{ borderRadius: 25, padding: 12 }}
                                    >
                                        <HomeIcon />
                                    </LinearGradient>
                                ) : (
                                    <HomeIcon />
                                )}
                            </Animated.View>
                        );
                    },
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarLabel: "Search",
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
                            <Animated.View style={animatedStyle}>
                                {focused ? (
                                    <LinearGradient
                                        colors={[Colors.BRAND_PRIMARY, Colors.BRAND_PRIMARY_LIGHT]}
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
                name="orders"
                options={{
                    title: "Orders",
                    tabBarLabel: "Orders",
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
                            <Animated.View style={animatedStyle}>
                                {focused ? (
                                    <LinearGradient
                                        colors={[Colors.BRAND_PRIMARY, Colors.BRAND_PRIMARY_LIGHT]}
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

            <Tabs.Screen
                name="gigs"
                options={{
                    title: "Gigs",
                    tabBarLabel: "Gigs",
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
                            <Animated.View style={animatedStyle}>
                                {focused ? (
                                    <LinearGradient
                                        colors={[Colors.BRAND_PRIMARY, Colors.BRAND_PRIMARY_LIGHT]}
                                        start={{ x: -0.5, y: 1 }}
                                        end={{ x: 1, y: -0.5 }}
                                        style={{ borderRadius: 25, padding: 12 }}
                                    >
                                        <GigIcon />
                                    </LinearGradient>
                                ) : (
                                    <GigIcon />
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
                    tabBarLabel: "Profile",
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
                            <Animated.View style={animatedStyle}>
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