import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 40px;
    min-height: 40px;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};
    overflow: hidden;
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;

    &::-webkit-scrollbar {
        height: 2px !important;
    }

    &::-webkit-scrollbar-track {
        background: transparent !important;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.gray20} !important;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.gray30} !important;
        cursor: pointer;
    }
`;

interface IItemProps {
    active: boolean;
}

export const Item = styled.button<IItemProps>`
    all: unset;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0 10px;
    cursor: pointer;

    color: ${({ theme, active }) => (active ? theme.colors.black : theme.colors.gray70)};

    svg {
        fill: ${({ theme, active }) => (active ? theme.colors.black : theme.colors.gray70)};
    }
`;
