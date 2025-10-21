import { ChangesType, StatusType } from "@/repositories/changesAPI";
import { Theme } from "@/themes";

type BadgeStyles = {
    bgColor: keyof typeof Theme.colors;
    textColor: keyof typeof Theme.colors;
};

type BadgeColorMap = Record<ChangesType | StatusType, BadgeStyles>;
type ColorMap = Record<ChangesType | StatusType, keyof typeof Theme.colors>;
type TextMap = Record<ChangesType | StatusType, string>;

export const CHANGES_COLOR_VARIANTS: ColorMap = {
    add: "green50",
    remove: "red50",
    update: "yellow50",
    approved: "green50",
    rejected: "red50",
    pending: "transparent",
};

export const CHANGES_TEXT_VARIANTS: TextMap = {
    add: "ADIÇÃO",
    remove: "REMOÇÃO",
    update: "ALTERAÇÃO",
    approved: "APROVADA",
    rejected: "REJEITADA",
    pending: "",
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
        textColor: "yellow70",
    },
    approved: {
        bgColor: "blue20",
        textColor: "blue50",
    },
    rejected: {
        bgColor: "red30",
        textColor: "red80",
    },
    pending: {
        bgColor: "transparent",
        textColor: "transparent",
    },
};
