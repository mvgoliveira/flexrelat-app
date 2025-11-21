import { Theme } from "@/themes";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const Spin = keyframes`
    from { transform: rotate(0deg) } 
    to { transform: rotate(360deg) }
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface ILoadingProps {
    borderColor: keyof typeof Theme.colors;
    spinColor: keyof typeof Theme.colors;
}

export const Loading = styled.div<ILoadingProps>`
    border: 3px solid ${({ theme, borderColor }) => theme.colors[borderColor]};
    border-top: 3px solid ${({ theme, spinColor }) => theme.colors[spinColor]};
    border-radius: 50%;
    width: 22px;
    height: 22px;
    animation: ${Spin} 1s linear infinite;
`;
