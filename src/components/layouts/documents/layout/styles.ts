import styled from "@emotion/styled";

export const Root = styled.div`
    display: grid;
    grid-template-rows: 60px 1fr;
    grid-template-columns: auto 1fr auto;
    height: 100vh;
    max-height: 100vh;
    background: ${({ theme }) => theme.colors.gray10};
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
    overflow: hidden;
`;

export const StyledLeftNavbar = styled.article`
    grid-row: 2 / -1;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 300px;
    background-color: ${({ theme }) => theme.colors.white};
    border-right: 1px solid ${({ theme }) => theme.colors.gray30};
    overflow: hidden;
`;

export const StyledRightNavbar = styled.article`
    grid-row: 2 / -1;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 300px;
    background-color: ${({ theme }) => theme.colors.white};
    border-left: 1px solid ${({ theme }) => theme.colors.gray30};
    overflow: hidden;
`;
