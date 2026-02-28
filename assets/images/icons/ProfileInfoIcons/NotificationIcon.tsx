import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const NotificationIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" >
            <Path d="M8 4.29346V6.51346" stroke="#822CE7" stroke-miterlimit="10" stroke-linecap="round" />
            <Path d="M8.01327 1.3335C5.55993 1.3335 3.57327 3.32016 3.57327 5.7735V7.1735C3.57327 7.62683 3.3866 8.30683 3.15327 8.6935L2.3066 10.1068C1.7866 10.9802 2.1466 11.9535 3.1066 12.2735C6.29326 13.3335 9.73993 13.3335 12.9266 12.2735C13.8266 11.9735 14.2133 10.9202 13.7266 10.1068L12.8799 8.6935C12.6466 8.30683 12.4599 7.62016 12.4599 7.1735V5.7735C12.4533 3.3335 10.4533 1.3335 8.01327 1.3335Z" stroke="#822CE7" stroke-miterlimit="10" stroke-linecap="round" />
            <Path d="M10.2193 12.5469C10.2193 13.7669 9.2193 14.7669 7.9993 14.7669C7.39263 14.7669 6.83263 14.5135 6.43263 14.1135C6.03263 13.7135 5.7793 13.1535 5.7793 12.5469" stroke="#822CE7" stroke-miterlimit="10" />
        </Svg>


    );
};


