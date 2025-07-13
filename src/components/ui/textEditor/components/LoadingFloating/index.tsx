import { ComponentLoading } from "@/repositories/changesApi";
import { Editor } from "@tiptap/core";
import { ReactElement, useEffect } from "react";

interface ILoadingFloatingProps {
    editor: Editor;
    componentLoading: ComponentLoading;
}

export const LoadingFloating = ({
    editor,
    componentLoading,
}: ILoadingFloatingProps): ReactElement => {
    useEffect(() => {
        if (!componentLoading) return;

        editor.state.doc.descendants((node, pos) => {
            if (editor.isDestroyed) return false;

            if (node?.attrs["class"] === "change-loading") {
                return;
            }

            const nodeTypeName = node.type.name;

            if (node.attrs.id === componentLoading.id) {
                editor
                    .chain()
                    .setNodeSelection(pos)
                    .updateAttributes(nodeTypeName, {
                        class: "change-loading",
                    })
                    .run();
            }
        });
    }, [componentLoading, editor]);

    return <></>;
};
