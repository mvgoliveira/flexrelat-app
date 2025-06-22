import { IReactChildren } from "@/types/core";
import { ReactElement } from "react";

import {
    StyledScrollbar,
    StyledScrollCorner,
    StyledScrollRoot,
    StyledScrollThumb,
    StyledScrollViewport,
} from "./styles";

interface IScrollAreaProps {
    scrollArea?: "horizontal" | "vertical" | "both";
}

export const ScrollArea = ({
    children,
    scrollArea = "both",
}: IScrollAreaProps & IReactChildren): ReactElement => {
    return (
        <StyledScrollRoot className="StyledScrollRoot">
            <StyledScrollViewport className="StyledScrollViewport">{children}</StyledScrollViewport>

            {scrollArea === "vertical" ||
                (scrollArea === "both" && (
                    <StyledScrollbar orientation="vertical">
                        <StyledScrollThumb />
                    </StyledScrollbar>
                ))}

            {scrollArea === "horizontal" ||
                (scrollArea === "both" && (
                    <StyledScrollbar orientation="horizontal">
                        <StyledScrollThumb />
                    </StyledScrollbar>
                ))}
            <StyledScrollCorner />
        </StyledScrollRoot>
    );
};
