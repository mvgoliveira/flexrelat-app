import styled from "@emotion/styled";

export const Separator = styled.div`
    min-height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.colors.gray40};
`;

export const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
