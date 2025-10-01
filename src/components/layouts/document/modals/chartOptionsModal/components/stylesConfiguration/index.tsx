import { Typography } from "@/components/features/typography";
import { Switch } from "@/components/ui/switch";
import { ChartData } from "@/components/ui/textEditor/plugins/QuickChart";
import { ReactElement, useEffect, useState } from "react";

import { Separator, SwitchContainer } from "./styles";

interface IStylesConfigurationProps {
    metadata: ChartData;
    changeChartData: (newData: ChartData) => void;
}

export const StylesConfiguration = ({
    metadata,
    changeChartData,
}: IStylesConfigurationProps): ReactElement => {
    const [fillState, setFillState] = useState<boolean>(false);
    const [showLinesState, setShowLinesState] = useState<boolean>(true);
    const [smoothCurvesState, setSmoothCurvesState] = useState<boolean>(false);

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

    useEffect(() => {
        if (metadata && metadata.data && metadata.data.datasets && metadata.data.datasets[0]) {
            setFillState(!!metadata.data.datasets[0].fill);
        } else {
            setFillState(false);
        }
    }, [metadata]);

    return (
        <>
            <SwitchContainer>
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
            </SwitchContainer>

            <SwitchContainer>
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
            </SwitchContainer>

            <SwitchContainer>
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
            </SwitchContainer>

            <Separator />
        </>
    );
};
