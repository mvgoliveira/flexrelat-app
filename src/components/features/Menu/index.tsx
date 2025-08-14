import { Typography } from "@/components/features/typography";
import { Popover } from "@/components/ui/popover";
import { IReactChildren } from "@/types/core";
import { ButtonHTMLAttributes, ReactElement } from "react";

import { Container, StyledItem } from "./styles";

const Menu = ({ children }: IReactChildren): ReactElement => {
    return <Popover>{children}</Popover>;
};

const Trigger = ({ children }: IReactChildren): ReactElement => (
    <Popover.Trigger>{children}</Popover.Trigger>
);
Menu.Trigger = Trigger;

const Content = ({ children }: IReactChildren): ReactElement => (
    <Popover.Content align="end" sideOffset={4} hasCloseButton={false} hasArrow={false}>
        <Container>{children}</Container>
    </Popover.Content>
);
Menu.Content = Content;

interface IItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    icon?: ReactElement;
    iconPosition?: "left" | "right";
}

const Item = ({ text, icon, iconPosition = "right", ...props }: IItemProps): ReactElement => (
    <StyledItem {...props}>
        {icon && iconPosition === "left" && icon}

        <Typography tag="p" fontSize={{ xs: "fs75" }} color="black" fontWeight="regular">
            {text}
        </Typography>

        {icon && iconPosition === "right" && icon}
    </StyledItem>
);
Menu.Item = Item;

export { Menu };
