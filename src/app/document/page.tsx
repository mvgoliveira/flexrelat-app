"use client";
import { Layout } from "@/components/layouts/document/layout";
import { NavHeader, TabHeaderType } from "@/components/layouts/document/navHeader";
import { ReactElement, useState } from "react";
import { MdOutlineDashboard, MdOutlineViewList } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";

export type LeftTabsValue = "elements" | "components" | "models";
export type RightTabsValue = "ai" | "styles" | "properties";

const leftTabs: TabHeaderType<LeftTabsValue>[] = [
    {
        value: "components",
        icon: <MdOutlineDashboard size={12} />,
        text: "Componentes",
    },
    {
        value: "elements",
        icon: <MdOutlineViewList size={12} />,
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

export default function Dashboard(): ReactElement {
    const [activeLeftTab, setActiveLeftTab] = useState<LeftTabsValue>("components");
    const [activeRightTab, setActiveRightTab] = useState<RightTabsValue>("ai");

    return (
        <Layout>
            <Layout.Header />

            <Layout.LeftNavBar>
                <NavHeader
                    headerItens={leftTabs}
                    activeTab={activeLeftTab}
                    setActiveLeftTab={activeTab => setActiveLeftTab(activeTab as LeftTabsValue)}
                />
            </Layout.LeftNavBar>

            <Layout.Content>
                <></>
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
