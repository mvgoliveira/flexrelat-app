import styled from "@emotion/styled";

import { VARIANTS, VARIANTS_STYLES } from "./variants";

interface IButtonProps {
    variant: VARIANTS;
    height: string;
    width: string;
}

export const StyledButton = styled.button<IButtonProps>`
    display: flex;
    align-items: center;
    justify-content: ${({ variant }) => VARIANTS_STYLES[variant].$justifyContent};
    width: ${({ width }) => width};
    min-width: ${({ width }) => `calc(${width})`};
    height: ${({ height }) => height};
    min-height: ${({ height }) => height};
    border-radius: 4px;
    cursor: pointer;
    background: ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].$bgColor]};
    border: 1px solid ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].$borderColor]};
    gap: 5px;
    padding: 0 10px;

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

        p {
            color: ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].$disabledColor]};
        }
    }
`;

export const ButtonContainer = styled.div<IButtonProps>`
    display: flex;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
`;
