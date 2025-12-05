import { hexToRgba } from "@/utils/hexToRgba";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    height: 100%;
    width: 100%;
    max-width: 100vw;
    align-items: center;
    overflow: hidden;
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    max-width: 100%;
    overflow: hidden;
`;

export const MenuBottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    cursor: pointer;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    height: 100%;
    width: fit-content;
`;

export const TitleContent = styled.div<{ hasTitle: boolean }>`
    display: flex;
    align-items: center;
    width: fit-content;
    max-width: calc(100vw - 407px - 40px - 45px);
    overflow: hidden;
    padding: 1px;
    white-space: nowrap;

    h1 {
        color: ${({ theme, hasTitle }) => (hasTitle ? theme.colors.gray100 : theme.colors.gray70)};
        min-width: 9px;

        [contenteditable="true"] {
            all: unset;
            white-space: pre-wrap;
        }
    }
`;

export const RightContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    min-width: fit-content;
`;

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    background: ${({ theme }) => hexToRgba(theme.colors.purple100, 50)};
    backdrop-filter: blur(4px);
    z-index: 1000;
`;

const iconChange = keyframes`
    0% {
        transform: translateY(0);
    }
    33.33% {
        transform: translateY(-24px);
    }
    66.66% {
        transform: translateY(-48px);
    }
    100% {
        transform: translateY(-72px);
    }
`;

export const IconChangeContainer = styled.div`
    display: flex;
    height: 20px;
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
