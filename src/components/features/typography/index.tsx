import { Theme } from "@/themes";
import { IReactChildren } from "@/types/core";
import React, { ReactElement, RefObject } from "react";

import { StyledTypography } from "./styles";

type FontSizeBreakpoints = {
    xs?: keyof typeof Theme.fontSize;
    sm?: keyof typeof Theme.fontSize;
    md?: keyof typeof Theme.fontSize;
    lg?: keyof typeof Theme.fontSize;
    xl?: keyof typeof Theme.fontSize;
    xxl?: keyof typeof Theme.fontSize;
};

export interface ITypography extends IReactChildren {
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "pre";
    color?: keyof typeof Theme.colors;
    fontWeight?: keyof typeof Theme.fontWeight;
    fontSize?: FontSizeBreakpoints;
    fontFamily?: keyof typeof Theme.fontFamily;
    textAlign?: "left" | "right" | "center";
    contentEditable?: boolean;
    onBlur?: () => void;
    onChange?: () => void;
    onClick?: () => void;
    ref?: RefObject<HTMLHeadingElement | null>;
}

const Typography = ({
    tag = "p",
    color = "white",
    fontWeight = "regular",
    fontFamily = "inter",
    fontSize = {
        xs: "fs100",
        sm: "fs100",
        md: "fs100",
        lg: "fs100",
        xl: "fs100",
        xxl: "fs100",
    },
    textAlign = "left",
    contentEditable = false,
    ref,
    onBlur,
    onChange,
    onClick,
    children,
}: ITypography): ReactElement => {
    let size: keyof typeof Theme.fontSize | undefined = "fs100";
    const BREAK_POINTS = ["xs", "sm", "md", "lg", "xl", "xxl"];

    BREAK_POINTS.map((key: string) => {
        if (fontSize[key as keyof typeof fontSize] !== undefined) {
            size = fontSize[key as keyof typeof fontSize];
        } else if (fontSize[key as keyof typeof fontSize] === undefined) {
            fontSize[key as keyof typeof fontSize] = size;
        }
    });

    return (
        // @ts-ignore
        <StyledTypography
            ref={ref}
            as={tag}
            tag={tag}
            color={color}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            textAlign={textAlign}
            fontSize={fontSize}
            contentEditable={contentEditable}
            suppressContentEditableWarning
            onBlur={onBlur}
            onInput={onChange}
            onClick={onClick}
        >
            {children}
        </StyledTypography>
    );
};

export { Typography };
