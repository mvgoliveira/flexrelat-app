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

interface IItemButtonProps {
    active?: boolean;
}

const ItemButton = ({
    children,
    active = false,
    ...props
}: IReactChildren & ButtonHTMLAttributes<HTMLButtonElement> & IItemButtonProps): ReactElement => {
    return (
        <StyledButton active={active} as="button" {...props}>
            {children}
        </StyledButton>
    );
};
Toolbar.ItemButton = ItemButton;

export { Toolbar };
