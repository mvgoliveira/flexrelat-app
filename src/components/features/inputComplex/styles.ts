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
        font-size: ${theme.fontSize[INPUT_VARIANT_APPEARANCE[variant].labelFontSize]};
        font-weight: ${theme.fontWeight.regular};
        font-family: ${theme.fontFamily.roboto};
        color: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].labelColor]};
    `};
`;

export const InputContainer = styled.div<IFieldProps>`
    ${({ theme, tag, variant = "primary", height }) => css`
        display: flex;
        position: relative;
        background: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].backgroundColor]};
        border: 1px solid ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].borderColor]};
        min-height: ${tag === "textarea" ? "100%" : height};
        max-height: ${tag === "textarea" ? "100%" : height};
        padding: ${INPUT_VARIANT_APPEARANCE[variant].padding};
        border-radius: 4px;
        align-items: center;
        gap: 10px;

        cursor: text;

        &:focus-within {
            border: 1px solid ${theme.colors.purple50};
            background: transparent;
        }

        /* Quando o input interno for autofill, colorir também o container pai. */
        /* Usa :has() — funciona em navegadores modernos. Mantemos também
           a regra para o pseudo seletor interno do WebKit. */
        &:has(input:-webkit-autofill),
        &:has(input:-internal-autofill-selected) {
            background: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].autofillBgColor]};
        }

        &:disabled {
            background: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].disabledBackgroundColor]};
            color: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].disabledFontColor]};
            cursor: not-allowed;
        }
    `}
`;

// @ts-ignore
export const StyledInput = styled("input")<IFieldProps>`
    ${({ theme, variant = "primary", height }) => css`
        all: unset;
        background: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].backgroundColor]};
        width: 100%;
        height: ${height};
        font-weight: ${theme.fontWeight.regular};
        font-size: ${theme.fontSize[INPUT_VARIANT_APPEARANCE[variant].fontSize]};
        font-family: ${theme.fontFamily.roboto};
        line-height: 20px;
        color: ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].fontColor]};
        resize: none;
        flex-grow: 1;

        outline: none;
        border: none;

        &:focus {
            outline: none;
            border: none;
            background: transparent;
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
                ${theme.colors[INPUT_VARIANT_APPEARANCE[variant].autofillBgColor]} inset !important;
            -webkit-text-fill-color: ${theme.colors[
                INPUT_VARIANT_APPEARANCE[variant].fontColor
            ]} !important;
            background: ${theme.colors[
                INPUT_VARIANT_APPEARANCE[variant].autofillBgColor
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
