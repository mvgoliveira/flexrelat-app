import { Input } from "@/components/features/input";
import { ChartData } from "@/components/ui/textEditor/plugins/QuickChart";
import { ReactElement, useEffect, useState } from "react";

import { DataSet } from "../dataSet";
import { Separator } from "./styles";

interface IDataConfigurationProps {
    metadata: ChartData;
}

export const DataConfiguration = ({ metadata }: IDataConfigurationProps): ReactElement => {
    const [chartTitle, setChartTitle] = useState<string>("");
    const [xAxisTitle, setXAxisTitle] = useState<string>("");
    const [yAxisTitle, setYAxisTitle] = useState<string>("");

    useEffect(() => {
        if (metadata) {
            // setChartTitle(metadata.title || "");
            // setXAxisTitle(metadata.xAxisTitle || "");
            // setYAxisTitle(metadata.yAxisTitle || "");
        }
    }, [metadata]);

    return (
        <>
            <Input
                label="Título do gráfico"
                placeholder="Insira o título do gráfico"
                value={chartTitle}
                onChange={e => setChartTitle(e.target.value)}
            />

            <Input
                label="Rótulo do eixo-x"
                placeholder="Insira o rótulo do eixo-x"
                value={xAxisTitle}
                onChange={e => setXAxisTitle(e.target.value)}
            />

            <Input
                label="Rótulo do eixo-y"
                placeholder="Insira o rótulo do eixo-y"
                value={yAxisTitle}
                onChange={e => setYAxisTitle(e.target.value)}
            />

            <Separator />

            <DataSet
                name="Conjunto de dados 1"
                data={
                    Array.isArray(metadata.data.datasets[0].data)
                        ? metadata.data.datasets[0].data.map(
                              (point: { x: string | number; y: string | number }) => [
                                  String(point.x),
                                  String(point.y),
                              ]
                          )
                        : []
                }
            />
        </>
    );
};
