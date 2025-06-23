"use client";
import { DocumentContent } from "@/components/layouts/document/content";
import { Header } from "@/components/layouts/document/header";
import { Layout } from "@/components/layouts/document/layout";
import { NavHeader, TabHeaderType } from "@/components/layouts/document/navHeader";
import { DocumentData, getDocumentByDocumentId } from "@/repositories/documentAPI";
import { useQuery } from "@tanstack/react-query";
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

const documentId = "cc8bf6cd-68d3-48ba-abcb-fcf450605f44";

export default function Dashboard(): ReactElement {
    const [activeLeftTab, setActiveLeftTab] = useState<LeftTabsValue>("components");
    const [activeRightTab, setActiveRightTab] = useState<RightTabsValue>("ai");
    const [saveStatus, setSaveStatus] = useState<"pending" | "success" | "error">("success");

    const { status, data } = useQuery({
        queryKey: ["get_document_data", documentId],
        queryFn: async (): Promise<DocumentData> => {
            const response: DocumentData = await getDocumentByDocumentId(documentId);
            return response;
        },
        refetchInterval: 5 * 60 * 1000, // 5 minutes
    });

    if (status === "pending") return <></>;
    if (status === "error") return <></>;

    return (
        <Layout>
            <Layout.Header>
                <Header
                    metadata={{
                        id: data.id,
                        title: data.name,
                        createdAt: data.created_at,
                        saveStatus: saveStatus,
                        onChangeStatus: setSaveStatus,
                    }}
                />
            </Layout.Header>

            <Layout.LeftNavBar>
                <NavHeader
                    headerItens={leftTabs}
                    activeTab={activeLeftTab}
                    setActiveLeftTab={activeTab => setActiveLeftTab(activeTab as LeftTabsValue)}
                />
            </Layout.LeftNavBar>

            <Layout.Content>
                <DocumentContent />
            </Layout.Content>

            <Layout.RightNavBar>
                <NavHeader
                    headerItens={rightTabs}
                    activeTab={activeRightTab}
                    setActiveLeftTab={activeTab => setActiveRightTab(activeTab as RightTabsValue)}
                />
            </Layout.RightNavBar>
        </Layout>
    );
}
