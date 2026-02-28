import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const ProfileLockIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" >
            <Path d="M9.32788 10H9.33268M6.66602 10H6.67082" stroke="#822CE7" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M3.33398 10.0002C3.33398 7.42283 5.42332 5.3335 8.00065 5.3335C10.578 5.3335 12.6673 7.42283 12.6673 10.0002C12.6673 12.5775 10.578 14.6668 8.00065 14.6668C5.42332 14.6668 3.33398 12.5775 3.33398 10.0002Z" stroke="#822CE7" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M11 6.3335V4.3335C11 2.67664 9.65687 1.3335 8 1.3335C6.34315 1.3335 5 2.67664 5 4.3335V6.3335" stroke="#822CE7" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>


    );
};


