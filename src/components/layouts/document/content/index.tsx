import { ScrollArea } from "@/components/ui/scrollArea";
import TextEditor from "@/components/ui/textEditor";
import { Editor } from "@tiptap/core";
import { ReactElement, useEffect, useState } from "react";

import { DocumentToolbar } from "../documentToolbar";
import { DocumentHeader, DocumentRoot, Root } from "./styles";

export const DocumentContent = (): ReactElement => {
    const [zoom, setZoom] = useState<number>(0.83);
    const [pageWidth, setPageWidth] = useState<number>(794);
    const [pageHeight, setPageHeight] = useState<number>(1123);
    const [editor, setEditor] = useState<Editor | null>(null);

    const [boldActive, setBoldActive] = useState<boolean>(false);
    const [italicActive, setItalicActive] = useState<boolean>(false);
    const [underlineActive, setUnderlineActive] = useState<boolean>(false);
    const [strikethroughActive, setStrikethroughActive] = useState<boolean>(false);

    useEffect(() => {
        if (!editor) return;

        const handleUpdate = () => {
            setBoldActive(editor.isActive("bold"));
            setItalicActive(editor.isActive("italic"));
            setUnderlineActive(editor.isActive("underline"));
            setStrikethroughActive(editor.isActive("strike"));
        };

        editor?.on("transaction", handleUpdate);
        handleUpdate();
        return () => {
            editor?.off("transaction", handleUpdate);
        };
    }, [editor]);

    return (
        <Root>
            <DocumentHeader>
                <DocumentToolbar
                    zoom={zoom}
                    isBoldActive={boldActive}
                    onBoldClick={() => editor?.chain().focus().toggleBold().run()}
                    isItalicActive={italicActive}
                    onItalicClick={() => editor?.chain().focus().toggleItalic().run()}
                    isUnderlineActive={underlineActive}
                    onUnderlineClick={() => editor?.chain().focus().toggleUnderline().run()}
                    isStrikethroughActive={strikethroughActive}
                    onStrikethroughClick={() => editor?.chain().focus().toggleStrike().run()}
                />
            </DocumentHeader>

            <ScrollArea>
                <DocumentRoot className="DocumentRoot">
                    <TextEditor
                        pageWidth={pageWidth}
                        pageHeight={pageHeight}
                        zoom={zoom}
                        setEditor={setEditor}
                    />
                </DocumentRoot>
            </ScrollArea>
        </Root>
    );
};
