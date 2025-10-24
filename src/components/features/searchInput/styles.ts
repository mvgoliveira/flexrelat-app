import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    gap: 10px;
    border: 1px solid ${({ theme }) => theme.colors.gray60};
    padding: 0 0 0 10px;
`;

export const StyledInput = styled.input`
    width: 100%;
    height: 100%;
    background: transparent;
    font-family: ${({ theme }) => theme.fontFamily.inter};
    font-size: ${({ theme }) => theme.fontSize.fs75};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.colors.black};

    &::placeholder {
        color: ${({ theme }) => theme.colors.gray60};
    }
`;

export const StyledIcon = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
