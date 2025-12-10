import {
    IconElementbarChart,
    IconElementCitation,
    IconElementCode,
    IconElementColumns,
    IconElementGeometric,
    IconElementImage,
    IconElementLine,
    IconElementlineChart,
    IconElementMath,
    IconElementNotUniformColumns,
    IconElementPieChart,
    IconElementSeparator,
    IconElementTable,
    IconElementText,
    IconElementTitle,
} from "@/assets/svgs/icons";
import { SearchInput } from "@/components/features/searchInput";
import { Typography } from "@/components/features/typography";
import { ScrollArea } from "@/components/ui/scrollArea";
import { Toast } from "@/components/ui/toast";
import { useModelContext } from "@/context/modelContext";
import { ComponentTypes } from "@/repositories/componentsAPI";
import { Theme } from "@/themes";
import { ReactElement, ReactNode, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

import {
    ArrowButton,
    Content,
    ElementContainer,
    ElementIconContainer,
    GroupContainer,
    GroupContent,
    GroupLabelContainer,
    Root,
    Separator,
} from "./styles";

interface IElementProps {
    value: ComponentTypes;
    name: string;
    icon: ReactNode;
    coloredIcon: ReactNode;
    disabled?: boolean;
}

const Element = ({
    value,
    name,
    icon,
    coloredIcon,
    disabled = false,
}: IElementProps): ReactElement => {
    const { editor } = useModelContext();
    const toastErrorRef = useRef<{ publish: () => void } | null>(null);

    const handleElementClick = (variable: ComponentTypes) => {
        if (!editor) return;

        if (disabled) {
            if (toastErrorRef.current) toastErrorRef.current.publish();
            return;
        }

        const { state } = editor;
        const { selection } = state;
        const { from } = selection;

        if (
            variable === "text" ||
            variable === "title" ||
            variable === "citation" ||
            variable === "code"
        ) {
            const newNode = state.schema.nodes.placeholder.create({
                type: variable,
            });
            editor.chain().focus().insertContentAt(from, newNode.toJSON()).run();
            return;
        }

        if (variable === "separator") {
            editor.chain().focus().setHorizontalRule().run();
            return;
        }

        if (variable === "sheet") {
            const { schema } = state;
            const headerCell1 = schema.nodes.tableHeader.createAndFill();
            const headerCell2 = schema.nodes.tableHeader.createAndFill();
            const cell1 = schema.nodes.tableCell.createAndFill();
            const cell2 = schema.nodes.tableCell.createAndFill();

            if (!headerCell1 || !headerCell2 || !cell1 || !cell2) return;

            const headerRow = schema.nodes.tableRow.create(null, [headerCell1, headerCell2]);
            const row = schema.nodes.tableRow.create(null, [cell1, cell2]);
            const table = schema.nodes.table.create(null, [headerRow, row]);
            editor.chain().focus().insertContentAt(from, table.toJSON()).run();
            return;
        }

        if (variable === "math") {
            const newNode = state.schema.nodes.blockMath.create({
                latex: "E=mc^2",
            });
            editor.chain().focus().insertContentAt(from, newNode.toJSON()).run();
            return;
        }

        if (variable === "line") {
            const { schema } = state;
            const cell1 = schema.nodes.tableCell.create(
                { borderColor: Theme.colors.gray40 },
                schema.nodes.paragraph.create()
            );

            if (!cell1) return;

            const row = schema.nodes.tableRow.create(null, [cell1]);
            const table = schema.nodes.table.create(null, [row]);
            editor.chain().focus().insertContentAt(from, table.toJSON()).run();
            return;
        }

        if (variable === "lineChart") {
            const chartData = {
                type: "scatter",
                data: {
                    datasets: [
                        {
                            label: "Dado de Exemplo",
                            showLine: true,
                            lineTension: 0,
                            fill: false,
                            data: [
                                {
                                    x: 1,
                                    y: 0,
                                },
                                {
                                    x: 2,
                                    y: 20,
                                },
                                {
                                    x: 3,
                                    y: -30,
                                },
                            ],
                        },
                    ],
                },
                options: {
                    title: {
                        display: true,
                        text: "Título do Gráfico",
                    },
                    legend: {
                        display: true,
                        position: "top",
                        labels: {
                            usePointStyle: false,
                            boxWidth: 13,
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                type: "linear",
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: "Eixo X",
                                },
                                ticks: {
                                    major: {
                                        enabled: false,
                                    },
                                },
                            },
                        ],
                        yAxes: [
                            {
                                type: "linear",
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: "Eixo Y",
                                },
                                ticks: {
                                    major: {
                                        enabled: false,
                                    },
                                },
                            },
                        ],
                    },
                },
            };

            const newNode = state.schema.nodes.quickChart.create({
                chartData: encodeURIComponent(JSON.stringify(chartData)),
            });
            editor.chain().focus().insertContentAt(from, newNode.toJSON()).run();
            return;
        }

        if (variable === "barChart") {
            const chartData = {
                type: "bar",
                data: {
                    labels: ["Categoria 1", "Categoria 2", "Categoria 3"],
                    datasets: [
                        {
                            label: "Exemplo 1",
                            data: [10, 20, 30],
                        },
                        {
                            label: "Exemplo 2",
                            data: [15, 25, 30],
                        },
                    ],
                },
                options: {
                    title: {
                        display: true,
                        text: "Título do Gráfico",
                    },
                    legend: {
                        display: true,
                        position: "top",
                        labels: {
                            usePointStyle: false,
                            boxWidth: 13,
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                stacked: false,
                                scaleLabel: {
                                    display: true,
                                    labelString: "Eixo X",
                                },
                            },
                        ],
                        yAxes: [
                            {
                                stacked: false,
                                scaleLabel: {
                                    display: true,
                                    labelString: "Eixo Y",
                                },
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                },
            };

            const newNode = state.schema.nodes.quickChart.create({
                chartData: encodeURIComponent(JSON.stringify(chartData)),
            });
            editor.chain().focus().insertContentAt(from, newNode.toJSON()).run();
            return;
        }
    };

    return (
        <ElementContainer>
            <Toast>
                <Toast.Content ref={toastErrorRef} variant="error">
                    <Toast.Title>Componente Indisponível</Toast.Title>
                    <Toast.Description>
                        Este componente ainda não está disponível para uso.
                    </Toast.Description>
                </Toast.Content>
            </Toast>

            <ElementIconContainer
                disabled={disabled}
                onClick={() => handleElementClick(value)}
                draggable={!disabled}
                onDragStart={e => e.dataTransfer.setData("variable", value)}
            >
                {icon}
                {disabled && icon}
                {!disabled && coloredIcon}
            </ElementIconContainer>

            <Typography
                tag="p"
                fontSize={{ xs: "fs50" }}
                color="gray90"
                textAlign="center"
                fontWeight="regular"
            >
                {name}
            </Typography>
        </ElementContainer>
    );
};

