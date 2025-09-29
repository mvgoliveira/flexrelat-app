import { ChartOptionsModal } from "@/components/layouts/document/modals/chartOptionsModal";
import styled from "@emotion/styled";
import { useDisclosure } from "@mantine/hooks";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import Image from "next/image";
import React, { useState } from "react";

export type ChartData = {
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
        }>;
    };
    options?: object;
};

interface IChartAttributes {
    chartData: string;
}

const ChartContainer = styled(NodeViewWrapper)`
    width: 100%;
    display: flex;
    user-select: none;
    pointer-events: auto;
    justify-content: center;
    margin-bottom: 9pt;

    &:hover {
        background: ${props => props.theme.colors.purple10};
    }
`;

const ChartContent = styled.div`
    height: 300px;
    width: 500px;
    cursor: pointer;
    position: relative;
`;

const QuickChartComponent = ({ node }: any) => {
    const { chartData }: IChartAttributes = node.attrs;
    const [opened, { open, close }] = useDisclosure(false);
    const [decodedData, setDecodedData] = useState<ChartData | null>(null);

    const handleOpenChartOptions = () => {
        const decoded = decodeURIComponent(chartData);
        const config = JSON.parse(decoded);
        setDecodedData(config);
        console.log(config);
        open();
    };

    return (
        <>
            {decodedData && (
                <ChartOptionsModal isOpen={opened} close={close} metadata={decodedData} />
            )}

            <ChartContainer
                contentEditable={false}
                suppressContentEditableWarning={true}
                onClick={handleOpenChartOptions}
            >
                <ChartContent>
                    <Image
                        src={`https://quickchart.io/chart?c=${chartData}`}
                        height={300}
                        width={500}
                        alt="chart"
                    />
                </ChartContent>
            </ChartContainer>
        </>
    );
};

export const QuickChart = Node.create({
    name: "quickChart",

    group: "block",

    atom: true,

    addAttributes() {
        return {
            chartData: {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: `quick-chart`,
                getAttrs: element => {
                    const chartData = element.getAttribute("chart-data");

                    return {
                        chartData: chartData || null,
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["quick-chart", mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(QuickChartComponent);
    },
});
