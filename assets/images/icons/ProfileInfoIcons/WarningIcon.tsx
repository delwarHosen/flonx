import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const WarningIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 18 18" fill="none" >
            <Path d="M1.875 9C1.875 5.64124 1.875 3.96187 2.91843 2.91843C3.96187 1.875 5.64124 1.875 9 1.875C12.3587 1.875 14.0381 1.875 15.0816 2.91843C16.125 3.96187 16.125 5.64124 16.125 9C16.125 12.3587 16.125 14.0381 15.0816 15.0816C14.0381 16.125 12.3587 16.125 9 16.125C5.64124 16.125 3.96187 16.125 2.91843 15.0816C1.875 14.0381 1.875 12.3587 1.875 9Z" stroke="#EF4444" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M9 6V9.375" stroke="#EF4444" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M9 11.9912V11.9995" stroke="#EF4444" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
};


