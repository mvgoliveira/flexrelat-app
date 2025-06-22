import { IReactChildren } from "@/types/core";
import {
    Provider,
    Root as TooltipRoot,
    TooltipContentProps,
    TooltipProviderProps,
    TooltipTriggerProps,
} from "@radix-ui/react-tooltip";
import React, { ReactElement } from "react";

import { TooltipTrigger, TooltipContent } from "./styles";

const Tooltip = ({ children, ...props }: IReactChildren & TooltipProviderProps): ReactElement => (
    <Provider delayDuration={500} skipDelayDuration={300} {...props}>
        <TooltipRoot>{children}</TooltipRoot>
    </Provider>
);

const Trigger = ({ children, ...props }: IReactChildren & TooltipTriggerProps): ReactElement => (
    <TooltipTrigger {...props}>{children}</TooltipTrigger>
);
Trigger.displayName = "Trigger";
Tooltip.Trigger = Trigger;

const Content = ({ children, ...props }: IReactChildren & TooltipContentProps): ReactElement => (
    <TooltipContent sideOffset={5} align="center" {...props}>
        {children}
    </TooltipContent>
);
Content.displayName = "Content";
Tooltip.Content = Content;

export { Tooltip };
