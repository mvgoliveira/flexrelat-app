import styled from "@emotion/styled";

export const TopContainer = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
`;

export const ConfigurationContainer = styled.div`
    height: 100%;
    width: 300px;
    min-width: 300px;
    background: ${({ theme }) => theme.colors.white};
    border-right: 1px solid ${props => props.theme.colors.gray40};
`;

export const TabsContainer = styled.div`
    display: flex;
    width: 100%;
    background: ${({ theme }) => theme.colors.gray10};
    height: 30px;
    border-bottom: 1px solid ${props => props.theme.colors.gray40};
`;

export const Tab = styled.button<{ active: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    cursor: pointer;
    background: ${({ active, theme }) => (active ? theme.colors.white : "transparent")};
    border-right: 1px solid ${props => props.theme.colors.gray40};
    gap: 5px;

    &:last-of-type {
        border-right: none;
    }

    &:hover {
        background: ${({ active, theme }) => (active ? theme.colors.white : theme.colors.gray20)};
    }
`;

export const ConfigurationContent = styled.div`
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    height: 370px;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    padding: 20px;
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
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: 100%;
    overflow: auto;

    @media (max-width: 820px) {
        justify-content: flex-start;
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

export const ChartContent = styled.div`
    display: flex;
    padding: 10px;
    position: relative;
    background: ${({ theme }) => theme.colors.white};
`;
