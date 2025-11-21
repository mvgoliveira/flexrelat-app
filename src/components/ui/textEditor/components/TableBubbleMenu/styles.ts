import styled from "@emotion/styled";

export const Root = styled.div`
    position: relative;
    width: 0;
    height: 0;
    z-index: 998;
`;

export const InsertButton = styled.button<{
    top?: string;
    right?: string;
    left?: string;
    bottom?: string;
}>`
    position: absolute;
    display: flex;
    width: fit-content;
    min-width: fit-content;
    height: 24px;
    align-items: center;
    justify-content: center;
    padding: 0px;
    margin: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
    border: none;
    transition: all 0.2s ease;
    border-radius: 4px;

    &:hover {
        background: ${({ theme }) => theme.colors.purple10};
    }

    ${({ top }) => top && `top: ${top};`}
    ${({ right }) => right && `right: ${right};`}
    ${({ left }) => left && `left: ${left};`}
    ${({ bottom }) => bottom && `bottom: ${bottom};`}
`;
