import { Theme } from "@/themes";
import { ReactElement } from "react";

import { Container, Loading } from "./styles";

interface ISpinnerProps {
    borderColor?: keyof typeof Theme.colors;
    spinColor?: keyof typeof Theme.colors;
}

const Spinner = ({
    borderColor = "gray30",
    spinColor = "gray100",
}: ISpinnerProps): ReactElement => {
    return (
        <Container>
            <Loading borderColor={borderColor} spinColor={spinColor} />
        </Container>
    );
};

export { Spinner };
