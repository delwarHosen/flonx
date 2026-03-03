import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const CrossIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <Path d="M12.0215 12.0201L21.9224 21.921" stroke="#8C88A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M21.9231 12.0208L12.0222 21.9217" stroke="#8C88A3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
};


