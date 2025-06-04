import styled from "@emotion/styled";

export const Root = styled.div`
    display: grid;
    grid-template-rows: 60px 1fr;
    grid-template-columns: 1fr;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    padding: 0 20px;
    background: ${({ theme }) => theme.colors.white};
`;
