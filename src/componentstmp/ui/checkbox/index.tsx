import { Typography } from "@/components/features/typography";
import { ReactElement } from "react";

import { Root, StyledCheckBox, StyledIndicator } from "./styles";

interface ICheckboxProps {
    id: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    text?: string;
}

export const Checkbox = ({ id, checked, onCheckedChange, text }: ICheckboxProps): ReactElement => {
    return (
        <Root>
            <StyledCheckBox id={id} checked={checked} onCheckedChange={onCheckedChange}>
                <StyledIndicator />
            </StyledCheckBox>

            <label htmlFor={id}>
                <Typography tag="p" fontSize={{ xs: "fs75" }} color="white" fontWeight="regular">
                    {text}
                </Typography>
            </label>
        </Root>
    );
};
