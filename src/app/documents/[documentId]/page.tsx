"use client";
import { AiChat } from "@/components/layouts/document/aiChat";
import { DocumentContent } from "@/components/layouts/document/content";
import { DocComponents } from "@/components/layouts/document/docComponents";
import { Header } from "@/components/layouts/document/header";
import { Layout } from "@/components/layouts/document/layout";
import { NavHeader, TabHeaderType } from "@/components/layouts/document/navHeader";
import { useDocumentContext } from "@/context/documentContext";
import { ReactElement, useState } from "react";
import { MdOutlineAutoAwesomeMosaic, MdOutlineFormatListNumbered } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";

export type LeftTabsValue = "elements" | "components" | "models";
export type RightTabsValue = "ai" | "styles" | "properties";

const leftTabs: TabHeaderType<LeftTabsValue>[] = [
    {
        value: "components",
        icon: <MdOutlineAutoAwesomeMosaic size={12} />,
        text: "Componentes",
    },
    {
        value: "elements",
        icon: <MdOutlineFormatListNumbered size={14} />,
        text: "Elementos",
    },
];

const rightTabs: TabHeaderType<RightTabsValue>[] = [
    {
        value: "ai",
        icon: <RiRobot2Line size={12} />,
        text: "Inteligência Artificial",
    },
];

export default function Dashboard(): ReactElement {
    const { documentStatus, documentData } = useDocumentContext();
    const [activeLeftTab, setActiveLeftTab] = useState<LeftTabsValue>("components");
    const [activeRightTab, setActiveRightTab] = useState<RightTabsValue>("ai");
    const [saveStatus, setSaveStatus] = useState<"pending" | "success" | "error">("success");

    if (documentStatus === "pending") return <></>;
    if (documentStatus === "error") return <></>;

    return (
        <Layout>
            <Layout.Header>
                {documentData && (
                    <Header
                        metadata={{
                            id: documentData.id,
                            title: documentData.name,
                            createdAt: documentData.created_at,
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
