import { Theme } from "@/themes";
import { BulletList } from "@tiptap/extension-bullet-list";
import Focus from "@tiptap/extension-focus";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ReactElement } from "react";

import { TextBubbleMenu } from "./components/TextBubbleMenu";
import { PaginationPlus, TableCellPlus, TableHeaderPlus, TablePlus, TableRowPlus } from "./plugins";
import { Indent } from "./plugins/Indent";
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
