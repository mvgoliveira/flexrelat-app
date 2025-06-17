import styled from "@emotion/styled";

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

export const DocumentContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    height: fit-content;

    overflow: auto;

    &::-webkit-scrollbar {
        width: 5px !important;
    }

    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.colors.transparent} !important;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.gray50} !important;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.gray60} !important;
        cursor: pointer;
    }
`;
