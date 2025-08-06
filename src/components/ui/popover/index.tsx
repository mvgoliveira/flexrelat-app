import { IReactChildren } from "@/types/core";
import {
    Root as RadixRoot,
    Trigger as RadixTrigger,
    Content as RadixContent,
    Arrow as RadixArrow,
    Close as RadixClose,
    Portal as RadixPortal,
} from "@radix-ui/react-popover";
import { ReactElement } from "react";

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
    hasCloseButton?: boolean;
    hasArrow?: boolean;
}

const Content = ({
    children,
    hasCloseButton = true,
    hasArrow = true,
}: IContentProps): ReactElement => {
    return (
        <RadixPortal>
            <RadixContent sideOffset={5} align="start" side="bottom">
                {hasCloseButton && <RadixClose />}
                {hasArrow && <RadixArrow />}
                {children}
            </RadixContent>
        </RadixPortal>
    );
};
Popover.Content = Content;

export { Popover };
