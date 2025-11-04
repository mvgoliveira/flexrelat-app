import { useDocumentContext } from "@/context/documentContext";
import { Theme } from "@/themes";
import { BulletList } from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import { ListItem } from "@tiptap/extension-list-item";
import MathExtension, { migrateMathStrings } from "@tiptap/extension-mathematics";
import { OrderedList } from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import "katex/dist/katex.min.css";
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
import _ from "lodash";
import { ReactElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import ShortUniqueId from "short-unique-id";

import { AiChangesBubbleMenu } from "./components/AiChangesBubbleMenu";
import { LoadingFloating } from "./components/LoadingFloating";
import { TableBubbleMenu } from "./components/TableBubbleMenu";
import { TextBubbleMenu } from "./components/TextBubbleMenu";
import {
    DropcursorZoom,
    PaginationPlus,
    TableCellPlus,
    TableHeaderPlus,
    TablePlus,
    TableRowPlus,
} from "./plugins";
import { Indent } from "./plugins/Indent";
import { Placeholder } from "./plugins/Placeholder";
import { PreventEditExtension } from "./plugins/PreventEdit";
import { QuickChart } from "./plugins/QuickChart";
import { Root } from "./styles";

interface ITextEditorProps {
    zoom?: number;
    marginRight?: number;
    marginLeft?: number;
    marginTop?: number;
    marginBottom?: number;
    pageWidth?: number;
    pageHeight?: number;
    updateSaveStatus: (status: "pending" | "success" | "error") => void;
}

const TextEditor = ({
    marginTop = 113.39,
    marginRight = 75.59,
    marginBottom = 75.59,
    marginLeft = 113.39,
    pageWidth = 794,
    pageHeight = 1123,
    zoom = 100,
    updateSaveStatus,
}: ITextEditorProps): ReactElement => {
    const {
        documentData,
        selectedChanges,
        changes,
        clearChange,
        loadingComponentId,
        setEditor,
        handleChangeDocumentContent,
    } = useDocumentContext();

    const { randomUUID } = new ShortUniqueId({ length: 10 });

    const alreadyLoaded = useRef(false);
    const zoomRef = useRef(zoom);
    const editorRef = useRef<ReturnType<typeof useEditor>>(null);

    // Atualizar a ref quando o zoom mudar
    useEffect(() => {
        zoomRef.current = zoom;
    }, [zoom]);

    const saveTitle = useMemo(
        () =>
            _.debounce(async (newContent: string) => {
                try {
                    updateSaveStatus("pending");

                    await handleChangeDocumentContent(newContent);
                    updateSaveStatus("success");
                } catch (error) {
                    updateSaveStatus("error");
                }
            }, 1000),
        [handleChangeDocumentContent, updateSaveStatus]
    );

    const extensions = [
        Indent,
        UndoRedo,
        StarterKit.configure({
            dropcursor: false,
            undoRedo: false,
        }),
        DropcursorZoom.configure({
            color: Theme.colors.blue50,
            height: 2,
            zoom: zoom,
            zoomRef: zoomRef,
            marginLeft: marginLeft,
            marginRight: marginRight,
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
        CodeBlock,
        CodeBlock.configure({
            enableTabIndentation: true,
        }),
        MathExtension.configure({
            blockOptions: {
                onClick: (node, pos) => {
                    const newCalculation = prompt("Enter new calculation:", node.attrs.latex);
                    if (newCalculation && editorRef.current) {
                        editorRef.current
                            ?.chain()
                            .setNodeSelection(pos)
                            .updateBlockMath({ latex: newCalculation })
                            .focus()
                            .run();

                        // Forçar salvamento após atualização
                        setTimeout(() => {
                            if (editorRef.current) {
                                saveTitle(editorRef.current.getHTML());
                            }
                        }, 100);
                    }
                },
            },
            inlineOptions: {
                onClick: (node, pos) => {
                    const newCalculation = prompt("Enter new calculation:", node.attrs.latex);
                    if (newCalculation && editorRef.current) {
                        editorRef.current
                            ?.chain()
                            .setNodeSelection(pos)
                            .updateInlineMath({ latex: newCalculation })
                            .focus()
                            .run();

                        // Forçar salvamento após atualização
                        setTimeout(() => {
                            if (editorRef.current) {
                                saveTitle(editorRef.current.getHTML());
                            }
                        }, 100);
                    }
                },
            },
        }),
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
                "quickChart",
                "blockMath",
                "inlineMath",
                "placeholder",
                "layout",
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
        QuickChart,
        Placeholder,
    ];

    const currentEditor = useEditor({
        extensions,
        shouldRerenderOnTransaction: true,
        immediatelyRender: false,
        autofocus: false,
        content: ``,
        onCreate: ({ editor }) => {
            migrateMathStrings(editor);
            editorRef.current = editor;
        },
        onUpdate: ({ editor }) => {
            saveTitle(editor.getHTML());
        },
        editorProps: {
            handleDrop: (view, event) => {
                const variable = event.dataTransfer?.getData("variable");

                if (!variable) {
                    return false;
                }

                event.preventDefault();

                // Com CSS zoom, o navegador já ajusta as coordenadas automaticamente
                const coords = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY,
                });

                if (!coords) {
                    return true;
                }

                const $pos = view.state.doc.resolve(coords.pos);
                let targetPos = coords.pos;

                for (let d = $pos.depth; d > 0; d--) {
                    const node = $pos.node(d);
                    if (node.isBlock) {
                        const nodeStart = $pos.start(d);
                        const nodeMid = nodeStart + Math.floor(node.nodeSize / 2);

                        if (coords.pos < nodeMid) {
                            targetPos = $pos.before(d);
                        } else {
                            targetPos = $pos.after(d);
                        }
                        break;
                    }
                }

                if (
                    variable === "text" ||
                    variable === "title" ||
                    variable === "citation" ||
                    variable === "code"
                ) {
                    const newNode = view.state.schema.nodes.placeholder.create({
                        type: variable,
                        id: randomUUID(),
                    });
                    view.dispatch(view.state.tr.insert(targetPos, newNode));
                    return true;
                }

                if (variable === "separator") {
                    const newNode = view.state.schema.nodes.horizontalRule.create();
                    view.dispatch(view.state.tr.insert(targetPos, newNode));
                    return true;
                }

                if (variable === "sheet") {
                    const { schema } = view.state;
                    const headerCell1 = schema.nodes.tableHeader.createAndFill();
                    const headerCell2 = schema.nodes.tableHeader.createAndFill();
                    const cell1 = schema.nodes.tableCell.createAndFill();
                    const cell2 = schema.nodes.tableCell.createAndFill();

                    if (!headerCell1 || !headerCell2 || !cell1 || !cell2) return true;

                    const headerRow = schema.nodes.tableRow.create(null, [
                        headerCell1,
                        headerCell2,
                    ]);
                    const row = schema.nodes.tableRow.create(null, [cell1, cell2]);
                    const table = schema.nodes.table.create(null, [headerRow, row]);
                    view.dispatch(view.state.tr.insert(targetPos, table));
                    return true;
                }

                if (variable === "math") {
                    const newNode = view.state.schema.nodes.blockMath.create({
                        latex: "E=mc^2",
                    });
                    view.dispatch(view.state.tr.insert(targetPos, newNode));
                    return true;
                }

                if (variable === "line") {
                    const { schema } = view.state;
                    const paragraph = schema.nodes.paragraph.createAndFill();

                    if (!paragraph) return true;

                    const layout = schema.nodes.layout.create({ type: "line", id: randomUUID() }, [
                        paragraph,
                    ]);
                    view.dispatch(view.state.tr.insert(targetPos, layout));
                    return true;
                }

                return true;
            },
        },
    });

    const saveNow = useCallback(async () => {
        if (!currentEditor) return;
        try {
            updateSaveStatus("pending");
            await handleChangeDocumentContent(currentEditor.getHTML());
            updateSaveStatus("success");
        } catch (error) {
            updateSaveStatus("error");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentEditor]);

    useEffect(() => {
        setEditor(currentEditor);
        editorRef.current = currentEditor;
    }, [currentEditor, setEditor]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "s") {
                event.preventDefault();
                saveNow();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [saveNow]);

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
                <TableBubbleMenu
                    editor={currentEditor}
                    blockClasses={["change-loading", "change-remove", "change-add"]}
                    types={["table"]}
                />
            )}

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
                <EditorContent id="print" editor={currentEditor} />
            </Root>
        </>
    );
};

export default TextEditor;
