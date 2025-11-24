import { Typography } from "@/components/features/typography";
import { ChangeEventHandler, HTMLInputTypeAttribute, ReactElement } from "react";

import { Root, StyledInput } from "./styles";

interface IInputProps {
    placeholder?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    label?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    hasError?: boolean;
    type?: HTMLInputTypeAttribute;
}

export const Input = ({
    placeholder,
    value,
    onChange,
    label,
    onKeyDown,
    hasError = false,
    type = "text",
}: IInputProps): ReactElement => {
    return (
        <Root onKeyDown={onKeyDown}>
            {label && (
                <Typography
                    tag="p"
                    fontSize={{ xs: "fs75" }}
                    color="black"
                    fontWeight="regular"
                    textAlign="left"
                >
                    {label}
                </Typography>
            )}

            <div style={{ width: "100%", height: 30 }}>
                <StyledInput
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    aria-label={label}
                    hasError={hasError}
                />
            </div>

            {hasError && (
                <div style={{ marginTop: 5 }}>
                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs75" }}
                        color="red50"
                        fontWeight="regular"
                        textAlign="left"
                    >
                        Campo obrigatório
                    </Typography>
                </div>
            )}
        </Root>
    );
};
