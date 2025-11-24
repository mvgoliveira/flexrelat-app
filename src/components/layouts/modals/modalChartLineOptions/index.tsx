import { Button } from "@/components/features/button";
import { Typography } from "@/components/features/typography";
import { Modal } from "@/components/ui/modal";
import { Theme } from "@/themes";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import { TbBrush, TbChartBubble, TbDatabase } from "react-icons/tb";

import { DataConfiguration } from "./components/dataConfiguration";
import { GeneralConfiguration } from "./components/generalConfiguration";
import { StylesConfiguration } from "./components/stylesConfiguration";
import {
    BottomContainer,
    ChartContainer,
    ChartContent,
    ConfigurationContainer,
    ConfigurationContent,
    Tab,
    TabsContainer,
    TopContainer,
} from "./styles";

export type ChartLineData = {
    type: string;
    data: {
        labels: string[];
        datasets: Array<{
            label: string;
            data: { x: number | string; y: number | string }[];
            backgroundColor?: string | string[];
            borderColor?: string | string[];
            borderWidth?: number;
            lineTension?: number;
            showLine?: boolean;
            fill?: boolean;
            datalabels?: {
                display: boolean;
                color: string;
                backgroundColor: string;
                borderColor: string;
                borderWidth: number;
                borderRadius: number;
                anchor: string;
                align: string;
            };
        }>;
    };
    options?: {
        title: {
            display: boolean;
            text: string;
        };
        legend: {
            display?: boolean;
            position?: "top" | "left" | "bottom" | "right";
            labels: {
                usePointStyle: boolean;
                boxWidth: number;
            };
        };
        scales: {
            xAxes: Array<{
                scaleLabel: {
                    display: boolean;
                    labelString: string;
                };
            }>;
            yAxes: Array<{
                scaleLabel: {
                    display: boolean;
                    labelString: string;
                };
            }>;
        };
    };
};

interface IModalChartLineOptionsProps {
    isOpen: boolean;
    close: () => void;
    metadata: ChartLineData;
    changeChartData: (newData: ChartLineData) => void;
    handleChangeSize: (dimension: "width" | "height", value: number) => void;
    chartWidth: number;
    chartHeight: number;
}

export const ModalChartLineOptions = ({
    isOpen,
    close,
    metadata,
    changeChartData,
    chartWidth,
    chartHeight,
    handleChangeSize,
}: IModalChartLineOptionsProps): ReactElement => {
    const [activeTab, setActiveTab] = useState<"general" | "data" | "style">("general");
    const [decodedData, setDecodedData] = useState<ChartLineData | null>(null);
    const [modalWidth, setModalWidth] = useState<number>(400);
    const [modalHeight, setModalHeight] = useState<number>(240);

    const handleConfirmChanges = () => {
        if (decodedData) {
            changeChartData(decodedData);
            close();
        }
    };

    useEffect(() => {
        if (metadata) {
            setDecodedData(metadata);
        }
    }, [metadata]);

    useEffect(() => {
        const maxWidth = 400;
        const maxHeight = 300;

        const widthRatio = chartWidth / maxWidth;
        const heightRatio = chartHeight / maxHeight;
        const maxRatio = Math.max(widthRatio, heightRatio, 1);

        const calculatedWidth = Math.round(chartWidth / maxRatio);
        const calculatedHeight = Math.round(chartHeight / maxRatio);

        setModalWidth(calculatedWidth);
        setModalHeight(calculatedHeight);
    }, [chartWidth, chartHeight]);

    return (
        <Modal isOpen={isOpen} onClose={close} title="Editar Gráfico">
            <TopContainer>
                <ConfigurationContainer>
                    <TabsContainer>
                        <Tab
                            active={activeTab === "general"}
                            onClick={() => setActiveTab("general")}
                        >
                            <TbChartBubble size={12} color={Theme.colors.black} />

                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs75" }}
                                color="black"
                                fontWeight="regular"
                            >
                                Geral
                            </Typography>
                        </Tab>

                        <Tab active={activeTab === "data"} onClick={() => setActiveTab("data")}>
                            <TbDatabase size={12} color={Theme.colors.black} />

                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs75" }}
                                color="black"
                                fontWeight="regular"
                            >
                                Dados
                            </Typography>
                        </Tab>

                        <Tab active={activeTab === "style"} onClick={() => setActiveTab("style")}>
                            <TbBrush size={12} color={Theme.colors.black} />

                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs75" }}
                                color="black"
                                fontWeight="regular"
                            >
                                Estilo
                            </Typography>
                        </Tab>
                    </TabsContainer>

                    <ConfigurationContent>
                        {decodedData && activeTab === "general" && (
                            <GeneralConfiguration
                                metadata={decodedData}
                                changeChartData={setDecodedData}
                            />
                        )}

                        {decodedData && activeTab === "data" && (
                            <DataConfiguration
                                metadata={decodedData}
                                changeChartData={setDecodedData}
                            />
                        )}

                        {decodedData && activeTab === "style" && (
                            <StylesConfiguration
                                metadata={decodedData}
                                chartWidth={chartWidth}
                                chartHeight={chartHeight}
                                changeChartData={setDecodedData}
                                handleChangeSize={handleChangeSize}
                            />
                        )}
                    </ConfigurationContent>
                </ConfigurationContainer>

                <ChartContainer>
                    <ChartContent>
                        <Image
                            src={`https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(decodedData))}&w=${modalWidth * 1.3}&h=${modalHeight * 1.3}`}
                            width={modalWidth}
                            height={modalHeight}
                            alt="chart"
                        />
                    </ChartContent>
                </ChartContainer>
            </TopContainer>

            <BottomContainer>
                <Button
                    height="30px"
                    width="fit-content"
                    variant="tertiary"
                    padding="0 10px"
                    onClick={close}
                >
                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs75" }}
                        color="black"
                        fontWeight="regular"
                        textAlign="left"
                    >
                        Cancelar
                    </Typography>
                </Button>

                <Button
                    height="30px"
                    width="100px"
                    variant="primary"
                    padding="0 10px"
                    onClick={handleConfirmChanges}
                >
                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs75" }}
                        color="white"
                        fontWeight="regular"
                        textAlign="left"
                    >
                        Confirmar
                    </Typography>
                </Button>
            </BottomContainer>
        </Modal>
    );
};
