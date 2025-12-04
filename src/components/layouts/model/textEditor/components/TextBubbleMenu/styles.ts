import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    position: relative;
    right: -13px;
    z-index: 998;
`;

export const BubbleActionsContainer = styled.div`
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray30};
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    width: fit-content;
    height: 30px;
    overflow: hidden;
`;

export const StyledButton = styled.button`
    display: flex;
    width: fit-content;
    min-width: fit-content;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background: transparent;
    cursor: pointer;
    gap: 5px;

    border-right: 1px solid ${({ theme }) => theme.colors.gray30};

    &:last-child {
        border-right: none;
    }

    &:hover {
        background: ${({ theme }) => theme.colors.gray10};
    }

    &:active {
        background: ${({ theme }) => theme.colors.gray20};
    }

    &:focus {
        outline: none;
        background: ${({ theme }) => theme.colors.gray20};
    }
`;

export const RemovedButton = styled.button`
    position: relative;
    display: flex;
    width: fit-content;
    min-width: fit-content;
    height: fit-content;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
    border: none;

    top: 40px;
    right: -5px;
`;
