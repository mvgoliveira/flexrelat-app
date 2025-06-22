import { Typography } from "@/components/features/typography";
import { Dispatch, ReactElement, SetStateAction } from "react";

import { Container, Item, Root } from "./styles";

export type TabHeaderType<T> = {
    value: T;
    icon: ReactElement;
    text: string;
};

interface INavHeaderProps {
    headerItens: TabHeaderType<string>[];
    activeTab: string;
    setActiveLeftTab: Dispatch<SetStateAction<string>>;
}

export const NavHeader = ({
    activeTab,
    headerItens,
    setActiveLeftTab,
}: INavHeaderProps): ReactElement => {
    return (
        <Root>
            <Container>
                {headerItens?.map((item, index) => (
                    <Item
                        key={index}
                        active={activeTab === item.value}
                        onClick={() => setActiveLeftTab(item.value)}
                    >
                        {item.icon}

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs50" }}
                            color={activeTab === item.value ? "black" : "gray70"}
                            fontWeight="regular"
                        >
                            {item.text}
                        </Typography>
                    </Item>
                ))}
            </Container>
        </Root>
    );
};
