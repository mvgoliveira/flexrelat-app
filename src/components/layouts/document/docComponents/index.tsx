import { ScrollArea } from "@/components/ui/scrollArea";
import { ReactElement, ReactNode } from "react";

import { Content, Root } from "./styles";

interface IElementProps {
    key: string;
    name: string;
    icon: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Element = ({ key, name, icon }: IElementProps): ReactElement => {
    return <div>Element</div>;
};

interface IElementsGroupProps {
    name: string;
    elements: IElementProps[];
    open?: boolean;
    setOpen?: (open: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ElementsGroup = ({ name, elements, open, setOpen }: IElementsGroupProps): ReactElement => {
    return <div>Elements Group</div>;
};

export const DocComponents = (): ReactElement => {
    return (
        <Root>
            <div></div>

            <ScrollArea>
                <Content></Content>
            </ScrollArea>
        </Root>
    );
};
