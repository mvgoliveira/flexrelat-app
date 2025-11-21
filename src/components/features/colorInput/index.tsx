import { Theme } from "@/themes";
import _ from "lodash";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { TbColorPicker } from "react-icons/tb";

import { StyledColorInput } from "./styles";

import "@mantine/core/styles.css";

interface IColorInputProps {
    currentColor: string;
    onChangeColor: (color: string) => void;
}

export const ColorInput = ({ currentColor, onChangeColor }: IColorInputProps): ReactElement => {
    const [color, setColor] = useState("");

    const saveColor = useMemo(
        () =>
            _.debounce(async (newColor: string) => {
                onChangeColor(newColor);
            }, 500),
        [onChangeColor]
    );

    const handleChangeColor = async (newColor: string) => {
        setColor(newColor);
        saveColor(newColor);
    };

    useEffect(() => {
        setColor(currentColor);
    }, [currentColor]);

    return (
        <StyledColorInput
            value={color}
            onChange={handleChangeColor}
            fixOnBlur={false}
            format="hex"
            placeholder="Selecionar cor"
            eyeDropperIcon={<TbColorPicker size={14} color={Theme.colors.gray90} />}
        />
    );
};
