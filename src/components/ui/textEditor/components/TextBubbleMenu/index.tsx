import { Typography } from "@/components/features/typography";
import { useDocumentContext } from "@/context/documentContext";
import { getMakeLonger } from "@/repositories/flexbotApi";
import { Theme } from "@/themes";
import { Editor } from "@tiptap/core";
import { DOMParser, DOMSerializer } from "@tiptap/pm/model";
import { Selection } from "@tiptap/pm/state";
import { motion } from "motion/react";
import { ReactElement, useState } from "react";
import { MdAutoAwesome, MdAutoFixHigh } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import { ControlledBubbleMenu } from "../../plugins/BubbleMenu";
import { RemovedButton, BubbleActionsContainer, StyledButton, Root } from "./styles";

export type SelectedContent = {
    id: string;
    html: string;
    json: any;
    from: number;
    to: number;
};

interface ITextBubbleMenuProps {
    editor: Editor;
}

export const TextBubbleMenu = ({ editor }: ITextBubbleMenuProps): ReactElement => {
    const { updateLoadingComponentId } = useDocumentContext();

    const [selectedContent, setSelectedContent] = useState<SelectedContent | null>(null);
    const [prevSelection, setPrevSelection] = useState<Selection | null>(null);

    const handleMakeLonger = async () => {
        if (!selectedContent) return;
        updateLoadingComponentId(selectedContent.id);
        setSelectedContent(null);
        setPrevSelection(null);

        const { from, to } = selectedContent;
        const { state } = editor;
        const slice = state.doc.slice(from, to);
        const fragment = DOMSerializer.fromSchema(editor.schema).serializeFragment(slice.content);

        const container = document.createElement("div");
        container.appendChild(fragment);

        const selectedHTML = container.innerHTML;

        const html = await getMakeLonger(selectedHTML);

        const element = document.createElement("div");
        element.innerHTML = html;

        const docFragment = DOMParser.fromSchema(editor.schema).parse(element);

        editor.commands.command(({ tr, dispatch }) => {
            tr.replaceWith(selectedContent.from, selectedContent.to, docFragment);
            if (dispatch) dispatch(tr);
            return true;
        });

        updateLoadingComponentId("");
    };

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

    const getIsOpen = (): boolean => {
        if (!selectedContent) return false;
        const { from } = selectedContent;
        const node = editor.state.doc.nodeAt(from);

        if (node?.attrs["class"] === "change-remove" || node?.attrs["class"] === "change-add") {
            return false;
        }

        return true;
    };

    return (
        <ControlledBubbleMenu
            editor={editor}
            onChangeSelectedContent={setSelectedContent}
            selectedContent={selectedContent}
            prevSelection={prevSelection}
            onChangePrevSelection={setPrevSelection}
            open={getIsOpen()}
        >
            <Root>
                <BubbleActionsContainer>
                    <StyledButton onClick={handleMakeLonger}>
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

                    <StyledButton onClick={() => {}}>
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

                    <StyledButton onClick={() => {}}>
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

                    <StyledButton onClick={getHtml}>
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
                </BubbleActionsContainer>

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                >
                    <RemovedButton onClick={handleRemoveNode}>
                        <RiDeleteBin6Line size={14} color={Theme.colors.purple50} />
                    </RemovedButton>
                </motion.div>
            </Root>
        </ControlledBubbleMenu>
    );
};
