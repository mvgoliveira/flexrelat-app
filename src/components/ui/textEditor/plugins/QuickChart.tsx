import { ModalChartColumnOptions } from "@/components/layouts/modals/modalChartColumnOptions";
import { ModalChartLineOptions } from "@/components/layouts/modals/modalChartLineOptions";
import styled from "@emotion/styled";
import { useDisclosure } from "@mantine/hooks";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ChartContainer = styled(NodeViewWrapper)`
    width: 100%;
    display: flex;
    user-select: none;
    pointer-events: auto;
    justify-content: center;
    align-items: center;
    margin-bottom: 9pt;
`;

const ChartContent = styled.div<{
    height: number;
    width: number;
}>`
    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    cursor: pointer;
    position: relative;

    &:hover {
        background: ${props => props.theme.colors.purple10};
    }
`;

const QuickChartComponent = ({ node, updateAttributes }: any) => {
    const id = node.attrs.id;
    const chartDataAttr = node.attrs.chartData;
    const width = node.attrs.width;
    const height = node.attrs.height;

    const [opened, { open, close }] = useDisclosure(false);
    const [decodedData, setDecodedData] = useState<any | null>(null);
    const [chartData, setChartData] = useState<string>("");
    const [chartWidth, setChartWidth] = useState<number>(0);
    const [chartHeight, setChartHeight] = useState<number>(0);

    const handleOpenChartOptions = () => {
        const decoded = decodeURIComponent(chartData);
        const config = JSON.parse(decoded);
        setDecodedData(config);
        open();
    };

    const handleChangeChartData = (newData: any) => {
        const encoded = encodeURIComponent(JSON.stringify(newData));
        setChartData(encoded);
        updateAttributes({ chartData: encoded });
    };

    const handleChangeSize = (dimension: "width" | "height", value: number) => {
        if (dimension === "width") {
            setChartWidth(value);
            updateAttributes({ width: value });
        } else {
            setChartHeight(value);
            updateAttributes({ height: value });
        }
    };

    useEffect(() => {
        if (chartDataAttr) setChartData(chartDataAttr);
        if (width) setChartWidth(width);
        if (height) setChartHeight(height);

        return () => {
            setChartData("");
            setChartWidth(0);
            setChartHeight(0);
        };
    }, [chartDataAttr, width, height]);

    return (
        <>
            {decodedData && decodedData.type === "scatter" && (
                <ModalChartLineOptions
                    isOpen={opened}
                    close={close}
                    metadata={decodedData}
                    changeChartData={handleChangeChartData}
                    chartWidth={chartWidth}
                    chartHeight={chartHeight}
                    handleChangeSize={handleChangeSize}
                />
            )}

            {decodedData && decodedData.type === "bar" && (
                <ModalChartColumnOptions
                    isOpen={opened}
                    close={close}
                    metadata={decodedData}
                    changeChartData={handleChangeChartData}
                    chartWidth={chartWidth}
                    chartHeight={chartHeight}
                    handleChangeSize={handleChangeSize}
                />
            )}

            <ChartContainer
                data-id={id}
                contentEditable={false}
                suppressContentEditableWarning={true}
            >
                <ChartContent
                    width={chartWidth}
                    height={chartHeight}
                    onClick={handleOpenChartOptions}
                >
                    <Image
                        src={`https://quickchart.io/chart?c=${chartData}&w=${chartWidth * 1.3}&h=${chartHeight * 1.3}`}
                        height={chartHeight}
                        width={chartWidth}
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
            width: {
                default: 500,
            },
            height: {
                default: 300,
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
                    const width = element.getAttribute("width");
                    const height = element.getAttribute("height");

                    return {
                        width: width || 500,
                        height: height || 300,
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
