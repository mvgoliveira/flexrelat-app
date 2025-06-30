import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    min-height: fit-content;
    gap: 5px;
`;

export const ProfilePicture = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gray90};
`;

export const ProfileContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;
