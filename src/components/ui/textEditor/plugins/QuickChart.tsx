import { ModalChartOptions } from "@/components/layouts/modals/modalChartOptions";
import styled from "@emotion/styled";
import { useDisclosure } from "@mantine/hooks";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
            fill?: boolean;
            datalabels?: {
                display: boolean;
                color: string;
                backgroundColor: string;
                borderColor: string;
                borderWidth: number;
                borderRadius: number;
                anchor: string;
                align: string;
            };
        }>;
    };
    options?: {
        title: {
            display: boolean;
            text: string;
        };
        legend: {
            display?: boolean;
            position?: "top" | "left" | "bottom" | "right";
            labels: {
                usePointStyle: boolean;
                boxWidth: number;
            };
        };
        scales: {
            xAxes: Array<{
                scaleLabel: {
                    display: boolean;
                    labelString: string;
                };
            }>;
            yAxes: Array<{
                scaleLabel: {
                    display: boolean;
                    labelString: string;
                };
            }>;
        };
    };
};

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

const QuickChartComponent = ({ node, updateAttributes }: any) => {
    const id = node.attrs.id;

    const [opened, { open, close }] = useDisclosure(false);
    const [decodedData, setDecodedData] = useState<ChartData | null>(null);
    const [chartData, setChartData] = useState<string>("");

    const handleOpenChartOptions = () => {
        const decoded = decodeURIComponent(chartData);
        const config = JSON.parse(decoded);
        setDecodedData(config);
        open();
    };

    const handleChangeChartData = (newData: ChartData) => {
        const encoded = encodeURIComponent(JSON.stringify(newData));
        setChartData(encoded);
        updateAttributes({ chartData: encoded });
    };

    useEffect(() => {
        if (node.attrs.chartData) {
            setChartData(node.attrs.chartData);
        }

        return () => {
            setChartData("");
        };
    }, [node.attrs.chartData]);

    return (
        <>
            {decodedData && (
                <ModalChartOptions
                    isOpen={opened}
                    close={close}
                    metadata={decodedData}
                    changeChartData={handleChangeChartData}
                />
            )}

            <ChartContainer
                id={id}
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
            id: {
                default: null,
                parseHTML: (element: any) => element.getAttribute("data-id"),
                renderHTML: (attributes: any) => {
                    if (!attributes.id) return {};
                    return {
                        "data-id": attributes.id,
                    };
                },
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
                        id: element.getAttribute("data-id") || null,
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
