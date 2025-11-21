import { IReactChildren } from "@/types/core";
import { Modal as MantineModal } from "@mantine/core";
import { ReactElement } from "react";

import { ModalBody, ModalContent, ModalHeader, ModalRoot } from "./styles";

interface IModalProps extends IReactChildren {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

export const Modal = ({ isOpen, onClose, title, children }: IModalProps): ReactElement => {
    return (
        <ModalRoot opened={isOpen} onClose={onClose} centered size={850}>
            <MantineModal.Overlay />

            <ModalContent>
                <ModalHeader>
                    <MantineModal.Title>{title}</MantineModal.Title>

                    <MantineModal.CloseButton size="sm" />
                </ModalHeader>

                <ModalBody>{children}</ModalBody>
            </ModalContent>
        </ModalRoot>
    );
};
