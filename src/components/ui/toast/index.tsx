import { Spinner } from "@/components/features/loading/spinner";
import { Theme } from "@/themes";
import { IReactChildren } from "@/types/core";
import type {
    Provider as ProviderPropTypes,
    Root as RootPropTypes,
    Title as TitlePropTypes,
    Description as DescriptionPropTypes,
    Action as ActionPropTypes,
} from "@radix-ui/react-toast";
import React, { ComponentProps, ReactElement } from "react";
import { MdCancel, MdCheckCircle, MdClose, MdInfo, MdWarning } from "react-icons/md";

import {
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastRoot,
    ToastIcon,
    ToastTitle,
    ToastViewport,
} from "./styles";

type VariantsType = "generic" | "success" | "warning" | "error" | "info";

type StylesType = {
    borderColor: keyof typeof Theme.colors;
    icon: ReactElement;
};

type VariantsStylesMap = Record<VariantsType, StylesType>;

export const VARIANTS_CONFIG: VariantsStylesMap = {
    generic: {
        borderColor: "gray50",
        icon: (
            <div style={{ transform: "scale(0.8)" }}>
                <Spinner />
            </div>
        ),
    },
    success: {
        borderColor: "green30",
        icon: <MdCheckCircle size={24} color={Theme.colors.green30} />,
    },
    warning: {
        borderColor: "yellow50",
        icon: <MdWarning size={24} color={Theme.colors.yellow50} />,
    },
    error: {
        borderColor: "red90",
        icon: <MdCancel size={24} color={Theme.colors.red10} />,
    },
    info: {
        borderColor: "blue60",
        icon: <MdInfo size={24} color={Theme.colors.blue60} />,
    },
};

const Toast = ({
    children,
    ...props
}: ComponentProps<typeof ProviderPropTypes> & IReactChildren): ReactElement => {
    return (
        <ToastProvider swipeDirection="right" {...props}>
            {children}
            <ToastViewport />
        </ToastProvider>
    );
};

export type Variants = "generic" | "success" | "warning" | "error" | "info";

interface IContentProps extends IReactChildren {
    variant?: Variants;
    hasCloseButton?: boolean;
}

const Content = React.forwardRef(
    (
        {
            children,
            variant = "generic",
            hasCloseButton = true,
            ...props
        }: ComponentProps<typeof RootPropTypes> & IContentProps,
        forwardedRef
    ) => {
        const [open, setOpen] = React.useState(false);

        React.useImperativeHandle(forwardedRef, () => ({
            publish: () => setOpen(true),
        }));

        return (
            <ToastRoot
                {...props}
                open={open}
                onOpenChange={setOpen}
                duration={3000}
                variant={variant}
            >
                <ToastIcon>{VARIANTS_CONFIG[variant].icon}</ToastIcon>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0px",
                        width: "calc(100% - 90px)",
                    }}
                >
                    {children}
                </div>

                {hasCloseButton && (
                    <ToastClose onClick={() => setOpen(false)}>
                        <MdClose color="#FFF" />
                    </ToastClose>
                )}
            </ToastRoot>
        );
    }
);
Content.displayName = "Content";
Toast.Content = Content;

const Action = ({
    children,
    ...props
}: ComponentProps<typeof ActionPropTypes> & IReactChildren): ReactElement => (
    <ToastAction asChild {...props}>
        {children}
    </ToastAction>
);
Action.displayName = "Action";
Toast.Action = Action;

const Title = ({ children, ...props }: ComponentProps<typeof TitlePropTypes> & IReactChildren) => (
    <ToastTitle {...props}>{children}</ToastTitle>
);
Title.displayName = "Title";
Toast.Title = Title;

const Description = ({
    children,
    ...props
}: ComponentProps<typeof DescriptionPropTypes> & IReactChildren) => (
    <ToastDescription {...props}>{children}</ToastDescription>
);
Description.displayName = "Description";
Toast.Description = Description;

export { Toast };
