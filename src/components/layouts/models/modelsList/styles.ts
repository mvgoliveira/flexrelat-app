import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    gap: 15px;
`;

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
`;

export const EmptyState = styled.div`
    display: flex;
    grid-column: 1 / -1;
    width: 100%;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: center;
    height: 100%;
    height: 300px;
    background: ${({ theme }) => theme.colors.gray10};
`;

export const DocumentItemEmptyState = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 200px;
    max-width: 250px;
    flex-grow: 1;
    height: 200px;
    border: 1px solid ${({ theme }) => theme.colors.gray40};
    border-radius: 4px;
    transition: background-color 0.2s ease;
    overflow: hidden;

    &:hover {
        background-color: ${({ theme }) => theme.colors.gray10};
    }
`;
