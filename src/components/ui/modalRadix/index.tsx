import { IReactChildren } from "@/types/core";
import { Root as RadixRoot, Portal as RadixPortal } from "@radix-ui/react-alert-dialog";
import { ReactElement } from "react";

import { ScrollArea, StyledContent, StyledHeader, StyledOverlay } from "./styles";

interface IModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClickOverlay?: () => void;
    width?: string;
}

const Modal = ({
    children,
    open,
    onOpenChange,
    onClickOverlay,
    width = "90vw",
}: IReactChildren & IModalProps): ReactElement => {
    return (
        <RadixRoot open={open} onOpenChange={onOpenChange}>
            <RadixPortal>
                <StyledOverlay onClick={onClickOverlay} />
                <StyledContent width={width}>{children}</StyledContent>
            </RadixPortal>
        </RadixRoot>
    );
};

const Header = ({ children }: IReactChildren): ReactElement => {
    return <StyledHeader>{children}</StyledHeader>;
};
Modal.Header = Header;

const Content = ({ children }: IReactChildren): ReactElement => {
    return <ScrollArea>{children}</ScrollArea>;
};
Modal.Content = Content;

export { Modal };
