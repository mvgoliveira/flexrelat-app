import { Typography } from "@/components/features/typography";
import { Switch } from "@/components/ui/switch";
import { ReactElement, useEffect, useState } from "react";

import { ChartLineData } from "../..";
import { InlineContainer } from "../stylesConfiguration/styles";
import { Separator } from "./styles";

interface IGeneralConfigurationProps {
    metadata: ChartLineData;
    changeChartData: (newData: ChartLineData) => void;
}

export const GeneralConfiguration = ({
    metadata,
    changeChartData,
}: IGeneralConfigurationProps): ReactElement => {
    const [dataLabelsState, setDataLabelsState] = useState<boolean>(false);
    const [legendState, setLegendState] = useState<boolean>(false);
    const [xScaleLabelState, setXScaleLabelState] = useState<boolean>(false);
    const [yScaleLabelState, setYScaleLabelState] = useState<boolean>(false);

    const handleChangeDataLabels = (dataValue: boolean) => {
        setDataLabelsState(dataValue);

        if (metadata && metadata.data && metadata.data.datasets) {
            const newData = { ...metadata };
            newData.data.datasets = newData.data.datasets.map(dataset => ({
                ...dataset,
                datalabels: {
                    display: dataValue,
                    color: "#000000",
                    backgroundColor: "rgba(220, 220, 220, 0.8)",
                    borderColor: "rgba(220, 220, 220, 1.0)",
                    borderWidth: 1,
                    borderRadius: 5,
                    anchor: "end",
                    align: "top",
                },
            }));

            changeChartData(newData);
        }
    };

    const handleChangeLegend = (legendValue: boolean) => {
        setLegendState(legendValue);

        if (metadata && metadata.options) {
            const newData = { ...metadata };

            if (!newData.options) return;

            newData.options = {
                ...newData.options,
                legend: legendValue
                    ? {
                          ...metadata.options.legend,
                          display: true,
                      }
                    : {
                          ...metadata.options.legend,
                          display: false,
                      },
            };

            changeChartData(newData);
        }
    };

    const handleChangeScaleLabel = (axis: "x" | "y", displayValue: boolean) => {
        if (metadata && metadata.options) {
            const newData = { ...metadata };

            if (!newData.options) return;

            if (axis === "x") {
                newData.options = {
                    ...newData.options,
                    scales: {
                        ...newData.options.scales,
                        xAxes: [
                            {
                                ...newData.options.scales?.xAxes?.[0],
                                scaleLabel: {
                                    ...newData.options.scales?.xAxes?.[0]?.scaleLabel,
                                    display: displayValue,
                                },
                            },
                        ],
                    },
                };
                setXScaleLabelState(displayValue);
            }

            if (axis === "y") {
                newData.options = {
                    ...newData.options,
                    scales: {
                        ...newData.options.scales,
                        yAxes: [
                            {
                                ...newData.options.scales?.yAxes?.[0],
                                scaleLabel: {
                                    ...newData.options.scales?.yAxes?.[0]?.scaleLabel,
                                    display: displayValue,
                                },
                            },
                        ],
                    },
                };
                setYScaleLabelState(displayValue);
            }

            changeChartData(newData);
        }
    };

    useEffect(() => {
        if (metadata) {
            setDataLabelsState(metadata.data.datasets[0]?.datalabels?.display ? true : false);
            setLegendState(metadata.options?.legend.display ? true : false);
            setXScaleLabelState(
                metadata.options?.scales?.xAxes?.[0]?.scaleLabel?.display ? true : false
            );
            setYScaleLabelState(
                metadata.options?.scales?.yAxes?.[0]?.scaleLabel?.display ? true : false
            );
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
                    Rótulo de Dados
                </Typography>

                <Switch
                    size="small"
                    checked={dataLabelsState}
                    onClick={() => handleChangeDataLabels(!dataLabelsState)}
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
                    Rótulo do Eixo X
                </Typography>

                <Switch
                    size="small"
                    checked={xScaleLabelState}
                    onClick={() => handleChangeScaleLabel("x", !xScaleLabelState)}
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
                    Rótulo do Eixo Y
                </Typography>

                <Switch
                    size="small"
                    checked={yScaleLabelState}
                    onClick={() => handleChangeScaleLabel("y", !yScaleLabelState)}
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
                    Legenda
                </Typography>

                <Switch
                    size="small"
                    checked={legendState}
                    onClick={() => handleChangeLegend(!legendState)}
                />
            </InlineContainer>

            <Separator />
        </>
    );
};
