import styled from "@emotion/styled";

import { VARIANTS, VARIANTS_STYLES } from "./variants";

interface IButtonProps {
    variant: VARIANTS;
    height: string;
    width: string;
    padding: string;
    hasShadow: boolean;
}

export const StyledButton = styled.button<IButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ width }) => width};
    min-width: ${({ width }) => `calc(${width})`};
    height: ${({ height }) => height};
    min-height: ${({ height }) => height};
    border-radius: 6px;
    cursor: pointer;
    background: ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].$bgColor]};
    border: 1px solid ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].$borderColor]};
    gap: 5px;
    padding: ${({ padding }) => padding};
    box-shadow: ${({ hasShadow }) => (hasShadow ? "0px 1px 1px rgba(0, 0, 0, 0.1)" : "none")};

    &:hover {
        background: ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].$hoverBgColor]};

        border-color: ${({ theme, variant }) =>
            theme.colors[VARIANTS_STYLES[variant].$hoverBorderColor]};
    }

    &:active {
        background: ${({ theme, variant }) =>
            theme.colors[VARIANTS_STYLES[variant].$activeBgColor]};
    }

    &:disabled {
        background: ${({ theme, variant }) =>
            theme.colors[VARIANTS_STYLES[variant].$disabledBgColor]};
        cursor: not-allowed;
    }
`;

interface IButtonContainerProps {
    height: string;
    width: string;
}

export const ButtonContainer = styled.div<IButtonContainerProps>`
    display: flex;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`;