interface IElementsGroupProps {
    name: string;
    elements: IElementProps[];
}

const ElementsGroup = ({ name, elements }: IElementsGroupProps): ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <>
            <GroupContainer>
                <GroupLabelContainer onClick={() => setIsOpen(!isOpen)}>
                    <Typography
                        tag="span"
                        fontSize={{ xs: "fs75" }}
                        color="gray70"
                        fontWeight="regular"
                    >
                        {name}
                    </Typography>

                    <ArrowButton>
                        {isOpen ? (
                            <MdKeyboardArrowDown size={14} color={Theme.colors.gray70} />
                        ) : (
                            <MdKeyboardArrowRight
                                size={14}
                                color={Theme.colors.gray70}
                                style={{ transform: "rotate(180deg)" }}
                            />
                        )}
                    </ArrowButton>
                </GroupLabelContainer>

                {isOpen && (
                    <GroupContent>
                        {elements.map(element => (
                            <Element key={element.value} {...element} />
                        ))}
                    </GroupContent>
                )}
            </GroupContainer>

            <Separator />
        </>
    );
};

const elementsGroups: IElementsGroupProps[] = [
    {
        name: "Elementos Base",
        elements: [
            {
                value: "title",
                name: "Título",
                icon: <IconElementTitle size={20} />,
                coloredIcon: <IconElementTitle size={20} color="blue50" />,
            },
            {
                value: "text",
                name: "Texto",
                icon: <IconElementText size={20} />,
                coloredIcon: <IconElementText size={20} color="blue50" />,
            },
            {
                value: "citation",
                name: "Citação",
                icon: <IconElementCitation size={20} />,
                coloredIcon: <IconElementCitation size={20} color="blue50" />,
            },
            {
                value: "separator",
                name: "Separador",
                icon: <IconElementSeparator size={40} />,
                coloredIcon: <IconElementSeparator size={40} color="blue50" />,
            },
            {
                value: "geometric",
                name: "Formas Geométricas",
                icon: <IconElementGeometric size={40} />,
                coloredIcon: <IconElementGeometric size={40} color="blue50" />,
                disabled: true,
            },
            {
                value: "image",
                name: "Imagem",
                disabled: true,
                icon: <IconElementImage size={25} />,
                coloredIcon: <IconElementImage size={25} color="blue50" />,
            },
            {
                value: "sheet",
                name: "Tabela",
                icon: <IconElementTable size={35} />,
                coloredIcon: <IconElementTable size={35} color="blue50" />,
            },
            {
                value: "code",
                name: "Código",
                icon: <IconElementCode size={35} />,
                coloredIcon: <IconElementCode size={35} color="blue50" />,
            },
            {
                value: "math",
                name: "Matemática",
                icon: <IconElementMath size={35} />,
                coloredIcon: <IconElementMath size={35} color="blue50" />,
            },
        ],
    },
    {
        name: "Gráficos",
        elements: [
            {
                value: "lineChart",
                name: "Linha",
                icon: <IconElementlineChart size={35} />,
                coloredIcon: <IconElementlineChart size={35} color="blue50" />,
            },
            {
                value: "barChart",
                name: "Barras",
                icon: <IconElementbarChart size={35} />,
                coloredIcon: <IconElementbarChart size={35} color="blue50" />,
            },
            {
                value: "sectorChart",
                name: "Setores",
                icon: <IconElementPieChart size={35} />,
                coloredIcon: <IconElementPieChart size={35} color="blue50" />,
                disabled: true,
            },
        ],
    },
    {
        name: "Layout",
        elements: [
            {
                value: "line",
                name: "Linha Simples",
                icon: <IconElementLine size={35} />,
                coloredIcon: <IconElementLine size={35} color="blue50" />,
            },
            {
                value: "columns",
                name: "Colunas",
                icon: <IconElementColumns size={35} />,
                coloredIcon: <IconElementColumns size={35} color="blue50" />,
                disabled: true,
            },
            {
                value: "non-uniform-columns",
                name: "Colunas Não Uniformes",
                icon: <IconElementNotUniformColumns size={35} />,
                coloredIcon: <IconElementNotUniformColumns size={35} color="blue50" />,
                disabled: true,
            },
        ],
    },
];

export const ModelComponents = (): ReactElement => {
    return (
        <Root>
            <div style={{ height: 30, paddingRight: 15 }}>
                <SearchInput />
            </div>

            <ScrollArea>
                <Content style={{ paddingRight: 15 }}>
                    {elementsGroups.map((group, index) => (
                        <ElementsGroup key={index} name={group.name} elements={group.elements} />
                    ))}
                </Content>
            </ScrollArea>
        </Root>
    );
};
