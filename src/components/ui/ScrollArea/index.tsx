import { IReactChildren } from "@/types/core";
import { ReactElement, RefObject } from "react";

import {
    StyledScrollbar,
    StyledScrollCorner,
    StyledScrollRoot,
    StyledScrollThumb,
    StyledScrollViewport,
} from "./styles";

interface IScrollAreaProps {
    scrollArea?: "horizontal" | "vertical" | "both";
    ref: RefObject<HTMLDivElement | null>;
}

export const ScrollArea = ({
    children,
    scrollArea = "both",
    ref,
}: IScrollAreaProps & IReactChildren): ReactElement => {
    return (
        <StyledScrollRoot className="StyledScrollRoot" ref={ref}>
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
