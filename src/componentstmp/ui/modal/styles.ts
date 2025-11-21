import styled from "@emotion/styled";
import { Modal } from "@mantine/core";

export const ModalRoot = styled(Modal.Root)``;

export const ModalOverlay = styled(Modal.Overlay)``;

export const ModalContent = styled(Modal.Content)`
    overflow: hidden;
`;

export const ModalHeader = styled(Modal.Header)`
    min-height: 0;
    border-bottom: 1px solid ${props => props.theme.colors.gray40};
    padding: 0px 20px;
    height: 50px;

    h2 {
        font-family: ${({ theme }) => theme.fontFamily.inter};
        font-size: ${({ theme }) => theme.fontSize.fs75};
        font-weight: ${({ theme }) => theme.fontWeight.medium};
    }
`;

export const ModalBody = styled(Modal.Body)`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.gray20};
    height: 450px;
    padding: 0;
`;
