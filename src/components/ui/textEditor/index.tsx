import { AiChange } from "@/repositories/flexbotApi";
import { Theme } from "@/themes";
import { BulletList } from "@tiptap/extension-bullet-list";
import Focus from "@tiptap/extension-focus";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import TextStyle from "@tiptap/extension-text-style";
import UniqueID from "@tiptap/extension-unique-id";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ReactElement, useEffect } from "react";
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
    aiChanges: AiChange[];
}

const TextEditor = ({
    onChange,
    marginTop = 113.39,
    marginRight = 75.59,
    marginBottom = 75.59,
    marginLeft = 113.39,
    pageWidth = 794,
    pageHeight = 1123,
    zoom = 1,
    aiChanges = [],
}: ITextEditorProps): ReactElement => {
    const { randomUUID } = new ShortUniqueId({ length: 10 });

    const extensions = [
        Indent,
        StarterKit.configure({
            dropcursor: false,
        }),
        TextStyle.configure({ mergeNestedSpanStyles: true }),
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
            headerLeft: "",
            headerRight: "",
            footerLeft: "",
            footerRight: "",
        }),
        BulletList,
        OrderedList,
        ListItem,
        GlobalClass,
        // NumberedHeading,
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
    ];

    const currentEditor = useEditor({
        extensions,
        autofocus: false,
        content: `
            <h1 data-id="62e714dae9">Você já conferiu nossas tabelas? Elas são impressionantes!</h1>

            <ul data-id="62e714dae1">
                <li>Tabelas com linhas, células e cabeçalhos (opcional).</li>
                <li>Suporte para <code>colgroup</code> e <code>rowspan</code>.</li>
                <li>E até mesmo colunas redimensionáveis (opcional).</li>
            </ul>
            <p>
                <span data-decoration-id="id_1428080181" class="expression-active">
                    Aqui está um exemplo:
                </span>
            </p>
            <table>
                <tbody>
                    <tr>
                        <th colwidth="200">Nome</th>
                        <th colspan="3" colwidth="150,100">Descrição</th>
                    </tr>
                    <tr>
                        <td>Cyndi Lauper</td>
                        <td>Cantora</td>
                        <td>Compositora</td>
                        <td>Atriz</td>
                    </tr>
                    <tr>
                        <td>Marie Curie</td>
                        <td>Cientista</td>
                        <td>Química</td>
                        <td>Física</td>
                    </tr>
                    <tr>
                        <td>Indira Gandhi</td>
                        <td>Primeira-ministra</td>
                        <td colspan="2">Política</td>
                    </tr>
                </tbody>
            </table>
        `,
        onUpdate: ({ editor }) => {
            const value = editor.getText();
            if (onChange) onChange(value.replace(/\n\n/g, "\n"));
        },
    });

    useEffect(() => {
        if (!currentEditor) return;

        // Clear all AI changes from the editor
        if (aiChanges.length === 0) {
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
    }, [aiChanges, currentEditor]);

    return (
        <>
            {currentEditor && <TextBubbleMenu editor={currentEditor} />}

            {currentEditor &&
                aiChanges.map((aiChange, idx) => (
                    <AiChangesBubbleMenu key={idx} editor={currentEditor} aiChange={aiChange} />
                ))}

            {currentEditor && (
                <LoadingFloating editor={currentEditor} componentLoading={{ id: "62e714dae1" }} />
            )}

            <Root
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
