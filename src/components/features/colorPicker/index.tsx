import { Popover } from "@/components/ui/popover";
import { IReactChildren } from "@/types/core";
import { ReactElement, useEffect, useState } from "react";

import { ColorBadge } from "../colorBadge";
import { ColorInput } from "../colorInput";
import { Container, Divider, PresetContainer, SelectorContainer } from "./styles";

export type PresetColor = {
    isClearColor?: boolean;
    color: string;
    hasBorder: boolean;
    borderColor?: string;
};

interface IColorPickerProps extends IReactChildren {
    currentColor?: string;
    onChangeColor?: (color: string) => void;
    presetColors: PresetColor[];
}

export const ColorPicker = ({
    presetColors,
    currentColor = "",
    onChangeColor,
    children,
}: IColorPickerProps): ReactElement => {
    const [color, setColor] = useState<string>("");

    const handleColorChange = (newColor: string) => {
        setColor(newColor);
        if (onChangeColor) onChangeColor(newColor);
    };

    useEffect(() => {
        if (currentColor) {
            setColor(currentColor);
        }
    }, [currentColor]);

    return (
        <Popover>
            <Popover.Trigger>{children}</Popover.Trigger>
            <Popover.Content hasCloseButton={false} hasArrow={false}>
                <Container>
                    <PresetContainer>
                        {presetColors.map((presetColor, idx) => (
                            <ColorBadge
                                key={`color-badge-${idx}`}
                                color={presetColor.color}
                                hasBorder={presetColor.hasBorder}
                                borderColor={presetColor.borderColor}
                                onClick={e => {
                                    e.stopPropagation();
                                    handleColorChange(presetColor.color);
                                }}
                                isClearBadge={presetColor.isClearColor}
                            />
                        ))}
                    </PresetContainer>

                    <Divider />

                    <SelectorContainer>
                        <ColorInput currentColor={color} onChangeColor={handleColorChange} />
                    </SelectorContainer>
                </Container>
            </Popover.Content>
        </Popover>
    );
};
