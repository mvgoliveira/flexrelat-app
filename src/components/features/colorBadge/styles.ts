import styled from "@emotion/styled";

interface IContainerProps {
    color: string;
    width: number;
    height: number;
    radius: number;
    hasBorder: boolean;
    borderColor: string;
    isClearBadge: boolean;
}

export const StyledColorBadge = styled.button<IContainerProps>`
    display: flex;
    flex-direction: column;
    background: ${({ color }) => color};
    width: ${({ width }) => width}px;
    min-width: ${({ width }) => width}px;
    max-width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    min-height: ${({ height }) => height}px;
    max-height: ${({ height }) => height}px;
    border-radius: ${({ radius }) => radius}px;
    border: ${({ hasBorder, borderColor }) => (hasBorder ? `1px solid ${borderColor}` : "none")};
    cursor: pointer;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    position: relative;

    ${({ isClearBadge }) =>
        isClearBadge &&
        `
        &::after {
            content: "";
            position: absolute;
            left: 0px;
            bottom: 7.5px;
            width: 100%;
            height: 1px;
            transform: rotate(45deg);
            pointer-events: none;
            z-index: 1;
            background: rgba(255, 0, 0, 0.3);
        }
    `}
`;
