import type { Root as RootPropTypes } from "@radix-ui/react-switch";
import React, { ComponentProps, ReactElement } from "react";

import { Container, StyledThumb, StyledSwitch } from "./styles";

type PropTypes = {
    $withLabels?: boolean;
    size?: "default" | "small";
};

const Switch = ({
    $withLabels = false,
    size = "default",
    ...props
}: ComponentProps<typeof RootPropTypes> & PropTypes): ReactElement => {
    return (
        <Container>
            <StyledSwitch $withLabels={size !== "small" && $withLabels} size={size} {...props}>
                <StyledThumb size={size} />
            </StyledSwitch>
        </Container>
    );
};

export { Switch };
