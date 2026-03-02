import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const PlusIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <Path d="M10.0009 4.16675V15.8351" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M15.835 10.0017H4.16663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    );
};


