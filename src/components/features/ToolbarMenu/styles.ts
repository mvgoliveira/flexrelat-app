import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray40};
    border-radius: 6px;
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.01),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 5px;
`;
