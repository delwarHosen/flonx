import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const MinusIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="15" height="2" viewBox="0 0 15 2" fill="none" >
            <Path d="M14.0833 0.75H0.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>


    );
};


