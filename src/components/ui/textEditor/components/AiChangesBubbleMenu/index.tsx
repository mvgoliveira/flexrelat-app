import {
    AiChangesControlledBubbleMenu,
    SelectedChange,
} from "@/components/ui/textEditor/plugins/AiChangesBubbleMenu";
import { useDocumentContext } from "@/context/documentContext";
import { AiChange } from "@/repositories/changesAPI";
import { Theme } from "@/themes";
import { Editor } from "@tiptap/core";
import { ReactElement, useEffect, useState } from "react";
import { MdClose, MdDone } from "react-icons/md";

import { StyledButton, Root } from "./styles";

interface IAiChangesBubbleMenuProps {
    editor: Editor;
    aiChange: AiChange;
}

export const AiChangesBubbleMenu = ({
    editor,
    aiChange,
}: IAiChangesBubbleMenuProps): ReactElement => {
    const { approveChange, rejectChange } = useDocumentContext();
    const [selectedChanges, setSelectedChanges] = useState<SelectedChange[]>([]);

    const handleApproveChange = (): void => {
        setSelectedChanges([]);
        approveChange(aiChange);
    };

    const handleRejectChange = (): void => {
        const element = editor.view.dom.querySelector(`[data-id="${aiChange.old_content.id}"]`);

        if (element) {
            const pos = editor.state.doc.resolve(editor.view.posAtDOM(element, 0)).before(1);
            const node = editor.state.doc.nodeAt(pos);

            if (node) {
                const elementTypeName = node.type.name;

                // Remove a classe "change-remove" do nó antigo
                editor
                    .chain()
                    .setNodeSelection(pos)
                    .updateAttributes(elementTypeName, {
                        class: "",
                    })
                    .setMeta("addToHistory", false)
                    .run();

                // Remove o nó com classe "change-add" se existir
                const nextPos = pos + node.nodeSize;
                const nextNode = editor.state.doc.nodeAt(nextPos);

                if (nextNode && nextNode.attrs["class"] === "change-add") {
                    editor
                        .chain()
                        .deleteRange({
                            from: nextPos,
                            to: nextPos + nextNode.nodeSize,
                        })
                        .setMeta("addToHistory", false)
                        .run();
                }
            }
        }

        setSelectedChanges([]);
        rejectChange(aiChange);
    };

    useEffect(() => {
        if (!aiChange) return;
        if (!editor) return;

        const element = editor.view.dom.querySelector(`[data-id="${aiChange.old_content.id}"]`);

        if (element) {
            const pos = editor.state.doc.resolve(editor.view.posAtDOM(element, 0)).before(1);
            const node = editor.state.doc.nodeAt(pos);
            if (node) {
                const elementTypeName = node.type.name;

                if (
                    node.attrs["class"] === "change-remove" ||
                    node.attrs["class"] === "change-add"
                ) {
                    return;
                }

                if (aiChange.type === "update") {
                    const targetElement = document.querySelector(
                        `[data-id="${aiChange.old_content.id}"]`
                    );

                    if (targetElement) {
                        const scrollTarget =
                            elementTypeName === "table"
                                ? targetElement.parentElement
                                : targetElement;

                        scrollTarget?.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                            inline: "center",
                        });
                    }

                    editor
                        .chain()
                        .setNodeSelection(pos)
                        .updateAttributes(elementTypeName, {
                            class: "change-remove",
                        })
                        .setMeta("addToHistory", false)
                        .run();

                    editor
                        .chain()
                        .insertContentAt(pos + node.nodeSize, aiChange.new_content.html)
                        .run();

                    const newNode = editor.state.doc.nodeAt(pos + node.nodeSize);

                    if (newNode) {
                        const newNodeType = newNode.type.name;
                        editor
                            .chain()
                            .setNodeSelection(pos + node.nodeSize)
                            .updateAttributes(newNodeType, {
                                class: "change-add",
                            })
                            .setMeta("addToHistory", false)
                            .run();
                    }

                    setSelectedChanges([
                        {
                            from: pos,
                            to: pos + node.nodeSize + 1,
                            type: "remove",
                        },
                        {
                            from: pos + node.nodeSize + 1,
                            to: pos + node.nodeSize + 1,
                            type: "add",
                        },
                    ]);
                }
            }
        }
    }, [aiChange, editor]);

    useEffect(() => {
        const handler = () => {
            const element = editor.view.dom.querySelector(`[data-id="${aiChange.old_content.id}"]`);

            if (element) {
                const pos = editor.state.doc.resolve(editor.view.posAtDOM(element, 0)).before(1);
                const node = editor.state.doc.nodeAt(pos);
                if (node) {
                    if (aiChange.type === "update") {
                        setSelectedChanges([
                            {
                                from: pos,
                                to: pos + node.nodeSize,
                                type: "remove",
                            },
                            {
                                from: pos + node.nodeSize + 1,
                                to: pos + node.nodeSize + 1,
                                type: "add",
                            },
                        ]);
                    }
                }
            }
        };

        editor.on("transaction", handler);

        return () => {
            editor.off("transaction", handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor]);

    return (
        <AiChangesControlledBubbleMenu editor={editor} selectedContent={selectedChanges[0]}>
            <Root>
                <StyledButton onClick={handleApproveChange} color="green30">
                    <MdDone size={12} color={Theme.colors.green80} />
                </StyledButton>

                <StyledButton onClick={handleRejectChange} color="red30">
                    <MdClose size={12} color={Theme.colors.red80} />
                </StyledButton>
            </Root>
        </AiChangesControlledBubbleMenu>
    );
};
