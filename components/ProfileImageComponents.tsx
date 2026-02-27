import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import React from "react";
import {
    ImageSourcePropType,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import { Body1 } from "./typo/Typography";

interface ProfileImageProps {
    image: ImageSourcePropType;
    icon?: React.ReactNode;
    name?: string;
    onIconPress?: () => void;
}

const ProfileImageComponent: React.FC<ProfileImageProps> = ({
    image,
    icon,
    name,
    onIconPress,
}) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} contentFit="cover" />

                {icon && (
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={onIconPress}
                        activeOpacity={0.8}
                    >
                        {icon}
                    </TouchableOpacity>
                )}
            </View>

            {name && <Body1 color={Colors.NEUTRAL0} style={styles.title}>{name}</Body1>}
        </View>
    );
};

export default ProfileImageComponent;

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
        marginBottom:16
    },
    imageContainer: {
        position: "relative",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 24,
    },
    iconContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: Colors.BRAND_PRIMARY,
        padding: 6,
        borderRadius: 20,
        elevation: 3,
    },
    title: {
        marginTop: 12
    },
});