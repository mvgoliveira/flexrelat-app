import { Typography } from "@/components/features/typography";
import { Theme } from "@/themes";
import { IReactChildren } from "@/types/core";
import {
    Group as SelectGroup,
    ItemText as SelectItemText,
    ItemIndicator as SelectItemIndicator,
} from "@radix-ui/react-select";
import type { Root as RootPropTypes } from "@radix-ui/react-select";
import React, { ComponentProps, ReactElement, ReactNode } from "react";
import { MdCheck } from "react-icons/md";

import {
    StyledRoot,
    StyledLabel,
    StyledItem,
    StyledSeparator,
    StyledTrigger,
    StyledContent,
    StyledViewport,
} from "./styles";

export interface ISelectProps extends IReactChildren {
    children: ReactNode | ReactNode[];
}

const Select = ({
    children,
    ...props
}: ComponentProps<typeof RootPropTypes> & ISelectProps): ReactElement => (
    <StyledRoot {...props}>{children}</StyledRoot>
);

interface ITriggerProps extends IReactChildren {
    ariaLabel: string;
}

const Trigger = ({ ariaLabel, children }: ITriggerProps): ReactElement => (
    <StyledTrigger aria-label={ariaLabel}>{children}</StyledTrigger>
);
Select.Trigger = Trigger;
Trigger.displayName = "Trigger";

interface IContentProps extends IReactChildren {
    width?: number;
}

const Content = ({ children, width = 250 }: IReactChildren & IContentProps): ReactElement => (
    <StyledContent width={width} position="popper" align="end" sideOffset={5}>
        <StyledViewport>{children}</StyledViewport>
    </StyledContent>
);
Select.Content = Content;
Content.displayName = "Content";

type ItemPropTypes = {
    value: string;
    text: string;
    icon?: ReactElement;
    color: keyof typeof Theme.colors;
};

const Item = ({ value, text, icon, color }: ItemPropTypes) => (
    <StyledItem value={value}>
        <SelectItemIndicator className="SelectItemIndicator">
            <MdCheck size={12} color={Theme.colors[color]} />
        </SelectItemIndicator>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            {icon}

            <SelectItemText>
                <Typography
                    tag="p"
                    color={color}
                    fontWeight="regular"
                    fontFamily="inter"
                    fontSize={{ xs: "fs50" }}
                >
                    {text}
                </Typography>
            </SelectItemText>
        </div>
    </StyledItem>
);
Item.displayName = "SelectItem";
Select.Item = Item;

type GroupPropTypes = {
    label: string;
    children: ReactNode | ReactNode[];
};

const Group = ({ label, children }: GroupPropTypes) => (
    <SelectGroup>
        <StyledLabel>{label}</StyledLabel>
        {children}
    </SelectGroup>
);
Group.displayName = "Group";
Select.Group = Group;

const Separator = (): ReactElement => <StyledSeparator />;
Separator.displayName = "Separator";
Select.Separator = Separator;

export default Select;
