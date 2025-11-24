import { Input } from "@/components/features/input";
import { Typography } from "@/components/features/typography";
import { Theme } from "@/themes";
import { ReactElement, useEffect, useState } from "react";
import {
    TbBoxAlignBottom,
    TbBoxAlignBottomFilled,
    TbBoxAlignLeft,
    TbBoxAlignLeftFilled,
    TbBoxAlignRight,
    TbBoxAlignRightFilled,
    TbBoxAlignTop,
    TbBoxAlignTopFilled,
} from "react-icons/tb";

import { ChartColumnData } from "../..";
import { InlineContainer, Separator, StyledButton } from "./styles";

interface IStylesConfigurationProps {
    metadata: ChartColumnData;
    changeChartData: (newData: ChartColumnData) => void;
    chartWidth: number;
    chartHeight: number;
    handleChangeSize: (dimension: "width" | "height", value: number) => void;
}

export const StylesConfiguration = ({
    metadata,
    changeChartData,
    chartWidth,
    chartHeight,
    handleChangeSize,
}: IStylesConfigurationProps): ReactElement => {
    const [legendPosition, setLegendPosition] = useState<"top" | "left" | "bottom" | "right">(
        "top"
    );

    const handleChangeLegendPosition = (position: "top" | "left" | "bottom" | "right") => {
        setLegendPosition(position);

        if (metadata && metadata.options) {
            const newData = { ...metadata };

            if (!newData.options) return;

            newData.options = {
                ...newData.options,
                legend: {
                    ...newData.options.legend,
                    position: position,
                },
            };

            changeChartData(newData);
        }
    };

    useEffect(() => {
        if (metadata) {
            setLegendPosition(metadata.options?.legend?.position || "top");
        }
    }, [metadata]);

    return (
        <>
            <InlineContainer>
                <Typography
                    tag="p"
                    fontSize={{ xs: "fs75" }}
                    color="black"
                    fontWeight="regular"
                    textAlign="left"
                >
                    Posição da Legenda
                </Typography>

                <div style={{ display: "flex", gap: "0px" }}>
                    <StyledButton
                        active={legendPosition === "left"}
                        onClick={() => handleChangeLegendPosition("left")}
                    >
                        {legendPosition === "left" ? (
                            <TbBoxAlignLeftFilled size={15} color={Theme.colors.black} />
                        ) : (
                            <TbBoxAlignLeft size={15} color={Theme.colors.gray70} />
                        )}
                    </StyledButton>

                    <StyledButton
                        active={legendPosition === "top"}
                        onClick={() => handleChangeLegendPosition("top")}
                    >
                        {legendPosition === "top" ? (
                            <TbBoxAlignTopFilled size={15} color={Theme.colors.black} />
                        ) : (
                            <TbBoxAlignTop size={15} color={Theme.colors.gray70} />
                        )}
                    </StyledButton>

                    <StyledButton
                        active={legendPosition === "bottom"}
                        onClick={() => handleChangeLegendPosition("bottom")}
                    >
                        {legendPosition === "bottom" ? (
                            <TbBoxAlignBottomFilled size={15} color={Theme.colors.black} />
                        ) : (
                            <TbBoxAlignBottom size={15} color={Theme.colors.gray70} />
                        )}
                    </StyledButton>

                    <StyledButton
                        active={legendPosition === "right"}
                        onClick={() => handleChangeLegendPosition("right")}
                    >
                        {legendPosition === "right" ? (
                            <TbBoxAlignRightFilled size={15} color={Theme.colors.black} />
                        ) : (
                            <TbBoxAlignRight size={15} color={Theme.colors.gray70} />
                        )}
                    </StyledButton>
                </div>
            </InlineContainer>

            <Separator />

            <Input
                label="Largura do Gráfico (px)"
                placeholder="Insira a largura do gráfico"
                value={String(chartWidth)}
                onChange={e => {
                    handleChangeSize("width", Number(e.target.value));
                }}
                type="number"
            />

            <Input
                label="Altura do Gráfico (px)"
                placeholder="Insira a altura do gráfico"
                value={String(chartHeight)}
                onChange={e => {
                    handleChangeSize("height", Number(e.target.value));
                }}
                type="number"
            />
        </>
    );
};
