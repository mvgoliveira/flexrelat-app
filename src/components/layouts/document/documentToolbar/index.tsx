import { FormatInkHighlighter } from "@/assets/svgs/icons";
import { Selector } from "@/components/features/selector";
import { Toolbar } from "@/components/features/toolbar";
import { Theme } from "@/themes";
import { ReactElement, useState } from "react";
import {
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

import { ColorContainer, Root } from "./styles";

export const DocumentToolbar = (): ReactElement => {
    const [fontType, setFontType] = useState<string>("times-new-roman");

    return (
        <Root>
            <Toolbar>
                <Toolbar.Group padding="0 5px" className="FontSelector">
                    <Toolbar.Item>
                        <Selector
                            value={fontType}
                            onValueChange={setFontType}
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

                <Toolbar.Group className="ColorSelector">
                    <Toolbar.ItemButton>
                        <FormatInkHighlighter size={18} color="black" />
                        <ColorContainer color="black" />
                    </Toolbar.ItemButton>
                    <Toolbar.ItemButton>
                        <MdFormatColorText size={18} color={Theme.colors.black} />
                        <ColorContainer color="black" />
                    </Toolbar.ItemButton>
                </Toolbar.Group>

                <Toolbar.Group className="TextFormat">
                    <Toolbar.ItemButton>
                        <MdFormatBold size={18} color="black" />
                    </Toolbar.ItemButton>
                    <Toolbar.ItemButton>
                        <MdFormatItalic size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>
                    <Toolbar.ItemButton>
                        <MdFormatUnderlined size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>
                    <Toolbar.ItemButton>
                        <MdFormatStrikethrough size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>
                </Toolbar.Group>

                <Toolbar.Group className="TextAlignment">
                    <Toolbar.ItemButton>
                        <MdFormatAlignLeft size={18} color="black" />
                    </Toolbar.ItemButton>
                    <Toolbar.ItemButton>
                        <MdOutlineFormatAlignCenter size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>
                    <Toolbar.ItemButton>
                        <MdFormatAlignRight size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>
                    <Toolbar.ItemButton>
                        <MdFormatAlignJustify size={18} color={Theme.colors.black} />
                    </Toolbar.ItemButton>
                </Toolbar.Group>

                <Toolbar.Group className="ListFormat">
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

                <Toolbar.Group className="MoreOptions">
                    <Toolbar.ItemButton>
                        <MdMoreHoriz size={18} color="black" />
                    </Toolbar.ItemButton>
                </Toolbar.Group>
            </Toolbar>
        </Root>
    );
};
