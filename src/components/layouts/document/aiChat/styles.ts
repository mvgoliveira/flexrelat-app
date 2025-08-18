import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Splitter, Input } from "antd";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
`;

export const StyledTextArea = styled(Input.TextArea)`
    background: transparent !important;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    font-size: ${({ theme }) => theme.fontSize.fs75} !important;
    font-family: ${({ theme }) => theme.fontFamily.inter} !important;
    padding: 10px !important;
    resize: none !important;

    textarea {
        resize: none !important;
    }

    &:focus {
        box-shadow: none;
        background: transparent;
    }

    &:active {
        background: transparent;
        outline: none;
    }

    &:hover {
        background: transparent;
        outline: none;
    }
`;

export const StyledSplitter = styled(Splitter)`
    height: calc(100vh - 59px - 40px - 78px);
`;

export const StyledSplitterPanel = styled(Splitter.Panel)`
    &::-webkit-scrollbar {
        height: 2px !important;
    }

    &::-webkit-scrollbar-track {
        background: transparent !important;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.gray20} !important;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.gray30} !important;
        cursor: pointer;
    }
`;

export const ChangesHeader = styled.header`
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray40};
`;

export const ChangesNumberContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.gray20};
    border-radius: 4px;
    width: 17px;
    height: 17px;
`;

export const MessagesContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`;

export const MessageInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray40};
    background-color: ${({ theme }) => theme.colors.white};
    height: 100%;
`;

export const InputContainer = styled.div`
    overflow: hidden;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 40px;
    background-color: ${({ theme }) => theme.colors.gray10};
    border: 1px solid ${({ theme }) => theme.colors.gray40};
    border-radius: 4px;
`;

export const IconContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: fit-content;
    height: 100%;
    padding: 10px 10px 8px 10px;
    right: 0;
`;

export const SendButton = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

export const Fallback = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const AiMessageFallback = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    min-height: fit-content;
    gap: 5px;
`;

const typing = keyframes`
    0% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.5;
    }
`;

// animação de digitação
export const TypingAnimation = styled.div`
    p {
        animation: ${typing} 1.5s infinite;
    }
`;

// icon change animation
const iconChange = keyframes`
    0% {
        transform: translateY(0);
    }
    33.33% {
        transform: translateY(-16px);
    }
    66.66% {
        transform: translateY(-32px);
    }
    100% {
        transform: translateY(-48px);
    }
`;

export const IconChangeContainer = styled.div`
    display: flex;
    height: 12px;
    overflow: hidden;
`;

export const IconChangeAnimation = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    animation: ${iconChange} 3s infinite cubic-bezier(0.165, 0.84, 0.44, 1);

    /* Duplicar os ícones para criar o efeito infinito */
    &::after {
        content: "";
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
`;

export const AiLoadingIconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
`;
