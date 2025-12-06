import { IReactChildren } from "@/types/core";
import {
    Root as RadixRoot,
    Trigger as RadixTrigger,
    Arrow as RadixArrow,
    Close as RadixClose,
    Portal as RadixPortal,
} from "@radix-ui/react-popover";
import { ReactElement } from "react";

import { StyledContent } from "./styles";

interface IPopoverProps extends IReactChildren {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const Popover = ({ children, open, onOpenChange }: IPopoverProps): ReactElement => {
    return (
        <RadixRoot open={open} onOpenChange={onOpenChange}>
            {children}
        </RadixRoot>
    );
};

const Trigger = ({ children }: IReactChildren): ReactElement => {
    return <RadixTrigger asChild>{children}</RadixTrigger>;
};
Popover.Trigger = Trigger;

interface IContentProps extends IReactChildren {
    sideOffset?: number;
    alignOffset?: number;
    hasCloseButton?: boolean;
    hasArrow?: boolean;
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
}

const Content = ({
    sideOffset = 5,
    alignOffset = 0,
    children,
    hasCloseButton = true,
    hasArrow = true,
    align = "start",
    side = "bottom",
}: IContentProps): ReactElement => {
    return (
        <RadixPortal>
            <StyledContent
                sideOffset={sideOffset}
                alignOffset={alignOffset}
                align={align}
                side={side}
            >
                {hasCloseButton && <RadixClose />}
                {hasArrow && <RadixArrow />}
                {children}
            </StyledContent>
        </RadixPortal>
    );
};
Popover.Content = Content;

export { Popover };
