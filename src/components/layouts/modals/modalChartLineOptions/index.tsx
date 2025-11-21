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
}

export const ModalChartLineOptions = ({
    isOpen,
    close,
    metadata,
    changeChartData,
}: IModalChartLineOptionsProps): ReactElement => {
    const [activeTab, setActiveTab] = useState<"general" | "data" | "style">("general");
    const [decodedData, setDecodedData] = useState<ChartLineData | null>(null);

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
                                changeChartData={setDecodedData}
                            />
                        )}
                    </ConfigurationContent>
                </ConfigurationContainer>

                <ChartContainer>
                    <ChartContent>
                        <Image
                            src={`https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify(decodedData))}`}
                            height={240}
                            width={400}
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
