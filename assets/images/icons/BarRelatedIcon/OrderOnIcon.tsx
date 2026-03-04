import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const OrderONIcons = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="20" height="20" viewBox="0 0 16 16" fill="none" >
            <Path d="M10.6663 1.3335V4.00016M5.33301 1.3335V4.00016" stroke="#822CE7" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M8.66667 2.6665H7.33333C4.81917 2.6665 3.5621 2.6665 2.78105 3.44755C2 4.2286 2 5.48568 2 7.99984V9.33317C2 11.8473 2 13.1044 2.78105 13.8854C3.5621 14.6665 4.81917 14.6665 7.33333 14.6665H8.66667C11.1808 14.6665 12.4379 14.6665 13.2189 13.8854C14 13.1044 14 11.8473 14 9.33317V7.99984C14 5.48568 14 4.2286 13.2189 3.44755C12.4379 2.6665 11.1808 2.6665 8.66667 2.6665Z" stroke="#822CE7" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M2 6.6665H14" stroke="#822CE7" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M10.333 10.3333V11.6667M11.333 11C11.333 11.5523 10.8853 12 10.333 12C9.78074 12 9.33301 11.5523 9.33301 11C9.33301 10.4477 9.78074 10 10.333 10C10.8853 10 11.333 10.4477 11.333 11Z" stroke="#822CE7" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>


    );
};


