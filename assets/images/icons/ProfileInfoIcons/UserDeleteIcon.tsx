import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const UserDeleteIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <Path d="M12.2726 12.0601L10.3926 13.9401" stroke="#EF4444" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M12.2726 13.9401L10.3926 12.0601" stroke="#EF4444" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M8.10573 7.24683C8.03906 7.24016 7.95906 7.24016 7.88573 7.24683C6.29906 7.1935 5.03906 5.8935 5.03906 4.2935C5.03906 2.66016 6.35906 1.3335 7.99906 1.3335C9.6324 1.3335 10.9591 2.66016 10.9591 4.2935C10.9524 5.8935 9.6924 7.1935 8.10573 7.24683Z" stroke="#EF4444" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M7.99922 14.54C6.78589 14.54 5.57922 14.2333 4.65922 13.62C3.04589 12.54 3.04589 10.78 4.65922 9.70662C6.49255 8.47995 9.49922 8.47995 11.3326 9.70662" stroke="#EF4444" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>


    );
};


