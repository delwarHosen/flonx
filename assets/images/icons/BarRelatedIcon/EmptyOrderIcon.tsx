import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const EmptyOrderIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="64" height="41" viewBox="0 0 64 41" fill="none">
            <Path d="M32 40.5C49.6731 40.5 64 37.366 64 33.5C64 29.634 49.6731 26.5 32 26.5C14.3269 26.5 0 29.634 0 33.5C0 37.366 14.3269 40.5 32 40.5Z" fill="#822CE7" fill-opacity="0.2" />
            <Path d="M55 13.26L44.854 1.758C44.367 0.974 43.656 0.5 42.907 0.5H21.093C20.344 0.5 19.633 0.974 19.146 1.757L9 13.261V22.5H55V13.26Z" fill="#822CE7" fill-opacity="0.2" stroke="#822CE7" />
            <Path d="M41.613 16.431C41.613 14.826 42.607 13.501 43.84 13.5H55V31.637C55 33.76 53.68 35.5 52.05 35.5H11.95C10.32 35.5 9 33.759 9 31.637V13.5H20.16C21.393 13.5 22.387 14.823 22.387 16.428V16.45C22.387 18.055 23.392 19.351 24.624 19.351H39.376C40.608 19.351 41.613 18.043 41.613 16.438V16.431Z" fill="#822CE7" fill-opacity="0.2" stroke="#822CE7" />
        </Svg>

    );
};


