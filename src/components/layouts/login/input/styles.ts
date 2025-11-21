import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { INPUT_VARIANT_APPEARANCE } from "./constants";
import { IFieldProps } from "./index";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
    width: 100%;
`;

interface ILabelContainerProps {
    variant: "primary" | "secondary" | "tertiary";
}

export const LabelContainer = styled.label<ILabelContainerProps>`
    ${({ theme, variant = "primary" }) => css`
        line-height: 20px;
        font-size: ${theme.fontSize.fs75};
        font-weight: ${theme.fontWeight.regular};
        font-family: ${theme.fontFamily.inter};
        color: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].labelColor]};
    `};
`;

export const InputContainer = styled.div<IFieldProps>`
    ${({ theme, tag, variant = "primary", height }) => css`
        display: flex;
        position: relative;
        background-color: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].backgroundColor]};
        border: 1px solid ${theme.colors.gray60};
        min-height: ${tag === "textarea" ? "100%" : height};
        max-height: ${tag === "textarea" ? "100%" : height};
        padding: 10px 12px;
        border-radius: 4px;
        align-items: center;
        gap: 10px;

        cursor: text;

        &:focus-within {
            border: 1px solid ${theme.colors.gray100};
        }

        &:disabled {
            background: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].disabledBackgroundColor]};
            color: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].disabledFontColor]};
            cursor: not-allowed;
        }
    `}
`;

export const StyledInput = styled("input")<IFieldProps>`
    ${({ theme, variant = "primary" }) => css`
        all: unset;
        background: transparent;
        width: 100%;
        height: 100%;
        font-weight: ${theme.fontWeight.regular};
        font-size: ${theme.fontSize[INPUT_VARIANT_APPEARANCE[variant].fontSize]};
        font-family: ${theme.fontFamily.inter};
        line-height: 20px;
        color: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].fontColor]};
        resize: none;
        flex-grow: 1;

        outline: none;
        border: none;

        &:focus {
            outline: none;
            border: none;
        }

        &::placeholder {
            font-weight: ${theme.fontWeight.regular};
            font-size: ${theme.fontSize.fs75};
            color: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].placeholderColor]};
        }

        &:disabled {
            color: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].disabledFontColor]};
        }

        &:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 1000px
                ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].backgroundColor]} inset !important;
            -webkit-text-fill-color: ${theme.colors[
                INPUT_VARIANT_APPEARANCE[variant].fontColor
            ]} !important;
            background: ${theme.colors[
                INPUT_VARIANT_APPEARANCE[variant].backgroundColor
            ]} !important;
        }

        &[type="number"]::-webkit-inner-spin-button,
        &[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &::-webkit-scrollbar {
            width: 3px !important;
        }

        &::-webkit-scrollbar-track {
            background: ${theme.colors.gray90} !important;
        }

        &::-webkit-scrollbar-thumb {
            background: #616161 !important;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #555 !important;
            cursor: pointer;
        }
    `}
`;

export const ShowPasswordButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    background: transparent;
    margin: 0;
    border: none;
    cursor: pointer;
    padding: 0;
`;
