import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 200px;
    flex-grow: 1;
    height: 200px;
    border: 1px solid ${({ theme }) => theme.colors.gray40};
    border-radius: 4px;
    transition: background-color 0.2s ease;
    cursor: pointer;
    overflow: hidden;

    &:hover {
        background-color: ${({ theme }) => theme.colors.gray10};
    }
`;

export const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray40};
    background: ${({ theme }) => theme.colors.gray10};
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
`;

export const Dot = styled.div`
    width: 3px;
    height: 3px;
    background: ${({ theme }) => theme.colors.gray70};
    border-radius: 100%;
`;

export const ProfileImage = styled.div`
    width: 15px;
    min-width: 15px;
    height: 15px;
    min-height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 100%;
    overflow: hidden;
`;
