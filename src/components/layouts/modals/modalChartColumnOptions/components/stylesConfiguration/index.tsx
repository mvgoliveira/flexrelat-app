import { Typography } from "@/components/features/typography";
import { Switch } from "@/components/ui/switch";
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
import { Separator, InlineContainer, StyledButton } from "./styles";

interface IStylesConfigurationProps {
    metadata: ChartColumnData;
    changeChartData: (newData: ChartColumnData) => void;
}

export const StylesConfiguration = ({
    metadata,
    changeChartData,
}: IStylesConfigurationProps): ReactElement => {
    const [fillState, setFillState] = useState<boolean>(false);
    const [showLinesState, setShowLinesState] = useState<boolean>(true);
    const [smoothCurvesState, setSmoothCurvesState] = useState<boolean>(false);
    const [legendPosition, setLegendPosition] = useState<"top" | "left" | "bottom" | "right">(
        "top"
    );

    const handleChangeFill = (value: boolean) => {
        setFillState(value);

        if (value) {
            handleChangeShowLines(true);
        }

        if (metadata && metadata.data && metadata.data.datasets) {
            const newData = { ...metadata };
            newData.data.datasets = newData.data.datasets.map(dataset => ({
                ...dataset,
                fill: value,
            }));

            changeChartData(newData);
        }
    };

    const handleChangeShowLines = (value: boolean) => {
        setShowLinesState(value);

        if (!value) {
            handleChangeFill(false);
        }

        if (metadata && metadata.data && metadata.data.datasets) {
            const newData = { ...metadata };
            newData.data.datasets = newData.data.datasets.map(dataset => ({
                ...dataset,
                showLine: value,
            }));

            changeChartData(newData);
        }
    };

    const handleChangeSmoothCurves = (value: boolean) => {
        setSmoothCurvesState(value);

        if (metadata && metadata.data && metadata.data.datasets) {
            const newData = { ...metadata };
            newData.data.datasets = newData.data.datasets.map(dataset => ({
                ...dataset,
                lineTension: value ? 0.4 : 0,
            }));

            changeChartData(newData);
        }
    };

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
            setFillState(!!metadata.data.datasets[0].fill);

            setShowLinesState(
                metadata.data.datasets[0].showLine !== undefined
                    ? metadata.data.datasets[0].showLine
                    : true
            );
            setSmoothCurvesState(
                !!(
                    metadata.data.datasets[0].lineTension &&
                    metadata.data.datasets[0].lineTension > 0
                )
            );
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
                    Preencher Linhas
                </Typography>

                <Switch
                    size="small"
                    checked={fillState}
                    onClick={() => handleChangeFill(!fillState)}
                />
            </InlineContainer>

            <InlineContainer>
                <Typography
                    tag="p"
                    fontSize={{ xs: "fs75" }}
                    color="black"
                    fontWeight="regular"
                    textAlign="left"
                >
                    Mostrar Linhas
                </Typography>

                <Switch
                    size="small"
                    checked={showLinesState}
                    onClick={() => handleChangeShowLines(!showLinesState)}
                />
            </InlineContainer>

            <InlineContainer>
                <Typography
                    tag="p"
                    fontSize={{ xs: "fs75" }}
                    color="black"
                    fontWeight="regular"
                    textAlign="left"
                >
                    Curvas Suaves
                </Typography>

                <Switch
                    size="small"
                    checked={smoothCurvesState}
                    onClick={() => handleChangeSmoothCurves(!smoothCurvesState)}
                />
            </InlineContainer>

            <Separator />

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
        </>
    );
};
