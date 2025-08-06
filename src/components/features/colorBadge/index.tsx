import { Theme } from "@/themes";
import { HTMLAttributes, ReactElement } from "react";

import { StyledColorBadge } from "./styles";

interface IColorBadgeProps extends HTMLAttributes<HTMLButtonElement> {
    color: string;
    width?: number;
    height?: number;
    radius?: number;
    hasBorder?: boolean;
    borderColor?: string;
    isClearBadge?: boolean;
}

export const ColorBadge = ({
    color,
    width = 18,
    height = 18,
    radius = 4,
    hasBorder = false,
    borderColor = Theme.colors.gray20,
    isClearBadge = false,
    ...props
}: IColorBadgeProps): ReactElement => {
    return (
        <StyledColorBadge
            color={color}
            width={width}
            height={height}
            radius={radius}
            hasBorder={hasBorder}
            borderColor={borderColor}
            isClearBadge={isClearBadge}
            {...props}
        />
    );
};
