import React from 'react';
import { Text, TextProps } from 'react-native';


export type TypographyVariant =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "body3"
    | "caption1"
    | "caption2"
    | "caption3"
    | "button"


export type TypographyWeight =
    | 'regular'
    | 'medium'
    | 'semiBold'
    | 'bold'
    | "extraBold"

interface TypographyProps extends TextProps {
    variant?: TypographyVariant;
    weight?: TypographyWeight;
    color: string,
    align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    children: React.ReactNode;
    italic?: boolean;
}

const Typography: React.FC<TypographyProps> = ({
    variant = "body1",
    weight = "reguler",
    color = "#333333",
    align = "left",
    children,
    style,
    italic = false,
    ...props
}) => {

    const getFontSize = () => {
        switch (variant) {
            case "h1": return 42;
            case "h2": return 32;
            case "h3": return 28;
            case "h4": return 24;
            case "h5": return 20;
            case "h6": return 17;
            case "body1": return 16;
            case "body2": return 15;
            case "body3": return 14;
            case "caption1": return 14;
            case "caption2": return 12;
            case "caption3": return 10;
            case 'button': return 14;
            default: return 16;
        }
    }


    const getFontWeight = () => {
        switch (weight) {
            case "regular": return "400";
            case "medium": return "500";
            case "semiBold": return "600";
            case "bold": return "700";
            default: return "400";
        }
    }


    const getLineHeight = () => {
        switch (variant) {
            case "h1": return 42;
            case "h2": return 32;
            case "h3": return 28;
            case "h4": return 24;
            case "h5": return 20;
            case "h6": return 17;
            case "body1": return 16;
            case "body2": return 15;
            case "body3": return 14;
            case "caption1": return 14;
            case "caption2": return 12;
            case "caption3": return 10;
            case 'button': return 14;
            default: return 16;
        }
    }

    return (
        <Text
            style={[
                {
                    fontSize: getFontSize(),
                    fontWeight: getFontWeight(),
                    lineHeight: getLineHeight(),
                    color,
                    textAlign: align,
                     fontStyle: italic ? "italic" : "normal" 
                },
                style
            ]}
            {...props}
        >
            {children}
        </Text>
    )
}

export const H1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="h1" weight="bold" {...props} />
);

export const H2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="h2" weight="bold" {...props} />
);

export const H3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="h3" weight="bold" {...props} />
);

export const H4: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="h4" weight="bold" {...props} />
);

export const H5: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="h5" weight="bold" {...props} />
);

export const H6: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="h6" weight="semiBold" {...props} />
);

export const Body1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="body1" weight="semiBold" {...props} />
);

export const Body2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="body2" weight="medium" {...props} />
);

export const Body3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="body3" weight="medium" {...props} />
);

export const Caption1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="caption1" weight="regular" {...props} />
);

export const Caption2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="caption2" weight="semiBold" {...props} />
);

export const Caption3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="caption3" weight="semiBold" {...props} />
);

export const ButtonText: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
    <Typography variant="button" weight="semiBold" {...props} />
);

export default Typography;