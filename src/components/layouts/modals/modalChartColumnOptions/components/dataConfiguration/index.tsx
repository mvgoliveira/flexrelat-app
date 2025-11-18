import { Button } from "@/components/features/button";
import { Input } from "@/components/features/input";
import { Typography } from "@/components/features/typography";
import { Theme } from "@/themes";
import { ReactElement, useEffect, useState } from "react";
import { TbDatabase } from "react-icons/tb";

import { ChartColumnData } from "../..";
import { ModalCreateDataset } from "../../../modalCreateDataset";
import { DataSet } from "../dataSet";
import { Separator } from "./styles";

interface IDataConfigurationProps {
    metadata: ChartColumnData;
    changeChartData: (newData: ChartColumnData) => void;
}

export const DataConfiguration = ({
    metadata,
    changeChartData,
}: IDataConfigurationProps): ReactElement => {
    const [isCreateDataModalOpen, setIsCreateDataModalOpen] = useState<boolean>(false);
    const [chartTitle, setChartTitle] = useState<string>("");
    const [xAxisLabel, setXAxisLabel] = useState<string>("");
    const [yAxisLabel, setYAxisLabel] = useState<string>("");
    const [dataSets, setDataSets] = useState<
        Array<{ name: string; data: Array<Array<string | number>> }>
    >([]);

    const handleChangeDataSet = (index: number, data: Array<Array<string | number>>) => {
        if (metadata) {
            setDataSets(prev =>
                prev.map((ds, idx) => (idx === index ? { ...ds, data: data } : ds))
            );

            const newData = { ...metadata };
            if (newData.data && newData.data.datasets && newData.data.datasets[index]) {
                newData.data.datasets[index].data = data.map(point => ({
                    x: point[0],
                    y: point[1],
                }));
            }

            changeChartData(newData);
        }
    };

    const handleChangeScaleLabel = (option: "x" | "y", value: string) => {
        if (metadata) {
            const newData = { ...metadata };
            if (newData.options && newData.options.scales) {
                if (option === "x") {
                    setXAxisLabel(value);
                    newData.options.scales.xAxes[0].scaleLabel.labelString = value;
                } else {
                    setYAxisLabel(value);
                    newData.options.scales.yAxes[0].scaleLabel.labelString = value;
                }
            }
            changeChartData(newData);
        }
    };

    const handleChangeTitle = (value: string) => {
        setChartTitle(value);

        if (metadata) {
            const newData = { ...metadata };
            if (newData.options && newData.options.title) {
                newData.options.title.text = value;
            }
            changeChartData(newData);
        }
    };

    const handleCreateDataSet = (name: string) => {
        const newDataSet = { name, data: [] };
        setDataSets(prev => [...prev, newDataSet]);

        if (metadata) {
            const newData = { ...metadata };
            if (newData.data && newData.data.datasets) {
                const oldProps = newData.data.datasets[0];

                newData.data.datasets.push({
                    ...oldProps,
                    label: newDataSet.name,
                    backgroundColor: undefined,
                    borderColor: undefined,
                    data: [],
                });
            }
            changeChartData(newData);
        }

        setIsCreateDataModalOpen(false);
    };

    const handleDeleteDataSet = (index: number) => {
        const filteredDataSets = dataSets.filter((_, idx) => idx !== index);
        setDataSets(filteredDataSets);

        if (metadata) {
            const newData = { ...metadata };
            if (newData.data && newData.data.datasets) {
                newData.data.datasets = newData.data.datasets.filter((_, idx) => idx !== index);
            }
            changeChartData(newData);
        }
    };

    useEffect(() => {
        if (metadata) {
            setChartTitle(metadata.options?.title.text || "");
            setXAxisLabel(metadata.options?.scales?.xAxes[0]?.scaleLabel.labelString || "");
            setYAxisLabel(metadata.options?.scales?.yAxes[0]?.scaleLabel.labelString || "");
            setDataSets(
                metadata.data.datasets.map((dataset, idx) => ({
                    name: dataset.label || `Data ${idx + 1}`,
                    data: dataset.data.map((point: { x: string | number; y: string | number }) => [
                        String(point.x),
                        String(point.y),
                    ]),
                }))
            );
        }
    }, [metadata]);

    return (
        <>
            <ModalCreateDataset
                open={isCreateDataModalOpen}
                setOpen={setIsCreateDataModalOpen}
                onCreate={handleCreateDataSet}
            />

            <Input
                label="Título do gráfico"
                placeholder="Insira o título do gráfico"
                value={chartTitle}
                onChange={e => {
                    handleChangeTitle(e.target.value);
                }}
            />

            <Input
                label="Rótulo do eixo-x"
                placeholder="Insira o rótulo do eixo-x"
                value={xAxisLabel}
                onChange={e => {
                    handleChangeScaleLabel("x", e.target.value);
                }}
            />

            <Input
                label="Rótulo do eixo-y"
                placeholder="Insira o rótulo do eixo-y"
                value={yAxisLabel}
                onChange={e => {
                    handleChangeScaleLabel("y", e.target.value);
                }}
            />

            <Separator />

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {dataSets.map((dataset, index) => (
                    <DataSet
                        name={dataset.name}
                        key={`dataSet-${index}`}
                        data={dataset.data}
                        changeData={newData => handleChangeDataSet(index, newData)}
                        onDelete={() => handleDeleteDataSet(index)}
                    />
                ))}
            </div>

            <Separator />

            <Button
                height="30px"
                variant="secondary"
                padding="0 10px"
                onClick={() => setIsCreateDataModalOpen(true)}
            >
                <TbDatabase size={12} color={Theme.colors.gray100} />

                <Typography
                    tag="p"
                    fontSize={{ xs: "fs75" }}
                    color="gray100"
                    fontWeight="regular"
                    textAlign="center"
                >
                    Adicionar Dados
                </Typography>
            </Button>
        </>
    );
};
