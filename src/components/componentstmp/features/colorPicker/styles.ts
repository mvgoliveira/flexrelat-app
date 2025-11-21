import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray40};
    padding: 8px;
    gap: 8px;
    width: 200px;
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

export const PresetContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 4px;
`;

export const Divider = styled.div`
    height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.colors.gray20};
`;

export const SelectorContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;
