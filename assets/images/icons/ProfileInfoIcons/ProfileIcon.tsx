import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const ProfileIcon = ({
    size = 12,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" >
            <Path d="M8.10573 7.24683C8.03906 7.24016 7.95906 7.24016 7.88573 7.24683C6.29906 7.1935 5.03906 5.8935 5.03906 4.2935C5.03906 2.66016 6.35906 1.3335 7.99906 1.3335C9.6324 1.3335 10.9591 2.66016 10.9591 4.2935C10.9524 5.8935 9.6924 7.1935 8.10573 7.24683Z" stroke="#822CE7" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M4.7725 9.7065C3.15917 10.7865 3.15917 12.5465 4.7725 13.6198C6.60583 14.8465 9.6125 14.8465 11.4458 13.6198C13.0592 12.5398 13.0592 10.7798 11.4458 9.7065C9.61917 8.4865 6.6125 8.4865 4.7725 9.7065Z" stroke="#822CE7" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    );
};