import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const UpAngleIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="16" height="16" viewBox="0 0 14 14" fill="none" >
            <Path d="M3.5 8.74997C3.5 8.74997 6.07769 5.25 7 5.25C7.92237 5.25 10.5 8.75 10.5 8.75" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>


    );
};


