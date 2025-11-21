import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    gap: 15px;
`;

export const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    max-height: 500px;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.gray30};
    border-radius: 8px;
    overflow-x: auto;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.colors.gray20};
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.gray50};
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.gray60};
    }
`;

export const Table = styled.table`
    width: 100%;
    min-width: 800px;
    border-collapse: collapse;
    border-spacing: 0;
`;

export const TableHead = styled.thead`
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: ${({ theme }) => theme.colors.gray10};
`;

export const TableBody = styled.tbody``;

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

export const TableHeaderCell = styled.th<{ centered?: boolean; maxWidth?: string }>`
    padding: 14px 24px;
    text-align: ${({ centered }) => (centered ? "center" : "left")};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray30};
    white-space: nowrap;
    max-width: ${({ maxWidth }) => maxWidth || "300px"};

    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.colors.gray20};
    }
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 300px;
`;
