import styled from "@emotion/styled";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import Image from "next/image";
import React from "react";

// Tipos para os atributos
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
`;

const ChartContent = styled.div`
    height: 300px;
    width: 500px;
    cursor: pointer;
    position: relative;

    &:hover {
        background: ${props => props.theme.colors.purple10};
    }
`;

const QuickChartComponent = ({ node }: any) => {
    const { chartData }: IChartAttributes = node.attrs;

    return (
        <ChartContainer contentEditable={false} suppressContentEditableWarning={true}>
            <ChartContent>
                <Image
                    src={`https://quickchart.io/chart?c=${chartData}`}
                    height={300}
                    width={500}
                    alt="chart"
                />
            </ChartContent>
        </ChartContainer>
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
