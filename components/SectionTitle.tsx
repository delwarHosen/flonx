import { BackIcon } from "@/assets/images/icons/BackIcon";
import { Colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Body1 } from "./typo/Typography";

interface SectionTitleProps {
    title: string;
    containerStyle?: StyleProp<ViewStyle>;
    showBackButton?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    containerStyle,
    showBackButton = true,
}) => {
    const router = useRouter();

    return (
        <View style={[styles.headerRow, containerStyle]}>
            {showBackButton && (
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backIconContainer}
                    activeOpacity={0.7}
                >
                    <BackIcon />
                </TouchableOpacity>
            )}

            <Body1 italic color={Colors.NEUTRAL0} style={styles.headerTitle}>{title}</Body1>
        </View>
    );
};

export default SectionTitle;

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        marginTop:"5%",
        marginBottom:"4%",
        gap: 10,
    },
    backIconContainer: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        height: 43,
        width: 43,
        borderRadius: 23,
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        padding: 10,
    },
    headerTitle: {
        flex: 1,
        marginLeft:"25%"
        // textAlign:"center",
    },
});