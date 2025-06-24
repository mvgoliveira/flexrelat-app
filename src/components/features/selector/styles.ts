import styled from "@emotion/styled";
import { Icon as SelectIcon } from "@radix-ui/react-select";

import { VARIANTS_STYLES, VariantsType } from "./variants";

export const Root = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    gap: 5px;
`;

interface IStyledButtonProps {
    height: string;
    variant: VariantsType;
}

export const StyledButton = styled.div<IStyledButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${({ height }) => height};
    cursor: pointer;
    width: 100%;
    overflow: hidden;
    background: ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].bgColor]};
    border: 1px solid ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].borderColor]};
    border-radius: 4px;

    > div {
        font-size: ${({ theme }) => theme.fontSize.fs75};
        font-family: ${({ theme }) => theme.fontFamily.inter};
        font-weight: ${({ theme }) => theme.fontWeight.regular};
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        overflow: hidden;

        span {
            overflow: hidden;

            p {
                overflow: hidden;
                text-overflow: ellipsis;
                color: ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].color]};
                font-size: ${({ theme }) => theme.fontSize.fs75};
                white-space: nowrap;
            }
        }
    }

    &:hover {
        background: ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].hoverBgColor]};
        border: 1px solid
            ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].hoverBorderColor]};
    }

    &:active {
        background: ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].activeBgColor]};
        border: 1px solid
            ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].activeBorderColor]};
    }

    &:focus {
        background: ${({ theme, variant }) => theme.colors[VARIANTS_STYLES[variant].activeBgColor]};
    }
`;

export const ProgressContent = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    padding: 0 8px;
    border-radius: 4px 0 0 4px;
    width: 100%;

    align-items: start;
    justify-content: flex-start !important;
`;

export const ProgressArrow = styled.div`
    width: fit-content !important;
    height: fit-content !important;
    padding: 0 4px;
`;

export const IconContainer = styled(SelectIcon)`
    display: flex;
    align-items: center;
    justify-content: center;
`;
