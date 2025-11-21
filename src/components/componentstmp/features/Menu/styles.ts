import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray40};
    border-radius: 6px;
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    overflow: hidden;
`;

export const StyledItem = styled.button`
    all: unset;
    padding: 8px 16px;
    cursor: pointer;
    gap: 8px;
    display: flex;
    align-items: center;
    justify-content: start;
    background: ${({ theme }) => theme.colors.white};
    border-top: 1px solid ${({ theme }) => theme.colors.gray20};

    &:first-of-type {
        border-top: none;
    }

    &:hover {
        background: ${({ theme }) => theme.colors.gray10};
    }

    &:active {
        background: ${({ theme }) => theme.colors.gray20};
    }
`;
