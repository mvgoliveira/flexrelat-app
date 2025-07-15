import styled from "@emotion/styled";

export const Root = styled.div<{ zoom: number }>`
    display: flex;
    width: 100%;
    height: 100%;
    max-width: ${({ zoom }) => `${810 * zoom}px`};

    > section {
        grid-template-columns: minmax(100px, 1fr) auto 86px 156px 156px 156px 50px;
        grid-template-rows: 1fr;

        @media (max-width: 1304px) {
            grid-template-columns: minmax(100px, 1fr) auto 86px 156px 156px 50px;

            .ListFormat {
                display: none;
            }
        }

        @media (max-width: 1147px) {
            grid-template-columns: minmax(100px, 1fr) auto 86px 156px 50px;

            .TextAlignment {
                display: none;
            }
        }

        @media (max-width: 994px) {
            grid-template-columns: minmax(100px, 1fr) auto 86px 50px;

            .TextFormat {
                display: none;
            }
        }
    }
`;

interface IColorContainerProps {
    color: string;
}

export const ColorContainer = styled.div<IColorContainerProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 3px;
    background: ${({ color }) => color};
    position: absolute;
    bottom: 6px;
`;

export const FontSizeButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    padding: 0;
    margin: 0;
    background: ${({ theme }) => theme.colors.white};
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.colors.gray10};
    }

    &:active {
        background: ${({ theme }) => theme.colors.gray20};
    }
`;

export const SizeInput = styled.input`
    width: 30px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.gray40};
    font-size: ${({ theme }) => theme.fontSize.fs75};
    color: ${({ theme }) => theme.colors.black};
    background: transparent;
    text-align: center;

    &:focus {
        outline: none;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[type="number"] {
        -moz-appearance: textfield;
    }
`;
