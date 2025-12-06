import styled from "@emotion/styled";

export const Container = styled.div<{ active: boolean }>`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    border-radius: 4px;
    background: ${({ theme, active }) => (active ? theme.colors.purple10 : theme.colors.white)};
    border: 1px solid
        ${({ theme, active }) => (active ? theme.colors.purple40 : theme.colors.gray40)};
    padding: 8px 12px;
    align-items: center;
    cursor: pointer;

    :hover {
        background: ${({ theme, active }) =>
            active ? theme.colors.purple10 : theme.colors.gray10};
    }
`;
