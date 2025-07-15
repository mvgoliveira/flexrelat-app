import { css } from "@emotion/react";
import styled from "@emotion/styled";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const TriggerButton = styled.button`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: ${theme.colors.white};
        border: 1px solid ${theme.colors.gray40};
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        z-index: 999;

        &:hover {
            background: ${theme.colors.white};
        }

        &:focus {
            outline: 1px solid ${theme.colors.purple40};
        }
    `};
`;

export const DropdownContent = styled(DropdownMenu.Content)`
    ${({ theme }) => css`
        min-width: 192px;
        padding: 8px;
        background: ${theme.colors.white};
        border: 1px solid ${theme.colors.gray40};
        border-radius: 6px;
        box-shadow:
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        z-index: 50;
        animation: fadeIn 0.2s ease;
    `};

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;

export const InputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
`;

export const ZoomInputWrapper = styled.div<{ isDragging: boolean }>`
    ${({ theme }) => css`
        flex: 1;
        position: relative;
        display: flex;
        align-items: center;
        border: 1px solid ${theme.colors.gray40};
        border-radius: 4px;
        transition: border-color 0.2s ease;

        &:focus-within {
            border-color: ${theme.colors.purple40};
        }

        &:hover {
            border-color: ${theme.colors.purple40};
        }
    `};
`;

export const ZoomInput = styled.input`
    flex: 1;
    padding: 4px 8px;
    font-size: 14px;
    border: none;
    background: transparent;
    user-select: none;

    &:focus {
        outline: none;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[type="number"] {
        -moz-appearance: textfield;
    }
`;

export const InputLabel = styled.span<{ isDragging: boolean }>`
    ${({ theme, isDragging }) => css`
        font-size: 12px;
        color: ${theme.colors.gray70};
        color: ${isDragging ? theme.colors.purple40 : theme.colors.gray70};
        font-family: ${theme.fontFamily.inter};
        cursor: ew-resize;
        transition: color 0.2s ease;
        pointer-events: auto;

        &:hover {
            color: ${theme.colors.purple40};
        }
    `};
`;

export const MenuItem = styled(DropdownMenu.Item)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover,
    &:focus {
        background: ${({ theme }) => theme.colors.gray20};
        outline: none;
    }
`;

export const IconGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const PresetItem = styled(MenuItem)`
    justify-content: space-between;
`;

export const ActiveIndicator = styled.div`
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.colors.purple40};
    border-radius: 50%;
`;

export const Separator = styled(DropdownMenu.Separator)`
    height: 1px;
    background: ${({ theme }) => theme.colors.gray20};
    margin: 4px 0;
`;
