import { Theme } from "@/themes";

export type VariantsType = "primary" | "secondary";

type StylesType = {
    bgColor: keyof typeof Theme.colors;
    hoverBgColor: keyof typeof Theme.colors;
    activeBgColor: keyof typeof Theme.colors;

    borderColor: keyof typeof Theme.colors;
    hoverBorderColor: keyof typeof Theme.colors;
    activeBorderColor: keyof typeof Theme.colors;

    color: keyof typeof Theme.colors;
};

export const VARIANTS_STYLES: Record<VariantsType, StylesType> = {
    primary: {
        bgColor: "transparent",
        hoverBgColor: "gray10",
        activeBgColor: "gray20",

        borderColor: "transparent",
        hoverBorderColor: "transparent",
        activeBorderColor: "transparent",

        color: "black",
    },
    secondary: {
        bgColor: "transparent",
        hoverBgColor: "gray10",
        activeBgColor: "gray20",

        borderColor: "transparent",
        hoverBorderColor: "transparent",
        activeBorderColor: "transparent",

        color: "black",
    },
};
