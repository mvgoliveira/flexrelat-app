"use client";
import { DocumentContent } from "@/components/layouts/document/content";
import { Header } from "@/components/layouts/document/header";
import { Layout } from "@/components/layouts/document/layout";
import { NavHeader, TabHeaderType } from "@/components/layouts/document/navHeader";
import { DocumentData, getDocumentByDocumentId } from "@/repositories/documentAPI";
import { useQuery } from "@tanstack/react-query";
import { ReactElement, useState } from "react";
import { FaThList } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";
import { TbLayoutGridAdd } from "react-icons/tb";

export type LeftTabsValue = "elements" | "components" | "models";
export type RightTabsValue = "ai" | "styles" | "properties";

const leftTabs: TabHeaderType<LeftTabsValue>[] = [
    {
        value: "components",
        icon: <TbLayoutGridAdd size={12} />,
        text: "Componentes",
    },
    {
        value: "elements",
        icon: <FaThList size={10} />,
        text: "Elementos",
    },
];

const rightTabs: TabHeaderType<RightTabsValue>[] = [
    {
        value: "ai",
        icon: <RiRobot2Fill size={12} />,
        text: "Inteligência Artificial",
    },
];

const documentId = "cc8bf6cd-68d3-48ba-abcb-fcf450605f44";

export default function Dashboard(): ReactElement {
    const [activeLeftTab, setActiveLeftTab] = useState<LeftTabsValue>("components");
    const [activeRightTab, setActiveRightTab] = useState<RightTabsValue>("ai");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { status, data } = useQuery({
        queryKey: ["get_document_data", documentId],
        queryFn: async (): Promise<DocumentData> => {
            const response: DocumentData = await getDocumentByDocumentId(documentId);
            return response;
        },
        refetchInterval: 5 * 60 * 1000, // 5 minutes
    });

    return (
        <Layout>
            <Layout.Header>
                <Header />
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
