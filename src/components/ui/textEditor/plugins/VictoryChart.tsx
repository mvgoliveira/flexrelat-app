import styled from "@emotion/styled";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import React from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

// Tipos para os atributos
interface IChartAttributes {
    chartData: Array<{ x: number; y: number }>;
    chartType: "line" | "bar" | "area";
}

const ChartContainer = styled(NodeViewWrapper)`
    display: flex;
    user-select: none;
    pointer-events: auto;
    justify-content: center;
    margin-bottom: 9pt;
`;

const ChartContent = styled.div`
    width: 80%;
    border: 1px solid ${({ theme }) => theme.colors.black};
    cursor: pointer;

    &:hover {
        outline: 1px #007bff;
        outline-style: groove;
    }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VictoryChartComponent = ({ node, updateAttributes }: any) => {
    const { chartData, chartType }: IChartAttributes = node.attrs;

    return (
        <ChartContainer contentEditable={false} suppressContentEditableWarning={true}>
            <ChartContent>
                <VictoryChart theme={VictoryTheme.clean}>
                    {chartType === "line" && <VictoryLine data={chartData} />}
                    {/* Você pode adicionar outros tipos de gráfico aqui */}
                </VictoryChart>

                {/* Botão opcional para editar dados */}
                {/* <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <button
                        onClick={() => {
                            const newData = prompt(
                                "Digite os dados do gráfico (JSON)",
                                JSON.stringify(chartData)
                            );
                            if (newData) {
                                try {
                                    const parsedData = JSON.parse(newData);
                                    updateAttributes({ chartData: parsedData });
                                } catch (error) {
                                    alert("JSON inválido");
                                }
                            }
                        }}
                        style={{
                            padding: "5px 10px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer",
                        }}
                    >
                        Editar Dados
                    </button>
                </div> */}
            </ChartContent>
        </ChartContainer>
    );
};

export const VictoryChartExtension = Node.create({
    name: "victoryChart",

    group: "block",

    atom: true,

    addAttributes() {
        return {
            chartData: {
                default: [
                    { x: 1, y: 2 },
                    { x: 2, y: 3 },
                    { x: 3, y: 5 },
                    { x: 4, y: 4 },
                    { x: 5, y: 7 },
                ],
            },
            chartType: {
                default: "line",
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: `victory-chart`,
                getAttrs: element => {
                    const chartData = element.getAttribute("chart-data");
                    const chartType = element.getAttribute("chart-type");

                    return {
                        chartData: chartData ? JSON.parse(chartData) : null,
                        chartType: chartType || null,
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes, node }) {
        const { chartData, chartType } = node.attrs;

        return [
            "victory-chart",
            mergeAttributes(HTMLAttributes, {
                "chart-data": JSON.stringify(chartData),
                "chart-type": chartType,
            }),
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(VictoryChartComponent);
    },
});
