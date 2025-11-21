import { Theme } from "@/themes";
import { IReactChildren } from "@/types/core";
import React, { ReactElement, ReactNode, ComponentPropsWithoutRef, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import {
    LabelContainer,
    Container,
    StyledInput,
    InputContainer,
    ShowPasswordButton,
} from "./styles";

type InputProps = ComponentPropsWithoutRef<"input">;

const Input = ({ children }: IReactChildren): ReactElement => <Container>{children}</Container>;

export interface ILabel {
    children: ReactNode;
    fieldId: string;
    variant?: "primary" | "secondary" | "tertiary";
}

const Label = ({ children, fieldId, variant = "primary" }: ILabel): ReactElement => (
    <LabelContainer htmlFor={fieldId} variant={variant}>
        {children}
    </LabelContainer>
);
Label.displayName = "Label";
Input.Label = Label;

export interface IFieldProps extends InputProps {
    tag?: "input" | "textarea";
    variant?: "primary" | "secondary" | "tertiary";
    maxLength?: number;
    hasError?: boolean;
    height?: string;
    icon?: ReactElement;
    hasShowPassword?: boolean;
}

const Field = React.forwardRef<HTMLInputElement, IFieldProps>(
    (
        {
            tag = "input",
            hasError = false,
            variant = "primary",
            height = "42px",
            maxLength,
            hasShowPassword = false,
            ...props
        },
        ref
    ): ReactElement => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <InputContainer {...props}>
                {props.icon}

                <StyledInput
                    ref={ref}
                    as={tag}
                    tag={tag}
                    variant={variant}
                    hasError={hasError}
                    maxLength={maxLength}
                    height={height}
                    {...props}
                    type={hasShowPassword && showPassword ? "text" : props.type}
                />

                {hasShowPassword && (
                    <>
                        {showPassword ? (
                            <ShowPasswordButton onClick={() => setShowPassword(false)}>
                                <MdVisibility size={12} color={Theme.colors.gray60} />
                            </ShowPasswordButton>
                        ) : (
                            <ShowPasswordButton onClick={() => setShowPassword(true)}>
                                <MdVisibilityOff size={12} color={Theme.colors.gray60} />
                            </ShowPasswordButton>
                        )}
                    </>
                )}
            </InputContainer>
        );
    }
);
Field.displayName = "Field";
Input.Field = Field;

export { Input };
