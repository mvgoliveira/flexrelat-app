import { Theme } from "@/themes";

export type VariantsType = "primary" | "secondary" | "tertiary";

type InputStyles = {
    backgroundColor: keyof typeof Theme.colors;
    disabledBackgroundColor: keyof typeof Theme.colors;
    fontColor: keyof typeof Theme.colors;
    fontSize: keyof typeof Theme.fontSize;
    placeholderColor: keyof typeof Theme.colors;
    labelColor: keyof typeof Theme.colors;
    disabledFontColor: keyof typeof Theme.colors;
};

type StylesVariantsMap = Record<VariantsType, InputStyles>;

export const INPUT_VARIANT_APPEARANCE: StylesVariantsMap = {
    primary: {
        backgroundColor: "gray10",
        fontColor: "black",
        fontSize: "fs75",
        placeholderColor: "gray60",
        labelColor: "gray70",
        disabledBackgroundColor: "gray10",
        disabledFontColor: "gray50",
    },
    secondary: {
        backgroundColor: "gray80",
        disabledBackgroundColor: "gray70",
        fontColor: "white",
        fontSize: "fs75",
        placeholderColor: "gray50",
        labelColor: "gray40",
        disabledFontColor: "gray30",
    },
    tertiary: {
        backgroundColor: "gray90",
        disabledBackgroundColor: "gray80",
        fontColor: "gray20",
        fontSize: "fs75",
        placeholderColor: "gray60",
        labelColor: "gray50",
        disabledFontColor: "gray40",
    },
};
