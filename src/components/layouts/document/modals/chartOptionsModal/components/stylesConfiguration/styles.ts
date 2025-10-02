import styled from "@emotion/styled";

export const Separator = styled.div`
    min-height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.colors.gray40};
`;

export const InlineContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

interface IStyledButtonProps {
    active: boolean;
}

export const StyledButton = styled.button<IStyledButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    padding: 0;
    margin: 0;
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
