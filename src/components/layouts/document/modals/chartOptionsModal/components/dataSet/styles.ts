import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 35px;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray40};
    padding: 0 10px;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.colors.gray10};
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 200px;
    border-right: 1px solid ${({ theme }) => theme.colors.gray40};
    border-left: 1px solid ${({ theme }) => theme.colors.gray40};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray40};
`;
