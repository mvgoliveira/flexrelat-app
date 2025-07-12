import { Typography } from "@/components/features/typography";
import { useDocumentContext } from "@/context/documentContext";
import { getMakeLonger } from "@/repositories/flexbotApi";
import { Theme } from "@/themes";
import { Editor } from "@tiptap/core";
import { DOMParser, DOMSerializer, Node } from "@tiptap/pm/model";
import { Selection } from "@tiptap/pm/state";
import { motion } from "motion/react";
import { ReactElement, useEffect, useState } from "react";
import { BiListCheck } from "react-icons/bi";
import { MdAutoAwesome } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbPencilMinus, TbPencilPlus } from "react-icons/tb";

import { ControlledBubbleMenu } from "../../plugins/BubbleMenu";
import { RemovedButton, BubbleActionsContainer, StyledButton, Root } from "./styles";

export type SelectedContent = {
    id: string;
    html: string;
    from: number;
    to: number;
};

interface ITextBubbleMenuProps {
    editor: Editor;
    blockClasses: string[];
    types: string[];
}

export const TextBubbleMenu = ({
    editor,
    blockClasses,
    types,
}: ITextBubbleMenuProps): ReactElement => {
    const { updateLoadingComponentId } = useDocumentContext();

    const [changeId, setChangeId] = useState<string>("");
    const [newNode, setNewNode] = useState<Node | null>(null);
    const [selectedContent, setSelectedContent] = useState<SelectedContent | null>(null);
    const [prevSelection, setPrevSelection] = useState<Selection | null>(null);

    const handleRemoveNode = () => {
        if (!selectedContent) return;

        editor.commands.command(({ tr, dispatch }) => {
            tr.deleteRange(selectedContent.from, selectedContent.to);
            if (dispatch) dispatch(tr);
            return true;
        });

        setSelectedContent(null);
        setPrevSelection(null);
    };

    const getHtml = () => {
        if (!selectedContent) return;

        const { from, to } = selectedContent;
        const { state } = editor;
        const slice = state.doc.slice(from, to);
        const fragment = DOMSerializer.fromSchema(editor.schema).serializeFragment(slice.content);

        const container = document.createElement("div");
        container.appendChild(fragment);

        const html = container.innerHTML;

        console.log(html);
    };

    const handleMakeLonger = async () => {
        if (!selectedContent) return;
        updateLoadingComponentId(selectedContent.id);
        setSelectedContent(null);
        setPrevSelection(null);
        setNewNode(null);
        setChangeId("");

        const html = await getMakeLonger(selectedContent.html);

        const element = document.createElement("div");
        element.innerHTML = html;

        const docFragment = DOMParser.fromSchema(editor.schema).parse(element);

        setNewNode(docFragment);
        setChangeId(selectedContent.id);
    };

    useEffect(() => {
        if (!editor || !changeId || !newNode) return;

        const handler = () => {
            const element = editor.view.dom.querySelector(`[data-id="${changeId}"]`);

            if (element) {
                const pos = editor.state.doc.resolve(editor.view.posAtDOM(element, 0)).before(1);
                const node = editor.state.doc.nodeAt(pos);

                if (node) {
                    editor.commands.command(({ tr, dispatch }) => {
                        tr.replaceWith(pos, pos + node.nodeSize, newNode);
                        if (dispatch) dispatch(tr);
                        return true;
                    });

                    updateLoadingComponentId("");
                    setChangeId("");
                    setNewNode(null);
                }
            }
        };

        editor.on("transaction", handler);
        handler();
        return () => {
            editor.off("transaction", handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor, changeId, newNode]);

    return (
        <ControlledBubbleMenu
            editor={editor}
            onChangeSelectedContent={setSelectedContent}
            selectedContent={selectedContent}
            prevSelection={prevSelection}
            onChangePrevSelection={setPrevSelection}
            blockClasses={blockClasses}
            types={types}
        >
            <Root>
                <BubbleActionsContainer>
                    <StyledButton onClick={handleMakeLonger}>
                        <TbPencilPlus size={12} color={Theme.colors.purple50} />

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="black"
                            fontWeight="regular"
                            textAlign="left"
                            fontFamily="inter"
                        >
                            Desenvolver texto
                        </Typography>
                    </StyledButton>

                    <StyledButton onClick={() => {}}>
                        <TbPencilMinus size={12} color={Theme.colors.purple50} />

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="black"
                            fontWeight="regular"
                            textAlign="left"
                        >
                            Encurtar texto
                        </Typography>
                    </StyledButton>

                    <StyledButton onClick={() => {}}>
                        <BiListCheck size={14} color={Theme.colors.purple50} />

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="black"
                            fontWeight="regular"
                            textAlign="left"
                        >
                            Corrigir ortografia
                        </Typography>
                    </StyledButton>

                    <StyledButton onClick={getHtml}>
                        <MdAutoAwesome size={12} color={Theme.colors.purple50} />

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="purple50"
                            fontWeight="regular"
                            textAlign="left"
                        >
                            Aprimore com IA
                        </Typography>
                    </StyledButton>
                </BubbleActionsContainer>

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                >
                    <RemovedButton onClick={handleRemoveNode}>
                        <RiDeleteBin6Line size={16} color={Theme.colors.purple50} />
                    </RemovedButton>
                </motion.div>
            </Root>
        </ControlledBubbleMenu>
    );
};
