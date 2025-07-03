import styled from "@emotion/styled";

export const Root = styled.div<{ zoom: number }>`
    display: flex;
    width: 100%;
    height: 100%;
    max-width: ${({ zoom }) => `${810 * zoom}px`};

    > section {
        grid-template-columns: minmax(100px, 1fr) 86px 156px 156px 156px 50px;
        grid-template-rows: 1fr;

        @media (max-width: 1304px) {
            grid-template-columns: minmax(100px, 1fr) 86px 156px 156px 50px;

            .ListFormat {
                display: none;
            }
        }

        @media (max-width: 1147px) {
            grid-template-columns: minmax(100px, 1fr) 86px 156px 50px;

            .TextAlignment {
                display: none;
            }
        }

        @media (max-width: 994px) {
            grid-template-columns: minmax(100px, 1fr) 86px 50px;

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
