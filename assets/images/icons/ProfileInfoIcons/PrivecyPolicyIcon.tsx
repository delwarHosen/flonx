import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const PrivecyPolicyIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <Path d="M11.0737 11.7731L10.3333 14.6667L12 14L13.6667 14.6667L13 11.7325M14 10C14 11.1046 13.1046 12 12 12C10.8954 12 10 11.1046 10 10C10 8.8954 10.8954 8 12 8C13.1046 8 14 8.8954 14 10Z" stroke="#822CE7" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M13.3333 6.66683C13.3333 4.15267 13.3333 2.8956 12.5522 2.11454C11.7712 1.3335 10.5141 1.3335 7.99995 1.3335H7.33335C4.81922 1.3335 3.56215 1.3335 2.7811 2.11454C2.00005 2.89558 2.00005 4.15264 2.00002 6.66678L2 9.33343C1.99998 11.8476 1.99997 13.1047 2.78101 13.8858C3.56207 14.6668 4.81915 14.6668 7.33335 14.6668H8.66662" stroke="#822CE7" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M5 4.6665H10.3333M5 7.99984H8" stroke="#822CE7" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    );
};


