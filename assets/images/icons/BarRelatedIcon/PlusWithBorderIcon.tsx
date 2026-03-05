import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const PlusWithBorderIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
            <Path d="M1.875 9.00004C1.875 5.64124 1.875 3.96187 2.91843 2.91844C3.96187 1.875 5.64124 1.875 9 1.875C12.3587 1.875 14.0381 1.875 15.0816 2.91844C16.125 3.96187 16.125 5.64124 16.125 9.00004C16.125 12.3588 16.125 14.0382 15.0816 15.0816C14.0381 16.125 12.3587 16.125 9 16.125C5.64124 16.125 3.96187 16.125 2.91843 15.0816C1.875 14.0382 1.875 12.3588 1.875 9.00004Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M9 6V12M12 9.00004H6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    );
};


