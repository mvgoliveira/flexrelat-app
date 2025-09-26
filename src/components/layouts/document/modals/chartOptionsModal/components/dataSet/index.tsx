import { Typography } from "@/components/features/typography";
import { Theme } from "@/themes";
import { ReactElement, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

import { Container, Header, Root } from "./styles";

interface IDataSetProps {
    name: string;
}

export const DataSet = ({ name }: IDataSetProps): ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Root>
            <Header onClick={() => setIsOpen(!isOpen)}>
                <Typography
                    tag="p"
                    fontSize={{ xs: "fs75" }}
                    color="black"
                    fontWeight="regular"
                    textAlign="left"
                >
                    {name}
                </Typography>

                {isOpen ? (
                    <MdKeyboardArrowDown size={14} color={Theme.colors.gray70} />
                ) : (
                    <MdKeyboardArrowRight
                        size={14}
                        color={Theme.colors.gray70}
                        style={{ transform: "rotate(180deg)" }}
                    />
                )}
            </Header>

            {isOpen && <Container></Container>}
        </Root>
    );
};
