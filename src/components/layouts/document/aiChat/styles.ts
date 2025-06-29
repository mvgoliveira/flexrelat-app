import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const ChangesHeader = styled.header`
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray40};
`;

export const ChangesNumberContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.gray20};
    border-radius: 4px;
    width: 17px;
    height: 17px;
`;

export const MessagesContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px;
    overflow-y: auto;
    height: 100%;
`;
