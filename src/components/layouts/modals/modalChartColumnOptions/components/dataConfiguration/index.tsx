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
    const [dataSets, setDataSets] = useState<Array<{ name: string; data: Array<string | number> }>>(
        []
    );
    const [dataLabels, setDataLabels] = useState<Array<string | number>>([]);
    const [yPrefix, setYPrefix] = useState<string>("");
    const [ySuffix, setYSuffix] = useState<string>("");

    const handleChangeDataSet = (index: number, data: number[]) => {
        if (metadata) {
            setDataSets(prev =>
                prev.map((ds, idx) => (idx === index ? { ...ds, data: data } : ds))
            );
            const newData = { ...metadata };
            if (newData.data && newData.data.datasets && newData.data.datasets[index]) {
                newData.data.datasets[index].data = data;
            }
            changeChartData(newData);
        }
    };

    const handleHandleDataLabels = (data: string[]) => {
        if (metadata) {
            setDataLabels(data);
            const newData = { ...metadata };
            newData.data.labels = data;
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

    const handleChangeScaleLabel = (axis: "x" | "y", value: string) => {
        if (metadata) {
            const newData = { ...metadata };

            if (!newData.options) return;

            if (axis === "x") {
                setXAxisLabel(value);

                newData.options = {
                    ...newData.options,
                    scales: {
                        ...newData.options.scales,
                        xAxes: [
                            {
                                ...newData.options.scales?.xAxes?.[0],
                                scaleLabel: {
                                    ...newData.options.scales?.xAxes?.[0]?.scaleLabel,
                                    labelString: value,
                                },
                            },
                        ],
                    },
                };
            }

            if (axis === "y") {
                setYAxisLabel(value);

                newData.options = {
                    ...newData.options,
                    scales: {
                        ...newData.options.scales,
                        yAxes: [
                            {
                                ...newData.options.scales?.yAxes?.[0],
                                scaleLabel: {
                                    ...newData.options.scales?.yAxes?.[0]?.scaleLabel,
                                    labelString: value,
                                },
                            },
                        ],
                    },
                };
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

    const handleChangePrefix = (selectedPrefix: string) => {
        setYPrefix(selectedPrefix);

        if (metadata) {
            const newData = { ...metadata };

            newData.options = {
                ...newData.options,
                plugins: {
                    ...newData?.options?.plugins,
                    tickFormat: {
                        ...newData?.options?.plugins?.tickFormat,
                        prefix: selectedPrefix,
                    },
                },
            };

            changeChartData(newData);
        }
    };

    const handleChangeSuffix = (selectedSuffix: string) => {
        setYSuffix(selectedSuffix);

        if (metadata) {
            const newData = { ...metadata };

            newData.options = {
                ...newData.options,
                plugins: {
                    ...newData?.options?.plugins,
                    tickFormat: {
                        ...newData?.options?.plugins?.tickFormat,
                        suffix: selectedSuffix,
                    },
                },
            };

            changeChartData(newData);
        }
    };

    useEffect(() => {
        if (metadata) {
            setChartTitle(metadata?.options?.title?.text || "");
            setXAxisLabel(metadata?.options?.scales?.xAxes?.[0]?.scaleLabel?.labelString || "");
            setYAxisLabel(metadata?.options?.scales?.yAxes?.[0]?.scaleLabel?.labelString || "");
            setDataLabels(metadata.data.labels);
            setDataSets(
                metadata.data.datasets.map((dataset, idx) => ({
                    name: dataset.label || `Data ${idx + 1}`,
                    data: dataset.data,
                }))
            );
            setYPrefix(metadata?.options?.plugins?.tickFormat?.prefix || "");
            setYSuffix(metadata?.options?.plugins?.tickFormat?.suffix || "");
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

            <Input
                label="Prefixo do eixo-y"
                placeholder="Insira o prefixo do eixo-y"
                value={yPrefix}
                onChange={e => {
                    handleChangePrefix(e.target.value);
                }}
            />

            <Input
                label="Sufixo do eixo-y"
                placeholder="Insira o prefixo do eixo-y"
                value={ySuffix}
                onChange={e => {
                    handleChangeSuffix(e.target.value);
                }}
            />

            <Separator />

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {dataLabels.length > 0 && (
                    <DataSet
                        name="Valores do Eixo X"
                        axis="X"
                        data={dataLabels}
                        changeData={newData => handleHandleDataLabels(newData as string[])}
                        onDelete={() => {}}
                        hasDelete={false}
                    />
                )}

                {dataSets.map((dataset, index) => (
                    <DataSet
                        name={dataset.name}
                        key={`dataSet-${index}`}
                        data={dataset.data}
                        changeData={newData => handleChangeDataSet(index, newData as number[])}
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
