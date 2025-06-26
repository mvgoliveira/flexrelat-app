import { Theme } from "@/themes";
import { isChangeOrigin } from "@tiptap/extension-collaboration";
import Focus from "@tiptap/extension-focus";
import GapCursor from "@tiptap/extension-gapcursor";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import UniqueID from "@tiptap/extension-unique-id";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ReactElement } from "react";

import { TextBubbleMenu } from "./components/TextBubbleMenu";
import { PaginationPlus, TableCellPlus, TableHeaderPlus, TablePlus, TableRowPlus } from "./plugins";
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
    zoom = 1,
}: ITextEditorProps): ReactElement => {
    const extensions = [
        StarterKit,
        Paragraph,
        Text,
        TextStyle.configure({ mergeNestedSpanStyles: true }),
        Focus.configure({
            className: "has-focus",
            mode: "shallowest",
        }),
        GapCursor,
        TablePlus,
        TableRowPlus,
        TableHeaderPlus,
        TableCellPlus,
        UniqueID.configure({
            filterTransaction: transaction => !isChangeOrigin(transaction),
            types: [
                // "heading",
                // "paragraph",
                // "tableRow",
                // "tableHeader",
                // "tableCell",
                // "bulletList",
                // "orderedList",
                // "listItem",
            ],
        }),
        PaginationPlus.configure({
            pageHeight: pageHeight,
            pageGap: 10,
            pageBreakBackground: Theme.colors.gray10,
            headerHeight: marginTop,
            headerLeft: "",
            headerRight: "",
            footerLeft: "",
            footerRight: "",
        }),
    ];

    const currentEditor = useEditor({
        extensions,
        autofocus: false,
        content: `
            <h3>
                Have you seen our tables? They are amazing!
            </h3>
            <ul>
                <li>Tables with rows, cells and headers (optional)</li>
                <li>Support for <code>colgroup</code> and <code>rowspan</code></li>
                <li>And even resizable columns (optional)</li>
            </ul>
            <p>
                Here is an example:
            </p>
            <table>
                <tbody>
                    <tr>
                        <th colwidth="200">Name</th>
                        <th colspan="3" colwidth="150,100">Description</th>
                    </tr>
                    <tr>
                        <td>Cyndi Lauper</td>
                        <td>Singer</td>
                        <td>Songwriter</td>
                        <td>Actress</td>
                    </tr>
                    <tr>
                        <td>Marie Curie</td>
                        <td>Scientist</td>
                        <td>Chemist</td>
                        <td>Physicist</td>
                    </tr>
                    <tr>
                        <td>Indira Gandhi</td>
                        <td>Prime minister</td>
                        <td colspan="2">Politician</td>
                    </tr>
                </tbody>
            </table>
        `,
        onUpdate: ({ editor }) => {
            const value = editor.getText();
            if (onChange) onChange(value.replace(/\n\n/g, "\n"));
        },
    });

    return (
        <>
            {currentEditor && <TextBubbleMenu editor={currentEditor} />}

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
