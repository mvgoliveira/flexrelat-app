import { Typography } from "@/components/features/typography";
import { ButtonHTMLAttributes, ReactElement } from "react";

import { ButtonContainer, StyledButton } from "./styles";
import { VARIANTS, VARIANTS_STYLES } from "./variants";

interface IButtonProps {
    variant?: VARIANTS;
    text: string;
    icon?: ReactElement;
    iconPosition?: "left" | "right";
    height?: string;
    width?: string;
}

export const Button = ({
    variant = "primary",
    text,
    icon,
    iconPosition = "left",
    height = "100%",
    width = "100%",
    ...props
}: IButtonProps & ButtonHTMLAttributes<HTMLButtonElement>): ReactElement => {
    return (
        <ButtonContainer height={height} width={width} variant={variant}>
            <StyledButton height={height} width={width} variant={variant} {...props}>
                {icon && iconPosition === "left" && icon}

                <Typography
                    tag="p"
                    fontSize={{ xs: "fs75" }}
                    color={VARIANTS_STYLES[variant].$color}
                    fontWeight="regular"
                    textAlign="center"
                >
                    {text}
                </Typography>

                {icon && iconPosition === "right" && icon}
            </StyledButton>
        </ButtonContainer>
    );
};
