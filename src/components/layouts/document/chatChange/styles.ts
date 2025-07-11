import { ChangesType } from "@/repositories/flexbotApi";
import styled from "@emotion/styled";

import { CHANGES_BADGE_VARIANTS, CHANGES_COLOR_VARIANTS } from "./variants";

interface IActiveProps {
    active: boolean;
}

interface IVariantsProps {
    variant: ChangesType;
    status: "pending" | "approved" | "rejected";
}

export const Root = styled.button<IVariantsProps & IActiveProps>`
    display: flex;
    width: 100%;
    border: 1px solid
        ${({ theme, variant, active }) =>
            active ? theme.colors[CHANGES_COLOR_VARIANTS[variant]] : theme.colors.gray40};
    cursor: ${({ status }) => (status === "pending" ? "pointer" : "default")};
    background: ${({ theme, active }) => (active ? theme.colors.gray10 : theme.colors.gray10)};
    border-radius: 4px;
    margin: 0;
    padding: 0;
`;

export const ColorContainer = styled.div<IVariantsProps>`
    width: 5px;
    min-width: 5px;
    min-height: 100%;
    background: ${({ theme, variant }) => theme.colors[CHANGES_COLOR_VARIANTS[variant]]};
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    padding: 10px;
    gap: 10px;
`;

export const StyledCheckBox = styled.div<IVariantsProps & IActiveProps>`
    display: ${({ status }) => (status === "pending" ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: ${({ theme, variant, active }) =>
        active ? theme.colors[CHANGES_COLOR_VARIANTS[variant]] : theme.colors.transparent};
    border: 1px solid
        ${({ theme, variant, active }) =>
            active ? theme.colors[CHANGES_COLOR_VARIANTS[variant]] : theme.colors.gray50};
`;

export const StyledBadge = styled.div<IVariantsProps>`
    display: flex;
    border-radius: 4px;
    padding: 4px 6px;
    width: fit-content;
    background: ${({ theme, variant }) => theme.colors[CHANGES_BADGE_VARIANTS[variant].bgColor]};
`;

export const StyledSmlButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.colors.gray20};
    }
`;
