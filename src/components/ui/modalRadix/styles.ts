import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import {
    Overlay as RadixOverlay,
    Content as RadixContent,
    Title as RadixTitle,
} from "@radix-ui/react-alert-dialog";

const overlayShow = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const contentShow = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

export const StyledOverlay = styled(RadixOverlay)`
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(3px);
    position: fixed;
    inset: 0;
    z-index: 997;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }
`;

interface IStyledContentProps {
    width: string;
}

export const StyledContent = styled(RadixContent)<IStyledContentProps>`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    height: max-content;
    box-shadow:
        hsl(206 22% 7% / 35%) 0 10px 38px -10px,
        hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: ${({ width }) => width};
    max-width: 1000px;
    max-height: 85vh;
    overflow: hidden;
    z-index: 998;
    border: 1px solid ${({ theme }) => theme.colors.gray10};
    background: ${({ theme }) => theme.colors.white};
    padding: 20px 10px 20px 20px;
    gap: 20px;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${contentShow} 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @media screen and (max-width: 768px) {
        width: calc(100% - 40px);
    }

    &:focus {
        outline: none;
    }
`;

export const StyledHeader = styled(RadixTitle)`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-right: 10px;
    gap: 20px;
`;

export const ScrollArea = styled.div`
    height: fit-content;
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 10px;

    &::-webkit-scrollbar {
        width: 3px !important;
    }

    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.colors.gray90} !important;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.gray50} !important;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.gray40} !important;
        cursor: pointer;
    }
`;
