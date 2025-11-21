import styled from "@emotion/styled";

export const TableRow = styled.tr`
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray20};
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.gray10};
    }

    &:last-child {
        border-bottom: none;
    }
`;

export const TableCell = styled.td<{ centered?: boolean; maxWidth?: string }>`
    padding: 14px 24px;
    white-space: nowrap;
    text-align: ${({ centered }) => (centered ? "center" : "left")};
    vertical-align: middle;
    max-width: ${({ maxWidth }) => maxWidth || "300px"};

    cursor: pointer;

    p {
        text-align: ${({ centered }) => (centered ? "center" : "left")};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.gray20};
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
