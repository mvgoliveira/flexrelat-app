"use client";
import { Link } from "@/components/features/link";
import { Typography } from "@/components/features/typography";
import { AiChat } from "@/components/layouts/model/aiChat";
import { ModelContent } from "@/components/layouts/model/content";
import { Header } from "@/components/layouts/model/header";
import { Layout, SecondaryLayout } from "@/components/layouts/model/layout";
import { ModelComponents } from "@/components/layouts/model/modelComponents";
import { NavHeader, TabHeaderType } from "@/components/layouts/model/navHeader";
import { useModelContext } from "@/context/modelContext";
import { useUserContext } from "@/context/userContext";
import withSession from "@/hoc/withSession";
import { Theme } from "@/themes";
import { ReactElement, useEffect, useState } from "react";
import { MdOutlineAutoAwesomeMosaic, MdOutlineDocumentScanner } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";

export type LeftTabsValue = "components" | "ai";
export type RightTabsValue = "ai" | "styles" | "properties";

const leftTabs: TabHeaderType<LeftTabsValue>[] = [
    {
        value: "components",
        icon: <MdOutlineAutoAwesomeMosaic size={12} />,
        text: "Componentes",
    },
];

const rightTabs: TabHeaderType<RightTabsValue>[] = [
    {
        value: "ai",
        icon: <RiRobot2Line size={12} />,
        text: "Inteligência Artificial",
    },
];

function Model(): ReactElement {
    const { getModelStatus, modelData } = useModelContext();
    const { authenticatedUser } = useUserContext();
    const [activeLeftTab, setActiveLeftTab] = useState<LeftTabsValue>("components");
    const [activeRightTab, setActiveRightTab] = useState<RightTabsValue>("ai");
    const [saveStatus, setSaveStatus] = useState<"pending" | "success" | "error">("success");
    const [isReadOnly, setIsReadOnly] = useState<boolean>(false);

    useEffect(() => {
        if (authenticatedUser?.id !== modelData?.userId) {
            setIsReadOnly(true);
        } else {
            setIsReadOnly(false);
        }
    }, [authenticatedUser, modelData]);

    if (getModelStatus === "pending") return <></>;

    if (getModelStatus === "error") {
        return (
            <SecondaryLayout>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <MdOutlineDocumentScanner size={28} color={Theme.colors.black} />

                    <Typography
                        tag="h1"
                        fontSize={{ xs: "fs100" }}
                        color="black"
                        fontWeight="medium"
                    >
                        Modelo não encontrado.
                    </Typography>
                </div>

                <Link
                    href="/models"
                    color="gray70"
                    lineColor="gray70"
                    hoverColor="black"
                    typographyProps={{
                        fontWeight: "regular",
                        fontSize: { xs: "fs75" },
                    }}
                >
                    Voltar para Modelos
                </Link>
            </SecondaryLayout>
        );
    }

    return (
        <Layout readOnly={isReadOnly}>
            <Layout.Header>
                {modelData && (
                    <Header
                        readOnly={isReadOnly}
                        metadata={{
                            id: modelData.id,
                            title: modelData.name,
                            content: modelData.content,
                            createdAt: modelData.createdAt,
                            saveStatus: saveStatus,
                            onChangeStatus: setSaveStatus,
                        }}
                    />
                )}
            </Layout.Header>

            {!isReadOnly && (
                <Layout.LeftNavBar>
                    <NavHeader
                        headerItens={!isReadOnly ? leftTabs : []}
                        activeTab={activeLeftTab}
                        setActiveLeftTab={activeTab => setActiveLeftTab(activeTab as LeftTabsValue)}
                    />

                    {activeLeftTab === "components" && !isReadOnly && <ModelComponents />}
                </Layout.LeftNavBar>
            )}

            <Layout.Content>
                <ModelContent setSaveStatus={setSaveStatus} isReadOnly={isReadOnly} />
            </Layout.Content>

            {!isReadOnly && (
                <Layout.RightNavBar>
                    <NavHeader
                        headerItens={rightTabs}
                        activeTab={activeRightTab}
                        setActiveLeftTab={activeTab =>
                            setActiveRightTab(activeTab as RightTabsValue)
                        }
                        hasCloseButton
                    />

                    <AiChat />
                </Layout.RightNavBar>
            )}
        </Layout>
    );
}

export default withSession(Model);
