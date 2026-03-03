import { IconProps } from "@/types/IconTypes";
import React from "react";

export const PrimaryTikmarkIcon = ({
    size = 16,
    color = "#822CE7",
}: IconProps) => {
    return (
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 44.7917C0 69.5296 20.0539 89.5833 44.7917 89.5833C69.5296 89.5833 89.5833 69.5296 89.5833 44.7917C89.5833 20.0539 69.5296 0 44.7917 0C20.0539 0 0 20.0539 0 44.7917ZM64.2738 29.2202C65.97 30.7752 66.0846 33.4109 64.53 35.1072L41.6133 60.1071C40.845 60.945 39.7683 61.4325 38.6321 61.4575C37.4958 61.4821 36.399 61.0417 35.5954 60.2379L25.1787 49.8213C23.5515 48.1942 23.5515 45.5558 25.1787 43.9288C26.8059 42.3017 29.4441 42.3017 31.0713 43.9288L38.4108 51.2683L58.3867 29.4762C59.9417 27.7798 62.5775 27.6653 64.2738 29.2202Z" fill="url(#paint0_linear_353_2753)" />
            <defs>
                <linearGradient id="paint0_linear_353_2753" x1="68.4317" y1="6.22106" x2="23.64" y2="84.6065" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#BB82FF" />
                    <stop offset="1" stop-color="#822CE7" />
                </linearGradient>
            </defs>
        </svg>


    );
};
