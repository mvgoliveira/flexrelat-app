import { Input } from "@/components/features/input";
import { ReactElement, useState } from "react";

import { DataSet } from "../dataSet";
import { Separator } from "./styles";

export const DataConfiguration = (): ReactElement => {
    const [chartTitle, setChartTitle] = useState<string>("");
    const [xAxisTitle, setXAxisTitle] = useState<string>("");
    const [yAxisTitle, setYAxisTitle] = useState<string>("");

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

            <DataSet name="Conjunto de dados 1" />
        </>
    );
};
