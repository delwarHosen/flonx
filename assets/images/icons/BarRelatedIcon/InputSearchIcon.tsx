import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const InputSearchIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" >
            <Path d="M9.91667 9.91675L12.25 12.2501" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M11.0833 6.41667C11.0833 3.83934 8.99401 1.75 6.41667 1.75C3.83934 1.75 1.75 3.83934 1.75 6.41667C1.75 8.99401 3.83934 11.0833 6.41667 11.0833C8.99401 11.0833 11.0833 8.99401 11.0833 6.41667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
};


