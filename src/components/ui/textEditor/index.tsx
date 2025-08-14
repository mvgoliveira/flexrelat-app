import { useDocumentContext } from "@/context/documentContext";
import { Theme } from "@/themes";
import { BulletList } from "@tiptap/extension-bullet-list";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import {
    FontSize,
    TextStyle,
    FontFamily,
    Color,
    BackgroundColor,
} from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import UniqueID from "@tiptap/extension-unique-id";
import { Focus, UndoRedo } from "@tiptap/extensions";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ReactElement, useEffect, useLayoutEffect, useRef } from "react";
import ShortUniqueId from "short-unique-id";

import { AiChangesBubbleMenu } from "./components/AiChangesBubbleMenu";
import { LoadingFloating } from "./components/LoadingFloating";
import { TextBubbleMenu } from "./components/TextBubbleMenu";
import { PaginationPlus, TableCellPlus, TableHeaderPlus, TablePlus, TableRowPlus } from "./plugins";
import { GlobalClass } from "./plugins/GlobalClass";
import { Indent } from "./plugins/Indent";
import { PreventEditExtension } from "./plugins/PreventEdit";
import { Root } from "./styles";

interface ITextEditorProps {
    onChange?: (text: string) => void;
    zoom?: number;
    marginRight?: number;
    marginLeft?: number;
    marginTop?: number;
    marginBottom?: number;
    pageWidth?: number;
    pageHeight?: number;
}

const TextEditor = ({
    onChange,
    marginTop = 113.39,
    marginRight = 75.59,
    marginBottom = 75.59,
    marginLeft = 113.39,
    pageWidth = 794,
    pageHeight = 1123,
    zoom = 100,
}: ITextEditorProps): ReactElement => {
    const { documentData, selectedChanges, changes, clearChange, loadingComponentId, setEditor } =
        useDocumentContext();

    const { randomUUID } = new ShortUniqueId({ length: 10 });

    const alreadyLoaded = useRef(false);

    const extensions = [
        Indent,
        UndoRedo,
        StarterKit.configure({
            dropcursor: false,
            undoRedo: false,
        }),
        TextAlign.configure({
            types: [
                "heading",
                "paragraph",
                "blockquote",
                "codeBlock",
                "table",
                "bulletList",
                "orderedList",
                "listItem",
            ],
        }),
        Focus.configure({
            className: "has-focus",
            mode: "shallowest",
        }),
        TablePlus.configure({
            resizable: true,
            lastColumnResizable: false,
            cellMinWidth: 50,
        }),
        TableRowPlus,
        TableHeaderPlus,
        TableCellPlus,
        PaginationPlus.configure({
            pageHeight: pageHeight,
            pageGap: 10,
            pageBreakBackground: Theme.colors.gray10,
            pageHeaderHeight: marginTop,
            pageFooterHeight: marginBottom,
            headerLeft: "",
            headerRight: "",
            footerLeft: "",
            footerRight: "",
        }),
        BulletList,
        OrderedList,
        ListItem,
        GlobalClass,
        UniqueID.configure({
            types: [
                "heading",
                "paragraph",
                "table",
                "bulletList",
                "orderedList",
                "listItem",
                "blockquote",
                "codeBlock",
                "image",
                "numberedHeading",
            ],
            generateID: () => randomUUID(),
        }),
        PreventEditExtension.configure({
            classes: ["change-remove", "change-add", "change-update", "change-loading"],
        }),
        Underline,
        FontFamily,
        TextStyle,
        FontSize,
        Color,
        BackgroundColor,
    ];

    const currentEditor = useEditor({
        extensions,
        immediatelyRender: false,
        autofocus: false,
        content: ``,
        onUpdate: ({ editor }) => {
            const value = editor.getText();
            if (onChange) onChange(value.replace(/\n\n/g, "\n"));
        },
    });

    useEffect(() => {
        setEditor(currentEditor);
    }, [currentEditor, setEditor]);

    useEffect(() => {
        if (!currentEditor) return;

        changes.forEach(change => {
            const element = currentEditor.view.dom.querySelector(
                `[data-id="${change.old_content.id}"]`
            );
            if (!element && change.status === "pending") {
                clearChange(change);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changes, currentEditor]);

    useEffect(() => {
        if (!currentEditor) return;

        // Clear all AI changes from the editor
        if (selectedChanges && selectedChanges.length === 0) {
            currentEditor.state.doc.descendants((node, pos) => {
                const nodeClass = node.attrs?.class;

                if (nodeClass === "change-remove") {
                    currentEditor
                        .chain()
                        .setNodeSelection(pos)
                        .updateAttributes(node.type.name, {
                            class: "",
                        })
                        .run();
                }

                if (nodeClass === "change-add") {
                    currentEditor
                        .chain()
                        .deleteRange({
                            from: pos,
                            to: pos + node.nodeSize,
                        })
                        .run();
                }
            });
        }
    }, [selectedChanges, currentEditor]);

    useLayoutEffect(() => {
        if (!alreadyLoaded.current && documentData && currentEditor) {
            currentEditor.commands.setContent(documentData.content);
            alreadyLoaded.current = true;
        }
    }, [documentData, currentEditor]);

    useEffect(() => {
        if (!currentEditor) return;

        const handleUpdate = () => {
            if (!loadingComponentId) {
                currentEditor.view.dom.querySelectorAll(".change-loading").forEach(element => {
                    const pos = currentEditor.state.doc
                        .resolve(currentEditor.view.posAtDOM(element, 0))
                        .before(1);
                    const node = currentEditor.state.doc.nodeAt(pos);
                    if (node) {
                        const elementTypeName = node.type.name;

                        currentEditor
                            .chain()
                            .focus()
                            .setNodeSelection(pos)
                            .updateAttributes(elementTypeName, { class: undefined })
                            .run();
                    }
                });
            }
        };

        currentEditor.on("update", handleUpdate);
        handleUpdate();
        return () => {
            currentEditor.off("update", handleUpdate);
        };
    }, [currentEditor, loadingComponentId, selectedChanges]);

    return (
        <>
            {currentEditor && (
                <TextBubbleMenu
                    editor={currentEditor}
                    blockClasses={["change-loading", "change-remove", "change-add"]}
                    types={[
                        "paragraph",
                        "heading",
                        "bulletList",
                        "orderedList",
                        "listItem",
                        "blockquote",
                        "table",
                    ]}
                />
            )}

            {currentEditor &&
                selectedChanges.map((aiChange, idx) => (
                    <AiChangesBubbleMenu key={idx} editor={currentEditor} aiChange={aiChange} />
                ))}

            {currentEditor && (
                <LoadingFloating
                    editor={currentEditor}
                    componentLoading={{ id: loadingComponentId }}
                />
            )}

            <Root
                data-editor-root
                zoom={zoom}
                marginLeft={marginLeft}
                marginRight={marginRight}
                marginBottom={marginBottom}
                marginTop={marginTop}
                pageWidth={pageWidth}
                pageHeight={pageHeight}
            >
                <EditorContent editor={currentEditor} />
            </Root>
        </>
    );
};

export default TextEditor;
