import { Button } from "@/components/features/button";
import { Typography } from "@/components/features/typography";
import { Modal } from "@/components/ui/modal";
import { ChartData } from "@/components/ui/textEditor/plugins/QuickChart";
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

interface IChartOptionsModalProps {
    isOpen: boolean;
    close: () => void;
    metadata: ChartData;
    changeChartData: (newData: ChartData) => void;
}

export const ChartOptionsModal = ({
    isOpen,
    close,
    metadata,
    changeChartData,
}: IChartOptionsModalProps): ReactElement => {
    const [activeTab, setActiveTab] = useState<"general" | "data" | "style">("data");
    const [decodedData, setDecodedData] = useState<ChartData | null>(null);

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
