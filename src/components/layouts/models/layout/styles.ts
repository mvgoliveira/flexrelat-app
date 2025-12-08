import styled from "@emotion/styled";

export const Root = styled.div`
    display: grid;
    grid-template-columns: 280px 1fr;
    height: 100vh;
    max-height: 100vh;
    background: ${({ theme }) => theme.colors.white};
`;

export const SecondaryRoot = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    gap: 5px;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.gray10};
`;

export const StyledNavbar = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    border-right: 1px solid ${({ theme }) => theme.colors.gray30};
    overflow: hidden;
`;

export const StyledNavbarItem = styled.div<{ active: boolean }>`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
    width: 100%;
    border-radius: 8px;
    background: ${({ active, theme }) => (active ? theme.colors.gray20 : "transparent")};

    &:hover {
        background: ${({ theme, active }) => (active ? theme.colors.gray20 : theme.colors.gray10)};
    }
`;

export const StyledContent = styled.article`
    display: grid;
    grid-template-rows: 50px 1fr;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: auto;
`;

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;
    height: 100%;
    overflow: auto;
    gap: 40px;
`;

export const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};
    align-items: center;
    padding: 0 20px;
`;
