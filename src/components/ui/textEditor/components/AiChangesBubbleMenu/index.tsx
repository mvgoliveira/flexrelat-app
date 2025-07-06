import { AiChangesControlledBubbleMenu } from "@/components/ui/textEditor/plugins/AiChangesBubbleMenu";
import { Theme } from "@/themes";
import { Editor } from "@tiptap/core";
import { DOMSerializer } from "@tiptap/pm/model";
import { ReactElement, useEffect, useState } from "react";
import { MdClose, MdDone } from "react-icons/md";

import { StyledButton, Root } from "./styles";

export type SelectedChange = {
    html: string;
    json: object;
    from: number;
    to: number;
};

interface IAiChangesBubbleMenuProps {
    editor: Editor;
}

export const AiChangesBubbleMenu = ({ editor }: IAiChangesBubbleMenuProps): ReactElement => {
    const [selectedChanges, setSelectedChanges] = useState<SelectedChange[]>([]);

    const getIsOpen = (): boolean => {
        return true;
        if (!selectedChanges || selectedChanges.length <= 0) return false;
        const { from } = selectedChanges[selectedChanges.length - 1];
        const node = editor.state.doc.nodeAt(from);

        if (node?.attrs["class"] === "change-remove" || node?.attrs["class"] === "change-add") {
            return true;
        }

        return false;
    };

    // useEffect(() => {
    //     editor.state.doc.descendants((node, pos) => {
    //         if (editor.isDestroyed) return false;
    //         if (node.attrs.id === "62e714dae9") {
    //             const from = pos;
    //             const to = pos + node.nodeSize;
    //             const { state } = editor;
    //             const slice = state.doc.slice(from, to);
    //             const fragment = DOMSerializer.fromSchema(editor.schema).serializeFragment(
    //                 slice.content
    //             );
    //             const container = document.createElement("div");
    //             container.appendChild(fragment);
    //             const html = container.innerHTML;
    //             console.log(html);
    //             setSelectedChange({
    //                 html,
    //                 json: node.toJSON(),
    //                 from,
    //                 to,
    //             });
    //         }
    //     });
    // }, [editor]);

    useEffect(() => {
        const handler = () => {
            setSelectedChanges([]);

            editor.state.doc.descendants((node, pos) => {
                const nodeClass = node.attrs?.class;
                if (nodeClass === "change-remove" || nodeClass === "change-add") {
                    const serializer = DOMSerializer.fromSchema(editor.schema);
                    const fragment = serializer.serializeNode(node);
                    const container = document.createElement("div");
                    container.appendChild(fragment);

                    setSelectedChanges(prev => {
                        const exists = prev.some(
                            item => item.from === pos && item.to === pos + node.nodeSize
                        );
                        if (exists) return prev;

                        return [
                            ...prev,
                            {
                                html: container.innerHTML,
                                json: node.toJSON(),
                                from: pos,
                                to: pos + node.nodeSize,
                            },
                        ];
                    });
                }
            });
        };

        editor.on("transaction", handler);

        return () => {
            editor.off("transaction", handler);
        };
    }, [editor]);

    return (
        <AiChangesControlledBubbleMenu
            editor={editor}
            selectedContent={selectedChanges[selectedChanges.length - 1]}
            open={getIsOpen()}
        >
            <Root>
                <StyledButton onClick={() => {}} color="green30">
                    <MdDone size={12} color={Theme.colors.green80} />
                </StyledButton>

                <StyledButton onClick={() => {}} color="red30">
                    <MdClose size={12} color={Theme.colors.red80} />
                </StyledButton>
            </Root>
        </AiChangesControlledBubbleMenu>
    );
};
