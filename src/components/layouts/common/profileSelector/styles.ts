import styled from "@emotion/styled";

export const StyledTrigger = styled.div`
    display: flex;
    align-items: center;
`;

export const ProfileImage = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.white};
    border-radius: 100%;
    overflow: hidden;
`;
