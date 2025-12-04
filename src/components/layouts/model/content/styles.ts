import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Root = styled.div`
    display: grid;
    grid-template-rows: 40px 1fr;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const ModelHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};
    overflow: hidden;
`;

export const ModelRoot = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    overflow: hidden;
`;

export const ModelFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
    border-top: 1px solid ${({ theme }) => theme.colors.gray30};
    padding: 0 10px;
`;

export const FloatContainer = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: fit-content;
    height: fit-content;
    z-index: 99;
`;

export const PageContainer = styled.div`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        background: ${theme.colors.white};
        border: 1px solid ${theme.colors.gray40};
        border-radius: 6px;
    `};
`;
