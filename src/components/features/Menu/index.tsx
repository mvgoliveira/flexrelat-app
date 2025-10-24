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

interface IContentProps extends IReactChildren {
    sideOffset?: number;
    alignOffset?: number;
    hasCloseButton?: boolean;
    hasArrow?: boolean;
    align?: "start" | "center" | "end";
}

const Content = ({
    children,
    sideOffset = 4,
    alignOffset = 4,
    hasCloseButton = false,
    hasArrow = false,
    align = "end",
}: IContentProps): ReactElement => (
    <Popover.Content
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        hasCloseButton={hasCloseButton}
        hasArrow={hasArrow}
        align={align}
    >
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
