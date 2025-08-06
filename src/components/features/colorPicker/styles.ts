import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray40};
    border-radius: 4px;
    padding: 8px;
    gap: 8px;
    width: 200px;
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
