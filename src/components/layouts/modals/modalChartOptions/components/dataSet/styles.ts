import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Header = styled.div<{ isOpen: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 35px;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray40};
    border-bottom: ${({ isOpen, theme }) => (isOpen ? "none" : `1px solid ${theme.colors.gray40}`)};
    padding: 0 10px;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.colors.gray10};
    }
`;

export const Container = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    height: 168px;
    overflow-x: hidden;
    overflow-y: auto;
    background: ${({ theme }) => theme.colors.gray10};
    border-right: 1px solid ${({ theme }) => theme.colors.gray40};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray40};

    font-family: ${({ theme }) => theme.fontFamily.inter};
    font-size: ${({ theme }) => theme.fontSize.fs75};

    .jss_worksheet {
        border: 0 !important;
        width: 100% !important;
        height: 100% !important;
    }

    .jss_content {
        padding-bottom: 0 !important;
        padding-right: 0 !important;
        width: 100% !important;
        margin-bottom: -5px;
    }

    .jss_container {
        padding-right: 0 !important;
        padding-bottom: 0 !important;
    }
`;
