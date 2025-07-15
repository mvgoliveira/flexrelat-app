import ZoomButton from "@/components/features/zoomButton";
import { ScrollArea } from "@/components/ui/scrollArea";
import TextEditor from "@/components/ui/textEditor";
import { Editor } from "@tiptap/core";
import { ReactElement, useEffect, useState } from "react";

import { DocumentToolbar } from "../documentToolbar";
import { DocumentHeader, DocumentRoot, FloatContainer, Root } from "./styles";

export type FontFamilies = "times-new-roman" | "arial";

export const DocumentContent = (): ReactElement => {
    const [zoom, setZoom] = useState<number>(83);
    const [pageWidth, setPageWidth] = useState<number>(794);
    const [pageHeight, setPageHeight] = useState<number>(1123);
    const [editor, setEditor] = useState<Editor | null>(null);

    const [boldActive, setBoldActive] = useState<boolean>(false);
    const [italicActive, setItalicActive] = useState<boolean>(false);
    const [underlineActive, setUnderlineActive] = useState<boolean>(false);
    const [strikethroughActive, setStrikethroughActive] = useState<boolean>(false);
    const [leftAlignActive, setLeftAlignActive] = useState<boolean>(true);
    const [centerAlignActive, setCenterAlignActive] = useState<boolean>(false);
    const [rightAlignActive, setRightAlignActive] = useState<boolean>(false);
    const [justifyAlignActive, setJustifyAlignActive] = useState<boolean>(false);

    const [fontSize, setFontSize] = useState<number>(12);
    const [fontType, setFontType] = useState<FontFamilies>("times-new-roman");

    useEffect(() => {
        if (!editor) return;

        const handleUpdate = () => {
            setBoldActive(editor.isActive("bold"));
            setItalicActive(editor.isActive("italic"));
            setUnderlineActive(editor.isActive("underline"));
            setStrikethroughActive(editor.isActive("strike"));

            const currentFontSize = editor.getAttributes("textStyle")?.fontSize;
            if (currentFontSize) {
                const sizeValue = parseInt(currentFontSize.replace("px", "").replace("pt", ""));
                setFontSize(sizeValue);
            } else {
                setFontSize(12);
            }

            if (editor.isActive({ textAlign: "left" })) {
                setLeftAlignActive(true);
                setCenterAlignActive(false);
                setRightAlignActive(false);
                setJustifyAlignActive(false);
            } else if (editor.isActive({ textAlign: "center" })) {
                setLeftAlignActive(false);
                setCenterAlignActive(true);
                setRightAlignActive(false);
                setJustifyAlignActive(false);
            } else if (editor.isActive({ textAlign: "right" })) {
                setLeftAlignActive(false);
                setCenterAlignActive(false);
                setRightAlignActive(true);
                setJustifyAlignActive(false);
            } else if (editor.isActive({ textAlign: "justify" })) {
                setLeftAlignActive(false);
                setCenterAlignActive(false);
                setRightAlignActive(false);
                setJustifyAlignActive(true);
            } else {
                setLeftAlignActive(true);
                setCenterAlignActive(false);
                setRightAlignActive(false);
                setJustifyAlignActive(false);
            }

            if (editor.getAttributes("textStyle")?.fontFamily) {
                setFontType(editor.getAttributes("textStyle").fontFamily as FontFamilies);
            } else {
                setFontType("times-new-roman");
            }
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
                    fontSize={fontSize}
                    onChangeFontSize={(size: number) => {
                        setFontSize(size);
                        editor?.chain().setFontSize(`${size}pt`).run();
                    }}
                    fontFamily={fontType}
                    onChangeFontFamily={family => {
                        setFontType(family);
                        editor?.chain().setFontFamily(family).run();
                    }}
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

                    <FloatContainer>
                        <ZoomButton
                            initialZoom={zoom}
                            onZoomChange={setZoom}
                            className="custom-styles"
                        />
                    </FloatContainer>
                </DocumentRoot>
            </ScrollArea>
        </Root>
    );
};
