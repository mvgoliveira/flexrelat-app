import { Typography } from "@/components/features/typography";
import { Switch } from "@/components/ui/switch";
import { ChartData } from "@/components/ui/textEditor/plugins/QuickChart";
import { ReactElement, useEffect, useState } from "react";

import { InlineContainer } from "../stylesConfiguration/styles";
import { Separator } from "./styles";

interface IGeneralConfigurationProps {
    metadata: ChartData;
    changeChartData: (newData: ChartData) => void;
}

export const GeneralConfiguration = ({
    metadata,
    changeChartData,
}: IGeneralConfigurationProps): ReactElement => {
    const [dataLabelsState, setDataLabelsState] = useState<boolean>(false);
    const [legendState, setLegendState] = useState<boolean>(false);

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

    useEffect(() => {
        if (metadata) {
            setDataLabelsState(metadata.data.datasets[0]?.datalabels?.display ? true : false);
            console.log(metadata.options?.legend);
            setLegendState(metadata.options?.legend.display ? true : false);
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
