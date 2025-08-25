import styled from "@emotion/styled";
import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

const RootStyles = styled(NodeViewWrapper)`
    display: flex;
    margin-bottom: 9pt;
    position: relative;
    overflow: visible;
    height: fit-content;
    width: 100%;
    zoom: 0.6;
    align-items: center;
    justify-content: center;
`;

const ContentStyles = styled.div`
    width: 80%;
    background-color: ${({ theme }) => theme.colors.gray10};
    cursor: pointer;
    border-radius: 8px;
`;

// Dados padrão como fallback
const defaultChartData = [
    { x: 2010, y: 3.9670002 },
    { x: 2011, y: 5.2650003 },
    { x: 2012, y: 6.201 },
    { x: 2013, y: 7.8010006 },
    { x: 2014, y: 9.694 },
    { x: 2015, y: 11.214001 },
    { x: 2016, y: 11.973001 },
    { x: 2017, y: 12.250001 },
    { x: 2018, y: 12.816001 },
    { x: 2019, y: 13.413001 },
    { x: 2020, y: 13.626961 },
    { x: 2021, y: 14.30356 },
    { x: 2022, y: 15.295461 },
];

interface IChartComponentProps {
    node: {
        attrs: {
            data?: Array<{ x: number | string; y: number }>;
        };
    };
    updateAttributes: (attrs: any) => void;
}

const Component = ({ node }: IChartComponentProps): ReactElement => {
    // Usa os dados do node ou os dados padrão
    const chartData = node.attrs.data || defaultChartData;

    const onClick = () => {
        const htmlString = renderToStaticMarkup(
            <VictoryChart theme={VictoryTheme.clean}>
                <VictoryLine data={chartData} />
            </VictoryChart>
        );

        console.log(htmlString);
    };

    return (
        <RootStyles>
            <ContentStyles contentEditable={false} onClick={onClick}>
                <VictoryChart theme={VictoryTheme.clean}>
                    <VictoryLine data={chartData} />
                </VictoryChart>
            </ContentStyles>
        </RootStyles>
    );
};

export const ChartComponent = Node.create({
    name: "chartNode",
    group: "block",
    content: "block+",

    addAttributes() {
        return {
            data: {
                default: null,
                parseHTML: element => {
                    const dataAttr = element.getAttribute("data-chart-data");
                    return dataAttr ? JSON.parse(dataAttr) : null;
                },
                renderHTML: attributes => {
                    if (!attributes.data) return {};
                    return {
                        "data-chart-data": JSON.stringify(attributes.data),
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "chart-node",
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["chart-node", mergeAttributes(HTMLAttributes), 0];
    },

    addNodeView() {
        return ReactNodeViewRenderer(Component);
    },
});
