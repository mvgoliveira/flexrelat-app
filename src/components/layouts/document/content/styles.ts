import styled from "@emotion/styled";

export const Root = styled.div`
    display: grid;
    grid-template-rows: 40px 1fr;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const DocumentHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};
    overflow: hidden;
`;

export const DocumentRoot = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    overflow: hidden;
`;
