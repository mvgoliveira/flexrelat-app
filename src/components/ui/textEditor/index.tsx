import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { PaginationPlus, TableCellPlus, TableHeaderPlus, TablePlus, TableRowPlus } from "./plugins";
import { Root } from "./styles";

const extensions = [
    StarterKit,
    Paragraph,
    Text,
    TablePlus,
    TableRowPlus,
    TableCellPlus,
    TableHeaderPlus,
    PaginationPlus.configure({
        pageHeight: 842,
        pageGap: 20,
        pageBreakBackground: "#f7f7f7",
        pageHeaderHeight: 50,
        // pageHeaderMargin: 20,
    }),
];

interface ITextEditorProps {
    onChange?: (text: string) => void;
}

const TextEditor = ({ onChange }: ITextEditorProps) => {
    const currentEditor = useEditor({
        extensions,
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
        <Root className="card">
            <EditorContent editor={currentEditor} />
        </Root>
    );
};

export default TextEditor;
