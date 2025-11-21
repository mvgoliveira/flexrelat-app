import { Button } from "@/components/features/button";
import { Typography } from "@/components/features/typography";
import { Theme } from "@/themes";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { GrFormClose } from "react-icons/gr";

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
    hasCloseButton?: boolean;
    onClose?: () => void;
}

export const NavHeader = ({
    activeTab,
    headerItens,
    setActiveLeftTab,
    hasCloseButton = false,
    onClose,
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
                            fontSize={{ xs: "fs75" }}
                            color={activeTab === item.value ? "black" : "gray70"}
                            fontWeight="regular"
                        >
                            {item.text}
                        </Typography>
                    </Item>
                ))}
            </Container>

            {hasCloseButton && (
                <Button
                    height="25px"
                    width="25px"
                    variant="secondary"
                    padding="0 10px"
                    onClick={onClose}
                >
                    <div
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        <GrFormClose size={12} color={Theme.colors.black} />
                    </div>
                </Button>
            )}
        </Root>
    );
};
