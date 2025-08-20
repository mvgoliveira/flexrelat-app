import styled from "@emotion/styled";

export const Root = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    width: 100%;
    height: 100%;
`;

interface IStyledGroupProps {
    padding: string;
}

export const StyledGroup = styled.div<IStyledGroupProps>`
    display: flex;
    gap: 5px;
    align-items: center;
    padding: ${({ padding }) => padding};
    border-right: 1px solid ${({ theme }) => theme.colors.gray40};
    height: 100%;
    width: 100%;

    &:last-of-type {
        border-right: none;
    }
`;

export const StyledItem = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: ${({ theme }) => theme.colors.white};
`;

interface IStyledButtonProps {
    active: boolean;
}

export const StyledButton = styled.button<IStyledButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    background: ${({ theme, active }) => (active ? theme.colors.gray30 : theme.colors.white)};
    cursor: pointer;
    position: relative;

    &:hover {
        background: ${({ theme }) => theme.colors.gray10};
    }

    &:active {
        background: ${({ theme }) => theme.colors.gray20};
    }

    &:focus {
        background: ${({ theme }) => theme.colors.gray20};
    }
`;

export const StyledInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
