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
    const [leftAlignActive, setLeftAlignActive] = useState<boolean>(false);
    const [centerAlignActive, setCenterAlignActive] = useState<boolean>(false);
    const [rightAlignActive, setRightAlignActive] = useState<boolean>(false);
    const [justifyAlignActive, setJustifyAlignActive] = useState<boolean>(false);

    useEffect(() => {
        if (!editor) return;

        const handleUpdate = () => {
            setBoldActive(editor.isActive("bold"));
            setItalicActive(editor.isActive("italic"));
            setUnderlineActive(editor.isActive("underline"));
            setStrikethroughActive(editor.isActive("strike"));
            setLeftAlignActive(editor.isActive({ textAlign: "left" }));
            setCenterAlignActive(editor.isActive({ textAlign: "center" }));
            setRightAlignActive(editor.isActive({ textAlign: "right" }));
            setJustifyAlignActive(editor.isActive({ textAlign: "justify" }));
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
                    isLeftAlignActive={leftAlignActive}
                    onLeftAlignClick={() => editor?.chain().focus().setTextAlign("left").run()}
                    isCenterAlignActive={centerAlignActive}
                    onCenterAlignClick={() => editor?.chain().focus().setTextAlign("center").run()}
                    isRightAlignActive={rightAlignActive}
                    onRightAlignClick={() => editor?.chain().focus().setTextAlign("right").run()}
                    isJustifyAlignActive={justifyAlignActive}
                    onJustifyAlignClick={() =>
                        editor?.chain().focus().setTextAlign("justify").run()
                    }
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
