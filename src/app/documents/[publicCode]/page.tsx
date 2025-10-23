"use client";
import { Link } from "@/components/features/link";
import { Typography } from "@/components/features/typography";
import { AiChat } from "@/components/layouts/document/aiChat";
import { DocumentContent } from "@/components/layouts/document/content";
import { DocComponents } from "@/components/layouts/document/docComponents";
import { Header } from "@/components/layouts/document/header";
import { Layout, SecondaryLayout } from "@/components/layouts/document/layout";
import { NavHeader, TabHeaderType } from "@/components/layouts/document/navHeader";
import { useDocumentContext } from "@/context/documentContext";
import withSession from "@/hoc/withSession";
import { Theme } from "@/themes";
import { ReactElement, useState } from "react";
import { MdOutlineAutoAwesomeMosaic, MdOutlineDocumentScanner } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";

export type LeftTabsValue = "elements" | "components" | "models";
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

function Document(): ReactElement {
    const { getDocumentStatus, documentData } = useDocumentContext();
    const [activeLeftTab, setActiveLeftTab] = useState<LeftTabsValue>("components");
    const [activeRightTab, setActiveRightTab] = useState<RightTabsValue>("ai");
    const [saveStatus, setSaveStatus] = useState<"pending" | "success" | "error">("success");

    if (getDocumentStatus === "pending") return <></>;

    if (getDocumentStatus === "error") {
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
                        Documento não encontrado.
                    </Typography>
                </div>

                <Link
                    href="/documents"
                    color="gray70"
                    lineColor="gray70"
                    hoverColor="black"
                    typographyProps={{
                        fontWeight: "regular",
                        fontSize: { xs: "fs75" },
                    }}
                >
                    Voltar para Documentos
                </Link>
            </SecondaryLayout>
        );
    }

    return (
        <Layout>
            <Layout.Header>
                {documentData && (
                    <Header
                        metadata={{
                            id: documentData.id,
                            title: documentData.name,
                            createdAt: documentData.createdAt,
                            saveStatus: saveStatus,
                            onChangeStatus: setSaveStatus,
                        }}
                    />
                )}
            </Layout.Header>

            <Layout.LeftNavBar>
                <NavHeader
                    headerItens={leftTabs}
                    activeTab={activeLeftTab}
                    setActiveLeftTab={activeTab => setActiveLeftTab(activeTab as LeftTabsValue)}
                />

                {activeLeftTab === "components" && <DocComponents />}
            </Layout.LeftNavBar>

            <Layout.Content>
                <DocumentContent />
            </Layout.Content>

            <Layout.RightNavBar>
                <NavHeader
                    headerItens={rightTabs}
                    activeTab={activeRightTab}
                    setActiveLeftTab={activeTab => setActiveRightTab(activeTab as RightTabsValue)}
                    hasCloseButton
                />

                <AiChat />
            </Layout.RightNavBar>
        </Layout>
    );
}

export default withSession(Document);
