import { Button } from "@/components/features/button";
import { Typography } from "@/components/features/typography";
import { Modal } from "@/components/ui/modal";
import { Theme } from "@/themes";
import { ReactElement, useState } from "react";
import { TbBrush, TbChartBubble, TbDatabase } from "react-icons/tb";

import { DataConfiguration } from "./components/dataConfiguration";
import {
    BottomContainer,
    ChartContainer,
    ConfigurationContainer,
    ConfigurationContent,
    Tab,
    TabsContainer,
    TopContainer,
} from "./styles";

interface IChartOptionsModalProps {
    isOpen: boolean;
    close: () => void;
}

export const ChartOptionsModal = ({ isOpen, close }: IChartOptionsModalProps): ReactElement => {
    const [activeTab, setActiveTab] = useState<"general" | "data" | "style">("data");

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
                        {activeTab === "data" && <DataConfiguration />}
                    </ConfigurationContent>
                </ConfigurationContainer>

                <ChartContainer></ChartContainer>
            </TopContainer>

            <BottomContainer>
                <Button height="30px" width="fit-content" variant="tertiary" padding="0 10px">
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

                <Button height="30px" width="100px" variant="primary" padding="0 10px">
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
