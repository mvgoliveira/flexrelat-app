import { Typography } from "@/components/features/typography";
import { Switch } from "@/components/ui/switch";
import { ReactElement, useEffect, useState } from "react";

import { ChartColumnData } from "../..";
import { InlineContainer } from "../stylesConfiguration/styles";
import { Separator } from "./styles";

interface IGeneralConfigurationProps {
    metadata: ChartColumnData;
    changeChartData: (newData: ChartColumnData) => void;
}

export const GeneralConfiguration = ({
    metadata,
    changeChartData,
}: IGeneralConfigurationProps): ReactElement => {
    const [stackedState, setStackedState] = useState<boolean>(false);
    const [dataLabelsState, setDataLabelsState] = useState<boolean>(false);
    const [legendState, setLegendState] = useState<boolean>(false);
    const [xScaleLabelState, setXScaleLabelState] = useState<boolean>(false);
    const [yScaleLabelState, setYScaleLabelState] = useState<boolean>(false);

    const handleChangeStacked = (stackedValue: boolean) => {
        setStackedState(stackedValue);
        handleChangeDataLabels(dataLabelsState);

        if (metadata && metadata.options) {
            const newData = { ...metadata };

            if (!newData.options) return;

            newData.options = {
                ...newData.options,
                scales: {
                    ...metadata.options.scales,
                    xAxes: [
                        {
                            ...newData.options.scales?.xAxes?.[0],
                            stacked: stackedValue,
                        },
                    ],
                    yAxes: [
                        {
                            ...newData.options.scales?.yAxes?.[0],
                            stacked: stackedValue,
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            };

            changeChartData(newData);
        }
    };

    const handleChangeDataLabels = async (dataValue: boolean) => {
        setDataLabelsState(dataValue);

        if (metadata && metadata.data && metadata.data.datasets) {
            const newData = { ...metadata };

            newData.data.datasets = newData.data.datasets.map(dataset => ({
                ...dataset,
                datalabels: {
                    display: dataValue,
                    color: "#000000",
                    borderWidth: 1,
                    anchor: "center",
                    align: "center",
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
            }

            changeChartData(newData);
        }
    };

    useEffect(() => {
        if (metadata) {
            setStackedState(metadata.options?.scales?.xAxes?.[0]?.stacked ? true : false);
            setDataLabelsState(
                metadata.data.datasets[metadata.data.datasets.length - 1]?.datalabels?.display
                    ? true
                    : false
            );
            setLegendState(metadata.options?.legend?.display ? true : false);
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
                    Empilhar Barras
                </Typography>

                <Switch
                    size="small"
                    checked={stackedState}
                    onClick={() => handleChangeStacked(!stackedState)}
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
