import { Popover } from "@/components/ui/popover";
import { IReactChildren } from "@/types/core";
import { ReactElement } from "react";

import { Container } from "./styles";

interface IToolbarMenuProps extends IReactChildren {
    open?: boolean;
}

const ToolbarMenu = ({ open, children }: IToolbarMenuProps): ReactElement => {
    return <Popover open={open}>{children}</Popover>;
};

const Trigger = ({ children }: IReactChildren): ReactElement => (
    <Popover.Trigger>{children}</Popover.Trigger>
);
ToolbarMenu.Trigger = Trigger;

const Content = ({ children }: IReactChildren): ReactElement => (
    <Popover.Content align="end" sideOffset={7} hasCloseButton={false} hasArrow={false}>
        <Container>{children}</Container>
    </Popover.Content>
);
ToolbarMenu.Content = Content;

export { ToolbarMenu };
