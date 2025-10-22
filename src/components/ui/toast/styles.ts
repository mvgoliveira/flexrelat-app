import { css } from "@emotion/react";
import styled from "@emotion/styled";
import * as Toast from "@radix-ui/react-toast";

import { Variants, VARIANTS_CONFIG } from "./index";

export const ToastProvider = styled(Toast.Provider)``;

export const ToastRoot = styled(Toast.Root)<{
    variant: Variants;
}>`
    padding: 18px 22px;
    border-radius: 4px;
    box-shadow:
        hsl(206 22% 7% / 35%) 0 10px 38px -10px,
        hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    display: flex;
    align-items: center;
    z-index: 999;

    ${({ theme, variant }) => css`
        background: linear-gradient(
            100deg,
            ${theme.colors.red70},
            ${theme.colors.red50},
            ${theme.colors.red60},
            ${theme.colors.red50},
            ${theme.colors.red70}
        );
        font-family: ${theme.fontFamily.inter};
        border: 1px solid ${theme.colors[VARIANTS_CONFIG[variant].borderColor]};
    `};

    &[data-state="open"] {
        animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    &[data-state="closed"] {
        animation: hide 100ms ease-in;
    }

    &[data-swipe="move"] {
        transform: translateX(25);
    }

    &[data-swipe="cancel"] {
        transform: translateX(0);
        transition: transform 200ms ease-out;
    }

    &[data-swipe="end"] {
        animation: swipeOut 100ms ease-out;
    }

    @keyframes hide {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    @keyframes slideIn {
        from {
            transform: translateX(calc(100% + 25px));
        }
        to {
            transform: translateX(0);
        }
    }

    @keyframes swipeOut {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(calc(100% + 25px));
        }
    }
`;

export const ToastIcon = styled.div`
    width: 40px;
    height: 30px;
    display: flex;
    align-items: center;
`;

export const ToastTitle = styled(Toast.Title)`
    ${({ theme }) => css`
        color: ${theme.colors.white};
        font-family: ${theme.fontFamily.inter};
        font-size: ${theme.fontSize.fs100};
        font-weight: ${theme.fontWeight.semibold};
    `};
`;

export const ToastDescription = styled(Toast.Description)`
    ${({ theme }) => css`
        color: ${theme.colors.gray30};
        font-family: ${theme.fontFamily.inter};
        font-size: ${theme.fontSize.fs75};
        font-weight: ${theme.fontWeight.medium};
        line-height: 20px;
    `};
`;

export const ToastAction = styled(Toast.Action)``;

export const ToastViewport = styled(Toast.Viewport)`
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 500px;
    max-width: 100vw;
    margin: 0;
    list-style: none;
    z-index: 9999;
    outline: none;
    padding: 25px;
`;

export const ToastClose = styled(Toast.Close)`
    width: 50px;
    height: 30px;
    background: none;
    display: flex;
    align-items: center;
    justify-content: end;
    cursor: pointer;
`;
