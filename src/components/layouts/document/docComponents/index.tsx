import { SearchInput } from "@/components/features/searchInput";
import { Typography } from "@/components/features/typography";
import { ScrollArea } from "@/components/ui/scrollArea";
import { Theme } from "@/themes";
import { ReactElement, ReactNode, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

import {
    ArrowButton,
    Content,
    GroupContainer,
    GroupContent,
    GroupLabelContainer,
    Root,
} from "./styles";

interface IElementProps {
    value: string;
    name: string;
    icon: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Element = ({ value, name, icon }: IElementProps): ReactElement => {
    return <div>Element</div>;
};

interface IElementsGroupProps {
    name: string;
    elements: IElementProps[];
}

const ElementsGroup = ({ name, elements }: IElementsGroupProps): ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
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
            <GroupContent>
                {elements.map(element => (
                    <Element key={element.value} {...element} />
                ))}
            </GroupContent>
        </GroupContainer>
    );
};

const elementsGroups: IElementsGroupProps[] = [
    {
        name: "Elementos Base",
        elements: [
            { value: "text", name: "Texto", icon: <div>Icon</div> },
            { value: "image", name: "Imagem", icon: <div>Icon</div> },
            { value: "table", name: "Tabela", icon: <div>Icon</div> },
        ],
    },
];

export const DocComponents = (): ReactElement => {
    return (
        <Root>
            <div style={{ height: 30 }}>
                <SearchInput />
            </div>

            <ScrollArea>
                <Content>
                    {elementsGroups.map((group, index) => (
                        <ElementsGroup key={index} name={group.name} elements={group.elements} />
                    ))}
                </Content>
            </ScrollArea>
        </Root>
    );
};
