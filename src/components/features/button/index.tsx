import { IReactChildren } from "@/types/core";
import { ButtonHTMLAttributes, ReactElement } from "react";

import { ButtonContainer, StyledButton } from "./styles";
import { VARIANTS } from "./variants";

interface IButtonProps {
    variant?: VARIANTS;
    height?: string;
    width?: string;
    padding?: string;
}

export const Button = ({
    variant = "primary",
    height = "100%",
    width = "100%",
    padding = "0",
    children,
    ...props
}: IButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & IReactChildren): ReactElement => {
    return (
        <ButtonContainer height={height} width={width}>
            <StyledButton
                padding={padding}
                height={height}
                width={width}
                variant={variant}
                {...props}
            >
                {children}
            </StyledButton>
        </ButtonContainer>
    );
};
