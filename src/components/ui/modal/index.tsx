import { IReactChildren } from "@/types/core";
import { Modal as MantineModal } from "@mantine/core";
import { ReactElement } from "react";

import { ModalBody, ModalContent, ModalHeader, ModalRoot, ModalTitle } from "./styles";

interface IModalProps extends IReactChildren {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    icon?: ReactElement;
}

export const Modal = ({ isOpen, onClose, title, icon, children }: IModalProps): ReactElement => {
    return (
        <ModalRoot opened={isOpen} onClose={onClose} centered size={850}>
            <MantineModal.Overlay />

            <ModalContent>
                <ModalHeader>
                    <ModalTitle>
                        {icon} {title}
                    </ModalTitle>

                    <MantineModal.CloseButton size="sm" />
                </ModalHeader>

                <ModalBody>{children}</ModalBody>
            </ModalContent>
        </ModalRoot>
    );
};
