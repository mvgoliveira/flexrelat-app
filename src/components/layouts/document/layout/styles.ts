import styled from "@emotion/styled";

export const Root = styled.div`
    display: grid;
    grid-template-rows: 60px 1fr;
    grid-template-columns: 300px 1fr 300px;
    height: 100vh;
    max-height: 100vh;
    overflow: hidden;
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
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    border-right: 1px solid ${({ theme }) => theme.colors.gray30};
    overflow: hidden;
`;

export const StyledRightNavbar = styled.article`
    grid-row: 2 / -1;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    border-left: 1px solid ${({ theme }) => theme.colors.gray30};
    overflow: hidden;
`;
