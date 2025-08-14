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
    hasCloseButton?: boolean;
    hasArrow?: boolean;
    align?: "start" | "center" | "end";
}

const Content = ({
    sideOffset = 5,
    children,
    hasCloseButton = true,
    hasArrow = true,
    align = "start",
}: IContentProps): ReactElement => {
    return (
        <RadixPortal>
            <StyledContent sideOffset={sideOffset} align={align} side="bottom">
                {hasCloseButton && <RadixClose />}
                {hasArrow && <RadixArrow />}
                {children}
            </StyledContent>
        </RadixPortal>
    );
};
Popover.Content = Content;

export { Popover };
