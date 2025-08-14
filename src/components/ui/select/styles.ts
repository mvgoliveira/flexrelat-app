import { css } from "@emotion/react";
import styled from "@emotion/styled";
import * as Select from "@radix-ui/react-select";

export const StyledRoot = styled(Select.Root)`
    display: flex;
    width: 100%;
`;

export const StyledTrigger = styled(Select.Trigger)`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    &[data-placeholder] {
        color: ${({ theme }) => theme.colors.gray40};
    }
`;

interface IStyledContentProps {
    width: number;
}

export const StyledContent = styled(Select.Content)<IStyledContentProps>`
    ${({ theme, width }) => css`
        overflow: hidden;
        background: ${theme.colors.white};
        border-radius: 8px;
        box-shadow:
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border: 1px solid ${theme.colors.gray30};
        z-index: 999;
        min-width: 200px;
        width: ${`${width}px`};

        &[data-state="checked"] {
            font-weight: ${theme.fontWeight.bold};
        }
    `}
`;

export const StyledViewport = styled(Select.Viewport)`
    padding: 10px;
    z-index: 9999;
`;

export const StyledItem = styled(Select.Item)`
    ${({ theme }) => css`
        all: unset;
        color: ${theme.colors.black};
        display: flex;
        align-items: center;
        min-height: 30px;
        gap: 10px;
        padding: 5px 10px;
        border-radius: 5px;
        position: relative;
        user-select: none;
        border: 1px solid transparent;
        font-family: ${theme.fontFamily.inter};

        &[data-disabled] {
            color: ${theme.colors.gray50};
            pointer-events: none;
        }

        &[data-highlighted] {
            cursor: pointer;
            background: ${theme.colors.gray10};
        }
    `}
`;

export const StyledLabel = styled(Select.Label)`
    ${({ theme }) => css`
        height: 36px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        font-size: ${theme.fontSize.fs50};
        font-family: ${theme.fontFamily.inter};
        font-weight: ${theme.fontWeight.regular};
        line-height: ${theme.lineHeight.fs75};
        color: ${theme.colors.gray60};
    `}
`;

export const StyledSeparator = styled(Select.Separator)`
    height: 1px;
    margin: 5px;
    background: ${({ theme }) => theme.colors.gray50};
`;
