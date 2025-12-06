import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 5px;
    padding: 0 5px;
    border: 1px solid ${({ theme }) => theme.colors.blue40};
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.blue10};
    max-width: 150px;
    height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    &:active {
        cursor: grabbing;
    }

    p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        user-select: none;
    }
`;

export const CloseButton = styled.div<{ active: boolean }>`
    display: ${({ active }) => (active ? "flex" : "none")};
    border-radius: 2px;
    padding: 2px;

    &:hover {
        background-color: ${({ theme }) => theme.colors.gray20};
    }
`;
