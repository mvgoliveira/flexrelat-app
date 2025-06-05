"use client";
import { Layout } from "@/components/layouts/dashboard/layout";
import { ReactElement, useState } from "react";
import { MdOutlineArticle, MdOutlineDashboard, MdOutlineViewList } from "react-icons/md";

export type LeftTabsValue = "elements" | "components" | "models";

export type LeftTabType = {
    value: LeftTabsValue;
    icon: ReactElement;
    text: string;
};

const leftTabs: LeftTabType[] = [
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
    {
        value: "models",
        icon: <MdOutlineArticle size={12} />,
        text: "Modelos",
    },
];

export default function Dashboard(): ReactElement {
    const [activeLeftTab, setActiveLeftTab] = useState<LeftTabsValue>("components");

    return (
        <Layout>
            <Layout.Header />

            <Layout.LeftNavBar
                headerItens={leftTabs}
                activeTab={activeLeftTab}
                setActiveLeftTab={setActiveLeftTab}
            >
                <></>
            </Layout.LeftNavBar>

            <Layout.Content>
                <></>
            </Layout.Content>

            <Layout.RightNavBar>
                <></>
            </Layout.RightNavBar>
        </Layout>
    );
}
