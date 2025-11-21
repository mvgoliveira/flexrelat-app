import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Trigger, Content } from "@radix-ui/react-tooltip";

export const TooltipTrigger = styled(Trigger)`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TooltipContent = styled(Content)`
    ${({ theme }) => css`
        color: ${theme.colors.white};
        font-size: ${theme.fontSize.fs75};
        font-weight: ${theme.fontWeight.regular};
        line-height: ${theme.lineHeight.fs75};
        letter-spacing: ${theme.letterSpacing.fs75};
        background: ${theme.colors.gray90};
        font-family: ${theme.fontFamily.inter};
        padding: 8px 14px;
        border-radius: 5px;
        width: max-content;
        max-width: 320px;
        display: flex;
        flex-flow: row wrap;
        gap: 7px;
        z-index: 999;

        strong {
            background: ${theme.colors.purple50};
            color: ${theme.colors.white};
        }

        > p {
            color: ${theme.colors.gray20};
        }

        @media (max-width: 400px) {
            width: 300px;
        }
    `}
`;
