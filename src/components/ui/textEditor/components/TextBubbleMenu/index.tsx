import { Typography } from "@/components/features/typography";
import { Theme } from "@/themes";
import { Editor } from "@tiptap/core";
import { ReactElement, useEffect, useState } from "react";
import { MdAutoAwesome, MdAutoFixHigh } from "react-icons/md";

import { ControlledBubbleMenu } from "../../plugins/BubbleMenu";
import { Root, StyledButton } from "./styles";

export type SelectedContent = {
    html: string;
    json: any;
    from: number;
    to: number;
};

interface ITextBubbleMenuProps {
    editor: Editor;
}

export const TextBubbleMenu = ({ editor }: ITextBubbleMenuProps): ReactElement => {
    const [selectedContent, setSelectedContent] = useState<SelectedContent[]>([]);

    const onClick = () => {
        // const sel = editor.state.selection as NodeSelection;
        for (const sel of selectedContent) {
            const { from, to } = sel;

            const newContent = [
                {
                    type: "bulletList",
                    content: [
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    attrs: {
                                        id: "2ba3b961-303e-46f7-a5fe-54fa3c44199a",
                                    },
                                    content: [
                                        {
                                            type: "text",
                                            text: "Fully customizable tables with structured layouts, supporting multiple rows, individual cells, and optional headers for better data organization and readability.",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    attrs: {
                                        id: "52bced01-0c20-48fa-b995-5fc692cc49a0",
                                    },
                                    content: [
                                        {
                                            type: "text",
                                            text: "Includes advanced table features like ",
                                        },
                                        {
                                            type: "text",
                                            marks: [
                                                {
                                                    type: "code",
                                                },
                                            ],
                                            text: "colgroup",
                                        },
                                        {
                                            type: "text",
                                            text: " for grouping columns and ",
                                        },
                                        {
                                            type: "text",
                                            marks: [
                                                {
                                                    type: "code",
                                                },
                                            ],
                                            text: "rowspan",
                                        },
                                        {
                                            type: "text",
                                            text: " to allow cells to span across multiple rows, enhancing table flexibility.",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    attrs: {
                                        id: "0a39cd51-b353-42f1-9fa9-cf235a06d8c3",
                                    },
                                    content: [
                                        {
                                            type: "text",
                                            text: "Support for resizable columns, giving users the ability to dynamically adjust widths for a better viewing experience and improved content control.",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ];

            editor.commands.command(({ tr, state, dispatch }) => {
                const nodes = newContent.map(n => state.schema.nodeFromJSON(n));
                tr.replaceWith(from, to, nodes);
                if (dispatch) dispatch(tr);
                return true;
            });
        }
    };

    useEffect(() => {
        console.log(selectedContent);
    }, [selectedContent]);

    return (
        // <ControlledBubbleMenu open={!editor.view.state.selection.empty} editor={editor}>
        <ControlledBubbleMenu open={true} editor={editor} onChangeContent={setSelectedContent}>
            <Root>
                <StyledButton onClick={onClick}>
                    <MdAutoFixHigh size={12} color={Theme.colors.purple50} />

                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs50" }}
                        color="black"
                        fontWeight="regular"
                        textAlign="left"
                    >
                        Aumentar texto
                    </Typography>
                </StyledButton>

                <StyledButton onClick={onClick}>
                    <MdAutoFixHigh size={12} color={Theme.colors.purple50} />

                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs50" }}
                        color="black"
                        fontWeight="regular"
                        textAlign="left"
                    >
                        Encurtar texto
                    </Typography>
                </StyledButton>

                <StyledButton onClick={onClick}>
                    <MdAutoFixHigh size={12} color={Theme.colors.purple50} />

                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs50" }}
                        color="black"
                        fontWeight="regular"
                        textAlign="left"
                    >
                        Corrigir erros
                    </Typography>
                </StyledButton>

                <StyledButton onClick={onClick}>
                    <MdAutoAwesome size={12} color={Theme.colors.purple50} />

                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs50" }}
                        color="purple50"
                        fontWeight="regular"
                        textAlign="left"
                    >
                        Aprimore com IA
                    </Typography>
                </StyledButton>
            </Root>
        </ControlledBubbleMenu>
    );
};
