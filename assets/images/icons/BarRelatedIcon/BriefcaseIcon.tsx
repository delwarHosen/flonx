import { IconProps } from "@/types/IconTypes";
import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export const BriefcaseIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
            <G clip-path="url(#clip0_638_2482)">
                <Path d="M15.7483 9.3774C15.7483 9.3774 15.75 9.02535 15.75 8.62718C15.75 5.26741 15.75 3.5875 14.7066 2.54375C13.6631 1.5 11.9837 1.5 8.625 1.5C5.26624 1.5 3.58687 1.5 2.54343 2.54375C1.5 3.5875 1.5 5.26741 1.5 8.62718C1.5 11.987 1.5 13.6669 2.54343 14.7107C3.41839 15.5859 4.7405 15.7272 7.125 15.75" stroke="white" stroke-width="1.2" stroke-linecap="round" />
                <Path d="M1.5 5.25H15.75" stroke="white" stroke-width="1.2" stroke-linecap="round" />
                <Path d="M4.5 12H5.25M7.5 9H11.25M4.5 9H5.25" stroke="white" stroke-width="1.2" stroke-linecap="round" />
                <Path d="M12.75 13.875H12.7568" stroke="white" stroke-width="1.2" stroke-linecap="round" />
                <Path d="M16.329 13.5169C16.443 13.6768 16.5 13.7566 16.5 13.875C16.5 13.9934 16.443 14.0732 16.329 14.2331C15.8167 14.9515 14.5084 16.5 12.75 16.5C10.9916 16.5 9.68325 14.9515 9.171 14.2331C9.057 14.0732 9 13.9934 9 13.875C9 13.7566 9.057 13.6768 9.171 13.5169C9.68325 12.7985 10.9916 11.25 12.75 11.25C14.5084 11.25 15.8167 12.7985 16.329 13.5169Z" stroke="white" stroke-width="1.2" stroke-linecap="round" />
            </G>
            <Defs>
                <ClipPath id="clip0_638_2482">
                    <Rect width="18" height="18" fill="white" />
                </ClipPath>
            </Defs>
        </Svg>

    );
};


