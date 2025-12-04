import { IconFormatInkHighlighter } from "@/assets/svgs/icons";
import { ColorPicker } from "@/components/features/colorPicker";
import { Selector } from "@/components/features/selector";
import { Toolbar } from "@/components/features/toolbar";
import { ToolbarMenu } from "@/components/features/ToolbarMenu";
import { Typography } from "@/components/features/typography";
import { useModelContext } from "@/context/modelContext";
import { useWindowSize } from "@/hooks/useWindowSize";
import { Theme } from "@/themes";
import { ChangeEvent, ReactElement, useState } from "react";
import { AiOutlineMergeCells } from "react-icons/ai";
import { BiMinus } from "react-icons/bi";
import {
    MdAdd,
    MdBorderColor,
    MdFormatAlignJustify,
    MdFormatAlignLeft,
    MdFormatAlignRight,
    MdFormatBold,
    MdFormatClear,
    MdFormatColorFill,
    MdFormatColorText,
    MdFormatItalic,
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

interface IModelToolbarProps {
    readOnly: boolean;
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
    backgroundColor: string;
    onChangeBackgroundColor: (color: string) => void;
    borderColor: string;
    onChangeBorderColor: (color: string) => void;
}

export const ModelToolbar = ({
    readOnly,
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
    backgroundColor,
    onChangeBackgroundColor,
    borderColor,
    onChangeBorderColor,
}: IModelToolbarProps): ReactElement => {
    const { width: windowWidth } = useWindowSize();
    const { editor } = useModelContext();

    const [moreOptionsIsActive, setMoreOptionsIsActive] = useState<boolean>(false);

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
            {readOnly && (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs50" }}
                        color="gray60"
                        fontWeight="medium"
                    >
                        Apenas Leitura
                    </Typography>
                </div>
            )}

            {!readOnly && (
                <Toolbar>
                    <Toolbar.Group padding="0 5px" className="FontSelector">
                        <Toolbar.Item>
                            <Selector
                                label="FONTES"
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

                    {windowWidth > 1080 && (
                        <Toolbar.Group className="TextFormat Item">
                            <Toolbar.ItemButton active={isBoldActive} onClick={onBoldClick}>
                                <MdFormatBold size={18} color="black" />
                            </Toolbar.ItemButton>

                            <Toolbar.ItemButton active={isItalicActive} onClick={onItalicClick}>
                                <MdFormatItalic size={18} color={Theme.colors.black} />
                            </Toolbar.ItemButton>

                            <Toolbar.ItemButton
                                active={isUnderlineActive}
                                onClick={onUnderlineClick}
                            >
                                <MdFormatUnderlined size={18} color={Theme.colors.black} />
                            </Toolbar.ItemButton>

                            <Toolbar.ItemButton
                                active={isStrikethroughActive}
                                onClick={onStrikethroughClick}
                            >
                                <MdFormatStrikethrough size={18} color={Theme.colors.black} />
                            </Toolbar.ItemButton>
                        </Toolbar.Group>
                    )}

                    {windowWidth > 1240 && (
                        <Toolbar.Group className="TextAlignment Item">
                            <Toolbar.ItemButton
                                active={isLeftAlignActive}
                                onClick={onLeftAlignClick}
                            >
                                <MdFormatAlignLeft size={18} color="black" />
                            </Toolbar.ItemButton>
                            <Toolbar.ItemButton
                                active={isCenterAlignActive}
                                onClick={onCenterAlignClick}
                            >
                                <MdOutlineFormatAlignCenter size={18} color={Theme.colors.black} />
                            </Toolbar.ItemButton>
                            <Toolbar.ItemButton
                                active={isRightAlignActive}
                                onClick={onRightAlignClick}
                            >
                                <MdFormatAlignRight size={18} color={Theme.colors.black} />
                            </Toolbar.ItemButton>
                            <Toolbar.ItemButton
                                active={isJustifyAlignActive}
                                onClick={onJustifyAlignClick}
                            >
                                <MdFormatAlignJustify size={18} color={Theme.colors.black} />
                            </Toolbar.ItemButton>
                        </Toolbar.Group>
                    )}

                    {windowWidth > 1310 && (
                        <Toolbar.Group className="ListFormat Item">
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
                    )}

                    {windowWidth <= 1310 && (
                        <Toolbar.Group className="MoreOptions Item">
                            <ToolbarMenu open={moreOptionsIsActive}>
                                <ToolbarMenu.Trigger>
                                    <Toolbar.ItemButton
                                        active={moreOptionsIsActive}
                                        onClick={() => setMoreOptionsIsActive(!moreOptionsIsActive)}
                                    >
                                        <MdMoreHoriz size={18} color="black" />
                                    </Toolbar.ItemButton>
                                </ToolbarMenu.Trigger>

                                <ToolbarMenu.Content>
                                    {windowWidth < 1080 && (
                                        <Toolbar.Group className="TextFormat Item">
                                            <Toolbar.ItemButton
                                                active={isBoldActive}
                                                onClick={onBoldClick}
                                            >
                                                <MdFormatBold size={18} color="black" />
                                            </Toolbar.ItemButton>

                                            <Toolbar.ItemButton
                                                active={isItalicActive}
                                                onClick={onItalicClick}
                                            >
                                                <MdFormatItalic
                                                    size={18}
                                                    color={Theme.colors.black}
                                                />
                                            </Toolbar.ItemButton>

                                            <Toolbar.ItemButton
                                                active={isUnderlineActive}
                                                onClick={onUnderlineClick}
                                            >
                                                <MdFormatUnderlined
                                                    size={18}
                                                    color={Theme.colors.black}
                                                />
                                            </Toolbar.ItemButton>

                                            <Toolbar.ItemButton
                                                active={isStrikethroughActive}
                                                onClick={onStrikethroughClick}
                                            >
                                                <MdFormatStrikethrough
                                                    size={18}
                                                    color={Theme.colors.black}
                                                />
                                            </Toolbar.ItemButton>
                                        </Toolbar.Group>
                                    )}

                                    {windowWidth < 1240 && (
                                        <Toolbar.Group className="TextAlignment Item">
                                            <Toolbar.ItemButton
                                                active={isLeftAlignActive}
                                                onClick={onLeftAlignClick}
                                            >
                                                <MdFormatAlignLeft size={18} color="black" />
                                            </Toolbar.ItemButton>
                                            <Toolbar.ItemButton
                                                active={isCenterAlignActive}
                                                onClick={onCenterAlignClick}
                                            >
                                                <MdOutlineFormatAlignCenter
                                                    size={18}
                                                    color={Theme.colors.black}
                                                />
                                            </Toolbar.ItemButton>
                                            <Toolbar.ItemButton
                                                active={isRightAlignActive}
                                                onClick={onRightAlignClick}
                                            >
                                                <MdFormatAlignRight
                                                    size={18}
                                                    color={Theme.colors.black}
                                                />
                                            </Toolbar.ItemButton>
                                            <Toolbar.ItemButton
                                                active={isJustifyAlignActive}
                                                onClick={onJustifyAlignClick}
                                            >
                                                <MdFormatAlignJustify
                                                    size={18}
                                                    color={Theme.colors.black}
                                                />
                                            </Toolbar.ItemButton>
                                        </Toolbar.Group>
                                    )}

                                    {windowWidth < 1310 && (
                                        <Toolbar.Group className="ListFormat Item">
                                            <Toolbar.ItemButton>
                                                <MdFormatListBulleted
                                                    size={18}
                                                    color={Theme.colors.black}
                                                />
                                            </Toolbar.ItemButton>

                                            <Toolbar.ItemButton>
                                                <MdFormatListNumbered
                                                    size={18}
                                                    color={Theme.colors.black}
                                                />
                                            </Toolbar.ItemButton>

                                            <Toolbar.ItemButton>
                                                <MdFormatClear
                                                    size={18}
                                                    color={Theme.colors.black}
                                                    onClick={() => {
                                                        if (!editor) return;

                                                        // editor
                                                        //     .chain()
                                                        //     .focus()
                                                        //     .insertContent({
                                                        //         type: "chartNode",
                                                        //     })
                                                        //     .run();
                                                    }}
                                                />
                                            </Toolbar.ItemButton>
                                        </Toolbar.Group>
                                    )}

                                    <Toolbar.Group className="TableColors Item">
                                        <ColorPicker
                                            presetColors={PRESET_FONT_COLORS}
                                            currentColor={backgroundColor}
                                            onChangeColor={onChangeBackgroundColor}
                                        >
                                            <Toolbar.ItemButton>
                                                <MdFormatColorFill size={18} color="black" />
                                                <ColorContainer
                                                    color={backgroundColor || "white"}
                                                />
                                            </Toolbar.ItemButton>
                                        </ColorPicker>

                                        <ColorPicker
                                            presetColors={PRESET_FONT_COLORS}
                                            currentColor={borderColor}
                                            onChangeColor={onChangeBorderColor}
                                        >
                                            <Toolbar.ItemButton>
                                                <MdBorderColor size={18} color="black" />
                                                <ColorContainer color={borderColor || "black"} />
                                            </Toolbar.ItemButton>
                                        </ColorPicker>
                                    </Toolbar.Group>

                                    <Toolbar.Group className="TableOptions Item">
                                        <Toolbar.ItemButton
                                            onClick={() => {
                                                if (!editor) return;
                                                editor.chain().focus().mergeOrSplit().run();
                                            }}
                                        >
                                            <AiOutlineMergeCells
                                                size={18}
                                                color={Theme.colors.black}
                                            />
                                        </Toolbar.ItemButton>
                                    </Toolbar.Group>
                                </ToolbarMenu.Content>
                            </ToolbarMenu>
                        </Toolbar.Group>
                    )}
                </Toolbar>
            )}
        </Root>
    );
};
