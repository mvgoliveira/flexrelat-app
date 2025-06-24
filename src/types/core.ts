import { Theme } from "@/themes";
import { ReactNode } from "react";

export interface IReactChildren {
    children: ReactNode | ReactNode[];
}

export interface ISVGsDynamicColor {
    color?: keyof typeof Theme.colors;
}

export interface ISVGsDynamicSize {
    size?: number;
}

export interface ISVGsDynamicColorAndSize extends ISVGsDynamicColor, ISVGsDynamicSize {}
