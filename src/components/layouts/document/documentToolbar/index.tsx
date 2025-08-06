import { IconFormatInkHighlighter } from "@/assets/svgs/icons";
import { ColorPicker } from "@/components/features/colorPicker";
import { Selector } from "@/components/features/selector";
import { Toolbar } from "@/components/features/toolbar";
import { Theme } from "@/themes";
import { ChangeEvent, ReactElement } from "react";
import { BiMinus } from "react-icons/bi";
import {
    MdAdd,
    MdFormatAlignJustify,
    MdFormatAlignLeft,
    MdFormatAlignRight,
    MdFormatBold,
    MdFormatClear,
    MdFormatColorText,
    MdFormatItalic,
    MdFormatLineSpacing,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdFormatStrikethrough,
    MdFormatUnderlined,
    MdMoreHoriz,
    MdOutlineFormatAlignCenter,
} from "react-icons/md";

import { FontFamilies } from "../content";
import { ColorContainer, FontSizeButton, Root, SizeInput } from "./styles";
import { PRESET_FONT_COLORS, TEXT_HIGHLIGHT_COLORS } from "./variables";

interface IDocumentToolbarProps {
    zoom: number;
    isBoldActive: boolean;
    onBoldClick: () => void;
    isItalicActive: boolean;
    onItalicClick: () => void;
    isUnderlineActive: boolean;
    onUnderlineClick: () => void;
    isStrikethroughActive: boolean;
    onStrikethroughClick: () => void;
    isLeftAlignActive: boolean;
    isCenterAlignActive: boolean;
    isRightAlignActive: boolean;
    isJustifyAlignActive: boolean;
    onLeftAlignClick: () => void;
    onCenterAlignClick: () => void;
    onRightAlignClick: () => void;
    onJustifyAlignClick: () => void;
    fontSize: number;
    onChangeFontSize: (size: number) => void;
    fontFamily: string;
    onChangeFontFamily: (family: FontFamilies) => void;
    fontColor: string;
    onChangeFontColor: (color: string) => void;
    highlightColor: string | null;
    onChangeHighlightColor: (color: string | null) => void;
}

export const DocumentToolbar = ({
    zoom,
    isBoldActive,
    onBoldClick,
    isItalicActive,
    onItalicClick,
    isUnderlineActive,
    onUnderlineClick,
    isStrikethroughActive,
    onStrikethroughClick,
    isCenterAlignActive,
    onCenterAlignClick,
    isLeftAlignActive,
    onLeftAlignClick,
    isRightAlignActive,
    onRightAlignClick,
    isJustifyAlignActive,
    onJustifyAlignClick,
    fontSize,
    onChangeFontSize,
    fontFamily,
    onChangeFontFamily,
    fontColor,
    onChangeFontColor,
    highlightColor,
    onChangeHighlightColor,
}: IDocumentToolbarProps): ReactElement => {
    const changeFontSize = (newSize: number) => {
        if (newSize < 1 || newSize > 200) return;
        onChangeFontSize(newSize);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const size = Number(e.target.value);
        if (!isNaN(size)) {
            changeFontSize(size);
        }
    };

    const handleDecrease = () => {
        changeFontSize(fontSize - 1);
    };

    const handleIncrease = () => {
        changeFontSize(fontSize + 1);
    };

    return (
        <Root zoom={zoom}>
            <Toolbar>
                <Toolbar.Group padding="0 5px" className="FontSelector">
                    <Toolbar.Item>
                        <Selector
                            value={fontFamily}
                            onValueChange={value => onChangeFontFamily(value as FontFamilies)}
                            options={[
                                {
                                    key: "times-new-roman",
                                    value: "Times New Roman",
                                },
                                {
                                    key: "arial",
                                    value: "Arial",
                                },
                            ]}
                        />
                    </Toolbar.Item>
                </Toolbar.Group>

                <Toolbar.Group className="FontSizeSelector Item">
                    <Toolbar.Item>
                        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <FontSizeButton onClick={handleDecrease}>
                                <BiMinus size={15} color="black" />
                            </FontSizeButton>

                            <SizeInput
                                value={fontSize}
                                type="number"
                                onChange={handleInputChange}
                                min="1"
                                max="200"
                            />

                            <FontSizeButton onClick={handleIncrease}>
                                <MdAdd size={15} color="black" />
                            </FontSizeButton>
                        </div>
                    </Toolbar.Item>
                </Toolbar.Group>

                <Toolbar.Group className="ColorSelector Item">
                    <ColorPicker
                        presetColors={TEXT_HIGHLIGHT_COLORS}
                        currentColor={highlightColor || ""}
                        onChangeColor={onChangeHighlightColor}
                    >
                        <Toolbar.ItemButton>
                            <IconFormatInkHighlighter size={18} color="black" />
                            <ColorContainer color={highlightColor || "white"} />
                        </Toolbar.ItemButton>
                    </ColorPicker>

                    <ColorPicker
                        presetColors={PRESET_FONT_COLORS}
                        currentColor={fontColor}
                        onChangeColor={onChangeFontColor}
                    >
                        <Toolbar.ItemButton>
                            <MdFormatColorText size={18} color={Theme.colors.black} />
                            <ColorContainer color={fontColor} />
                        </Toolbar.ItemButton>
                    </ColorPicker>
                </Toolbar.Group>

                <Toolbar.Group className="TextFormat Item">
                    <Toolbar.ItemButton active={isBoldActive} onClick={onBoldClick}>
                        <MdFormatBold size={18} color="black" />
                    </Toolbar.ItemButton>

                    <Toolbar.ItemButton active={isItalicActive} onClick={onItalicClick}>
                        <MdFormatItalic size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>

                    <Toolbar.ItemButton active={isUnderlineActive} onClick={onUnderlineClick}>
                        <MdFormatUnderlined size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>

                    <Toolbar.ItemButton
                        active={isStrikethroughActive}
                        onClick={onStrikethroughClick}
                    >
                        <MdFormatStrikethrough size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>
                </Toolbar.Group>

                <Toolbar.Group className="TextAlignment Item">
                    <Toolbar.ItemButton active={isLeftAlignActive} onClick={onLeftAlignClick}>
                        <MdFormatAlignLeft size={18} color="black" />
                    </Toolbar.ItemButton>
                    <Toolbar.ItemButton active={isCenterAlignActive} onClick={onCenterAlignClick}>
                        <MdOutlineFormatAlignCenter size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>
                    <Toolbar.ItemButton active={isRightAlignActive} onClick={onRightAlignClick}>
                        <MdFormatAlignRight size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>
                    <Toolbar.ItemButton active={isJustifyAlignActive} onClick={onJustifyAlignClick}>
                        <MdFormatAlignJustify size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>
                </Toolbar.Group>

                <Toolbar.Group className="ListFormat Item">
                    <Toolbar.ItemButton>
                        <MdFormatLineSpacing size={18} color="black" />
                    </Toolbar.ItemButton>
                    <Toolbar.ItemButton>
                        <MdFormatListBulleted size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>
                    <Toolbar.ItemButton>
                        <MdFormatListNumbered size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>
                    <Toolbar.ItemButton>
                        <MdFormatClear size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>
                </Toolbar.Group>

                <Toolbar.Group className="MoreOptions Item">
                    <Toolbar.ItemButton>
                        <MdMoreHoriz size={18} color="black" />
                    </Toolbar.ItemButton>
                </Toolbar.Group>
            </Toolbar>
        </Root>
    );
};
