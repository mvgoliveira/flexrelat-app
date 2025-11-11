import { Theme } from "@/themes";

export type VariantsType = "primary" | "secondary" | "tertiary";

type InputStyles = {
    autofillBgColor: keyof typeof Theme.colors;
    labelFontSize: keyof typeof Theme.fontSize;
    padding: string;
    borderColor: keyof typeof Theme.colors;
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
        backgroundColor: "transparent",
        borderColor: "gray70",
        autofillBgColor: "purple110",
        disabledBackgroundColor: "gray80",
        fontColor: "gray10",
        fontSize: "fs75",
        placeholderColor: "gray30",
        labelColor: "gray30",
        disabledFontColor: "gray40",
        padding: "0px 12px",
        labelFontSize: "fs75",
    },
    secondary: {
        backgroundColor: "gray80",
        borderColor: "gray60",
        autofillBgColor: "gray80",
        disabledBackgroundColor: "gray70",
        fontColor: "white",
        fontSize: "fs75",
        placeholderColor: "gray50",
        labelColor: "gray30",
        disabledFontColor: "gray30",
        padding: "0px 12px",
        labelFontSize: "fs75",
    },
    tertiary: {
        backgroundColor: "gray90",
        borderColor: "gray60",
        autofillBgColor: "gray90",
        disabledBackgroundColor: "gray80",
        fontColor: "white",
        fontSize: "fs75",
        placeholderColor: "gray60",
        labelColor: "gray30",
        disabledFontColor: "gray40",
        padding: "0px 12px",
        labelFontSize: "fs50",
    },
};
