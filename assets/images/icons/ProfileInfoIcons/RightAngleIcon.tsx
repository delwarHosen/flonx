import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const RightAngleIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" >
            <Path d="M6.00003 4C6.00003 4 10 6.94593 10 8C10 9.05413 6 12 6 12" stroke={color} stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    );
};


