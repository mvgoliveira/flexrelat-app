import styled from "@emotion/styled";

export const TopContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`;

export const ConfigurationContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 300px;
    min-width: 300px;
    background: ${({ theme }) => theme.colors.white};
    padding: 15px;
    border-right: 1px solid ${props => props.theme.colors.gray40};
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.gray40};
    margin: 15px 0;
`;

export const ConfigurationContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    gap: 20px;

    &::-webkit-scrollbar {
        width: 5px !important;
    }

    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.colors.gray10} !important;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.gray40} !important;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.gray50} !important;
        cursor: pointer;
    }
`;

export const ChartContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.gray20};

    > div {
        width: 100%;
    }

    .cm-gutterElement {
        font-size: ${({ theme }) => theme.fontSize.fs50};
    }
`;

export const BottomContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    gap: 10px;
    width: 100%;
    padding: 0 10px;
    border-top: 1px solid ${props => props.theme.colors.gray40};
    background: ${({ theme }) => theme.colors.white};
`;
