import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    height: fit-content;
`;

interface IStyledInputProps {
    hasError: boolean;
}

export const StyledInput = styled.input<IStyledInputProps>`
    width: 100%;
    background: transparent;
    background: ${({ theme, hasError }) => (hasError ? theme.colors.red10 : "transparent")};
    font-family: ${({ theme }) => theme.fontFamily.inter};
    font-size: ${({ theme }) => theme.fontSize.fs75};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.colors.black};
    border: 1px solid
        ${({ theme, hasError }) => (hasError ? theme.colors.red50 : theme.colors.gray50)};
    border-radius: 4px;
    padding: 7px 10px;

    &::placeholder {
        color: ${({ theme }) => theme.colors.gray70};
    }
`;
