import {
    AiChangesControlledBubbleMenu,
    SelectedChange,
} from "@/components/layouts/document/textEditor/plugins/AiChangesBubbleMenu";
import { useDocumentContext } from "@/context/documentContext";
import { AiChange } from "@/repositories/changesAPI";
import { Theme } from "@/themes";
import { Editor } from "@tiptap/core";
import { ReactElement, useEffect, useRef, useState } from "react";
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
    const { approveChange, rejectChange, setSelectedChangeType } = useDocumentContext();
    const [selectedChanges, setSelectedChanges] = useState<SelectedChange[]>([]);
    const appliedChangeIdRef = useRef<string | null>(null);
    const processingRef = useRef<boolean>(false);

    const handleApproveChange = (): void => {
        setSelectedChanges([]);
        appliedChangeIdRef.current = null;
        processingRef.current = false;
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
        appliedChangeIdRef.current = null;
        processingRef.current = false;
        rejectChange(aiChange);
    };

    useEffect(() => {
        if (!aiChange) return;
        if (!editor) return;

        // Evita aplicar a mesma mudança múltiplas vezes
        if (appliedChangeIdRef.current === aiChange.id) {
            return;
        }

        const hasChangeRemove = editor.view.dom.querySelector(".change-remove");
        const hasChangeAdd = editor.view.dom.querySelector(".change-add");

        if (hasChangeRemove || hasChangeAdd) {
            return;
        }

        const element = editor.view.dom.querySelector(`[data-id="${aiChange.old_content.id}"]`);

        if (element) {
            const pos = editor.state.doc.resolve(editor.view.posAtDOM(element, 0)).before(1);
            const node = editor.state.doc.nodeAt(pos);

            if (node) {
                const elementTypeName = node.type.name;

                const targetElement = document.querySelector(
                    `[data-id="${aiChange.old_content.id}"]`
                );

                if (targetElement) {
                    const scrollTarget =
                        elementTypeName === "table" ? targetElement.parentElement : targetElement;

                    scrollTarget?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "center",
                    });
                }

                if (aiChange.type === "update") {
                    if (processingRef.current) return;
                    processingRef.current = true;
                    appliedChangeIdRef.current = aiChange.id;

                    queueMicrotask(() => {
                        editor
                            .chain()
                            .setNodeSelection(pos)
                            .updateAttributes(elementTypeName, {
                                class: "change-remove",
                            })
                            .setMeta("addToHistory", false)
                            .run();

                        const insertPos = pos + node.nodeSize;
                        const docSizeBefore = editor.state.doc.content.size;
                        editor.chain().insertContentAt(insertPos, aiChange.new_content.html).run();
                        const docSizeAfter = editor.state.doc.content.size;
                        const insertedSize = docSizeAfter - docSizeBefore;

                        // Marcar todos os nós inseridos com "change-add"
                        let currentPos = insertPos;
                        let processedSize = 0;

                        while (
                            processedSize < insertedSize &&
                            currentPos < editor.state.doc.content.size
                        ) {
                            const newNode = editor.state.doc.nodeAt(currentPos);

                            if (!newNode) break;

                            const newNodeType = newNode.type.name;
                            editor
                                .chain()
                                .setNodeSelection(currentPos)
                                .updateAttributes(newNodeType, {
                                    class: "change-add",
                                })
                                .setMeta("addToHistory", false)
                                .run();

                            processedSize += newNode.nodeSize;
                            currentPos += newNode.nodeSize;
                        }

                        setSelectedChanges([
                            {
                                from: pos,
                                to: pos + node.nodeSize,
                                type: "remove",
                            },
                            {
                                from: insertPos + 1,
                                to: insertPos + insertedSize,
                                type: "add",
                            },
                        ]);

                        processingRef.current = false;
                    });
                }

                if (aiChange.type === "delete") {
                    if (processingRef.current) return;
                    processingRef.current = true;
                    appliedChangeIdRef.current = aiChange.id;

                    queueMicrotask(() => {
                        editor
                            .chain()
                            .setNodeSelection(pos)
                            .updateAttributes(elementTypeName, {
                                class: "change-remove",
                            })
                            .setMeta("addToHistory", false)
                            .run();

                        setSelectedChanges([
                            {
                                from: pos,
                                to: pos + node.nodeSize,
                                type: "remove",
                            },
                        ]);

                        processingRef.current = false;
                    });
                }

                if (aiChange.type === "create") {
                    if (processingRef.current) return;
                    processingRef.current = true;
                    appliedChangeIdRef.current = aiChange.id;

                    const insertPos = pos + node.nodeSize;
                    const changeId = aiChange.id;

                    queueMicrotask(() => {
                        const existingAddNode = editor.state.doc.nodeAt(insertPos);
                        if (existingAddNode && existingAddNode.attrs["class"] === "change-add") {
                            processingRef.current = false;
                            return;
                        }

                        if (appliedChangeIdRef.current !== changeId) {
                            processingRef.current = false;
                            return;
                        }

                        const docSizeBefore = editor.state.doc.content.size;
                        editor.chain().insertContentAt(insertPos, aiChange.new_content.html).run();
                        const docSizeAfter = editor.state.doc.content.size;
                        const insertedSize = docSizeAfter - docSizeBefore;

                        // Marcar todos os nós inseridos com "change-add"
                        let currentPos = insertPos;
                        let processedSize = 0;

                        while (
                            processedSize < insertedSize &&
                            currentPos < editor.state.doc.content.size
                        ) {
                            const newNode = editor.state.doc.nodeAt(currentPos);

                            if (!newNode) break;

                            const newNodeType = newNode.type.name;
                            editor
                                .chain()
                                .setNodeSelection(currentPos)
                                .updateAttributes(newNodeType, {
                                    class: "change-add",
                                })
                                .setMeta("addToHistory", false)
                                .run();

                            processedSize += newNode.nodeSize;
                            currentPos += newNode.nodeSize;
                        }

                        setSelectedChanges([
                            {
                                from: insertPos + 1,
                                to: insertPos + insertedSize,
                                type: "add",
                            },
                        ]);

                        processingRef.current = false;
                    });
                }
            }
        }
    }, [aiChange, editor]);

    useEffect(() => {
        if (aiChange) {
            setSelectedChangeType(aiChange.type);
        } else {
            setSelectedChangeType(null);
        }
    }, [aiChange, setSelectedChangeType]);

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
