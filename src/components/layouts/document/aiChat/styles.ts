import styled from "@emotion/styled";

export const Root = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
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
    gap: 20px;
    padding: 20px;
`;

export const MessageInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray40};
    background-color: ${({ theme }) => theme.colors.white};
    min-height: 135px;
`;

export const InputContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.gray10};
    border: 1px solid ${({ theme }) => theme.colors.gray40};
    border-radius: 4px;
    padding: 10px;
    gap: 20px;
`;

export const IconContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: fit-content;
    height: 100%;
`;

export const Fallback = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;
