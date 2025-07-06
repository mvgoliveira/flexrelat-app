import { IReactChildren } from "@/types/core";
import { ButtonHTMLAttributes, ReactElement } from "react";

import { Root, StyledButton, StyledGroup, StyledItem } from "./styles";

const Toolbar = ({ children }: IReactChildren): ReactElement => {
    return <Root>{children}</Root>;
};

type DivProps = React.HTMLAttributes<HTMLDivElement>;

interface IToolbarGroupProps extends DivProps {
    padding?: string;
}

const Group = ({
    children,
    padding = "0 10px",
    ...props
}: IReactChildren & DivProps & IToolbarGroupProps): ReactElement => {
    return (
        <StyledGroup padding={padding} {...props}>
            {children}
        </StyledGroup>
    );
};
Toolbar.Group = Group;

const Item = ({ children }: IReactChildren): ReactElement => {
    return <StyledItem>{children}</StyledItem>;
};
Toolbar.Item = Item;

const ItemButton = ({
    children,
    ...props
}: IReactChildren & ButtonHTMLAttributes<HTMLButtonElement>): ReactElement => {
    return (
        <StyledButton as="button" {...props}>
            {children}
        </StyledButton>
    );
};
Toolbar.ItemButton = ItemButton;

export { Toolbar };
