import { Theme } from "@/themes";

export type VARIANTS = "primary" | "secondary" | "tertiary" | "quaternary";

export type VARIANT_STYLES = {
    $color: keyof typeof Theme.colors;

    $bgColor: keyof typeof Theme.colors;
    $hoverBgColor: keyof typeof Theme.colors;
    $activeBgColor: keyof typeof Theme.colors;

    $borderColor: keyof typeof Theme.colors;
    $hoverBorderColor: keyof typeof Theme.colors;

    $disabledBgColor: keyof typeof Theme.colors;
    $disabledColor: keyof typeof Theme.colors;

    $justifyContent: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
};

export type VARIANTS_MAP = Record<VARIANTS, VARIANT_STYLES>;

export const VARIANTS_STYLES: VARIANTS_MAP = {
    primary: {
        $color: "white",
        $justifyContent: "center",

        $bgColor: "purple50",
        $hoverBgColor: "purple60",
        $activeBgColor: "purple80",

        $borderColor: "gray100",
        $hoverBorderColor: "gray100",

        $disabledBgColor: "gray40",
        $disabledColor: "gray20",
    },
    secondary: {
        $color: "white",
        $justifyContent: "center",

        $bgColor: "gray80",
        $hoverBgColor: "gray90",
        $activeBgColor: "gray100",

        $borderColor: "transparent",
        $hoverBorderColor: "transparent",

        $disabledBgColor: "gray40",
        $disabledColor: "gray20",
    },
    tertiary: {
        $color: "white",
        $justifyContent: "space-between",

        $bgColor: "gray90",
        $hoverBgColor: "gray80",
        $activeBgColor: "gray90",

        $borderColor: "gray70",
        $hoverBorderColor: "gray70",

        $disabledBgColor: "gray40",
        $disabledColor: "gray20",
    },
    quaternary: {
        $color: "white",
        $justifyContent: "center",

        $bgColor: "gray80",
        $hoverBgColor: "gray70",
        $activeBgColor: "gray100",

        $borderColor: "transparent",
        $hoverBorderColor: "transparent",

        $disabledBgColor: "gray40",
        $disabledColor: "gray20",
    },
};
