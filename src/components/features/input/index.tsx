import { Typography } from "@/components/features/typography";
import { ChangeEventHandler, ReactElement } from "react";

import { Root, StyledInput } from "./styles";

interface IInputProps {
    placeholder?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    label?: string;
}

export const Input = ({ placeholder, value, onChange, label }: IInputProps): ReactElement => {
    return (
        <Root>
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
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    aria-label={label}
                />
            </div>
        </Root>
    );
};
