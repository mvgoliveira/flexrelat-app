import styled from "@emotion/styled";

export const Root = styled.div`
    display: grid;
    grid-template-rows: 60px 1fr;
    grid-template-columns: 300px 1fr 300px;
    height: 100%;
`;

export const StyledHeader = styled.header`
    grid-column: 1 / -1;
    grid-row: 1;
    display: flex;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};
`;

export const StyledContent = styled.article`
    grid-row: 2 / -1;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

export const StyledLeftNavbar = styled.article`
    grid-row: 2 / -1;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    border-right: 1px solid ${({ theme }) => theme.colors.gray30};
`;

export const StyledRightNavbar = styled.article`
    grid-row: 2 / -1;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    border-left: 1px solid ${({ theme }) => theme.colors.gray30};
`;

export const NavbarHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 40px;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};
    overflow: hidden;
`;

export const NavHeaderContainer = styled.div`
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

interface INavHeaderItemProps {
    active: boolean;
}

export const NavHeaderItem = styled.button<INavHeaderItemProps>`
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
