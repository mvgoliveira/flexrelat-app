import {
    AiChangesControlledBubbleMenu,
    SelectedChange,
} from "@/components/ui/textEditor/plugins/AiChangesBubbleMenu";
import { useDocumentContext } from "@/context/documentContext";
import { AiChange } from "@/repositories/flexbotApi";
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
    const { approveChange } = useDocumentContext();
    const [selectedChanges, setSelectedChanges] = useState<SelectedChange[]>([]);

    const handleApproveChange = (): void => {
        selectedChanges.forEach(change => {
            if (change.type === "remove") {
                editor
                    .chain()
                    .setNodeSelection(change.from)
                    .deleteRange({
                        from: change.from,
                        to: change.to,
                    })
                    .run();
            }

            if (change.type === "add") {
                editor
                    .chain()
                    .setNodeSelection(change.from)
                    .updateAttributes(change.nodeTypeName, {
                        class: "",
                    })
                    .run();
            }
        });

        setSelectedChanges([]);
        approveChange(aiChange);
    };

    useEffect(() => {
        if (!aiChange) return;

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

                if (node.attrs.id === aiChange.old_content.id && aiChange.type === "update") {
                    editor
                        .chain()
                        .setNodeSelection(pos)
                        .updateAttributes(elementTypeName, {
                            class: "change-remove",
                        })
                        .run();

                    editor
                        .chain()
                        .insertContentAt(pos + node.nodeSize, aiChange.new_content.html)
                        .updateAttributes(elementTypeName, {
                            class: "change-add",
                        })
                        .setNodeSelection(pos + node.nodeSize)
                        .run();

                    setSelectedChanges([
                        {
                            from: pos,
                            to: pos + node.nodeSize,
                            type: "remove",
                            nodeTypeName: elementTypeName,
                        },
                        {
                            from: pos + node.nodeSize + 1,
                            to: pos + node.nodeSize + 1,
                            type: "add",
                            nodeTypeName: elementTypeName,
                        },
                    ]);
                }
            }
        }

        // editor.state.doc.descendants((node, pos) => {
        //     if (editor.isDestroyed) return false;

        //     if (node.attrs["class"] === "change-remove" || node.attrs["class"] === "change-add") {
        //         return;
        //     }

        //     if (node.attrs.id === aiChange.old_content.id && aiChange.type === "update") {
        //         const removeTypeName = node.type.name;

        //         editor
        //             .chain()
        //             .setNodeSelection(pos)
        //             .updateAttributes(removeTypeName, {
        //                 class: "change-remove",
        //             })
        //             .run();

        //         editor
        //             .chain()
        //             .insertContentAt(pos + node.nodeSize, aiChange.new_content.html)
        //             .updateAttributes(removeTypeName, {
        //                 class: "change-add",
        //             })
        //             .setNodeSelection(pos + node.nodeSize)
        //             .run();

        //         setSelectedChanges([
        //             {
        //                 from: pos,
        //                 to: pos + node.nodeSize,
        //                 type: "remove",
        //                 nodeTypeName: removeTypeName,
        //             },
        //             {
        //                 from: pos + node.nodeSize + 1,
        //                 to: pos + node.nodeSize + 1,
        //                 type: "add",
        //                 nodeTypeName: removeTypeName,
        //             },
        //         ]);
        //     }
        // });
    }, [aiChange, editor]);

    // useEffect(() => {
    //     const handler = () => {
    //         setSelectedChanges([]);

    //         editor.state.doc.descendants((node, pos) => {
    //             const nodeClass = node.attrs?.class;
    //             if (nodeClass === "change-remove" || nodeClass === "change-add") {
    //                 setSelectedChanges(prev => {
    //                     const exists = prev.some(
    //                         item => item.from === pos && item.to === pos + node.nodeSize
    //                     );
    //                     if (exists) return prev;

    //                     return [
    //                         ...prev,
    //                         {
    //                             from: pos,
    //                             to: pos + node.nodeSize,
    //                             type: nodeClass === "change-remove" ? "remove" : "add",
    //                             nodeTypeName: node.type.name,
    //                         },
    //                     ];
    //                 });
    //             }
    //         });
    //     };

    //     editor.on("transaction", handler);

    //     return () => {
    //         editor.off("transaction", handler);
    //     };
    // }, [editor]);

    return (
        <AiChangesControlledBubbleMenu editor={editor} selectedContent={selectedChanges[0]}>
            <Root>
                <StyledButton onClick={() => {}} color="green30">
                    <MdDone size={12} color={Theme.colors.green80} onClick={handleApproveChange} />
                </StyledButton>

                <StyledButton onClick={() => {}} color="red30">
                    <MdClose size={12} color={Theme.colors.red80} />
                </StyledButton>
            </Root>
        </AiChangesControlledBubbleMenu>
    );
};
