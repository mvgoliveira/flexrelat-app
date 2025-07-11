import { ChangesType } from "@/repositories/flexbotApi";
import { Theme } from "@/themes";

type BadgeStyles = {
    bgColor: keyof typeof Theme.colors;
    textColor: keyof typeof Theme.colors;
};

type BadgeColorMap = Record<ChangesType, BadgeStyles>;
type ColorMap = Record<ChangesType, keyof typeof Theme.colors>;
type TextMap = Record<ChangesType, string>;

export const CHANGES_COLOR_VARIANTS: ColorMap = {
    add: "green50",
    remove: "red50",
    update: "yellow50",
};

export const CHANGES_TEXT_VARIANTS: TextMap = {
    add: "ADICIONADO",
    remove: "REMOVIDO",
    update: "ALTERADO",
};

export const CHANGES_BADGE_VARIANTS: BadgeColorMap = {
    add: {
        bgColor: "green30",
        textColor: "green60",
    },
    remove: {
        bgColor: "red30",
        textColor: "red50",
    },
    update: {
        bgColor: "yellow10",
        textColor: "yellow60",
    },
};
