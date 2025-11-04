import {
    IconElementBarGraph,
    IconElementCitation,
    IconElementCode,
    IconElementColumns,
    IconElementGeometric,
    IconElementImage,
    IconElementLine,
    IconElementLineGraph,
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
import { Theme } from "@/themes";
import { ReactElement, ReactNode, useState } from "react";
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
    value: string;
    name: string;
    icon: ReactNode;
    coloredIcon: ReactNode;
}

const Element = ({ value, name, icon, coloredIcon }: IElementProps): ReactElement => {
    return (
        <ElementContainer>
            <ElementIconContainer
                draggable
                onDragStart={e => e.dataTransfer.setData("variable", value)}
            >
                {icon}
                {coloredIcon}
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
            },
            {
                value: "image",
                name: "Imagem",
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
                value: "lineGraph",
                name: "Linha",
                icon: <IconElementLineGraph size={35} />,
                coloredIcon: <IconElementLineGraph size={35} color="blue50" />,
            },
            {
                value: "barGraph",
                name: "Barras",
                icon: <IconElementBarGraph size={35} />,
                coloredIcon: <IconElementBarGraph size={35} color="blue50" />,
            },
            {
                value: "sectorGraph",
                name: "Setores",
                icon: <IconElementPieChart size={35} />,
                coloredIcon: <IconElementPieChart size={35} color="blue50" />,
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
            },
            {
                value: "non-uniform-columns",
                name: "Colunas Não Uniformes",
                icon: <IconElementNotUniformColumns size={35} />,
                coloredIcon: <IconElementNotUniformColumns size={35} color="blue50" />,
            },
        ],
    },
];

export const DocComponents = (): ReactElement => {
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
