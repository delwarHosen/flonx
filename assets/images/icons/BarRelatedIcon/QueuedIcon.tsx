import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { Path } from "react-native-svg";

export const QueuedIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
            <Path
                d="M12 12.0002H4C3.37146 12.0002 3.05719 12.0002 2.86193 11.8049C2.66667 11.6096 2.66667 11.2954 2.66667 10.6668C2.66667 10.0383 2.66667 9.72403 2.86193 9.52876C3.05719 9.3335 3.37146 9.3335 4 9.3335H12C12.6285 9.3335 12.9428 9.3335 13.1381 9.52876C13.3333 9.72403 13.3333 10.0383 13.3333 10.6668C13.3333 11.2954 13.3333 11.6096 13.1381 11.8049C12.9428 12.0002 12.6285 12.0002 12 12.0002Z"
                stroke={color} // এখানে হার্ডকোড করা কালার বাদ দিয়ে color প্রপস বসানো হয়েছে
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M2.66667 6.6665H13.3333"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M2.66667 4H13.3333"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};