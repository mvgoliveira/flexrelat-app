import { Theme } from "@/themes";

export type VARIANTS = "primary" | "secondary" | "tertiary" | "quaternary";

export type VARIANT_STYLES = {
    $bgColor: keyof typeof Theme.colors;
    $hoverBgColor: keyof typeof Theme.colors;
    $activeBgColor: keyof typeof Theme.colors;

    $borderColor: keyof typeof Theme.colors;
    $hoverBorderColor: keyof typeof Theme.colors;

    $disabledBgColor: keyof typeof Theme.colors;
};

export type VARIANTS_MAP = Record<VARIANTS, VARIANT_STYLES>;

export const VARIANTS_STYLES: VARIANTS_MAP = {
    primary: {
        $bgColor: "gray90",
        $hoverBgColor: "gray80",
        $activeBgColor: "gray100",

        $borderColor: "transparent",
        $hoverBorderColor: "transparent",

        $disabledBgColor: "gray40",
    },
    secondary: {
        $bgColor: "transparent",
        $hoverBgColor: "gray10",
        $activeBgColor: "gray20",

        $borderColor: "gray40",
        $hoverBorderColor: "gray40",

        $disabledBgColor: "gray20",
    },
    tertiary: {
        $bgColor: "transparent",
        $hoverBgColor: "gray20",
        $activeBgColor: "gray10",

        $borderColor: "transparent",
        $hoverBorderColor: "transparent",

        $disabledBgColor: "transparent",
    },
    quaternary: {
        $bgColor: "gray80",
        $hoverBgColor: "gray70",
        $activeBgColor: "gray100",

        $borderColor: "transparent",
        $hoverBorderColor: "transparent",

        $disabledBgColor: "gray40",
    },
};
