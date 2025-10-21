import { Typography } from "@/components/features/typography";
import ZoomButton from "@/components/features/zoomButton";
import { ScrollArea } from "@/components/ui/scrollArea";
import TextEditor from "@/components/ui/textEditor";
import { useDocumentContext } from "@/context/documentContext";
import { ReactElement, useEffect, useRef, useState } from "react";

import { DocumentToolbar } from "../documentToolbar";
import { DocumentHeader, DocumentRoot, FloatContainer, PageContainer, Root } from "./styles";

export type FontFamilies = "times-new-roman" | "arial";

export const DocumentContent = (): ReactElement => {
    const { editor } = useDocumentContext();

    const [zoom, setZoom] = useState<number>(83);
    const [pageWidth, setPageWidth] = useState<number>(794);
    const [pageHeight, setPageHeight] = useState<number>(1123);
    const [marginTop, setMarginTop] = useState(113.385826772);
    const [marginRight, setMarginRight] = useState(75.590551181);
    const [marginBottom, setMarginBottom] = useState(75.590551181);
    const [marginLeft, setMarginLeft] = useState(113.385826772);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const documentRootRef = useRef<HTMLDivElement>(null);

    const [boldActive, setBoldActive] = useState<boolean>(false);
    const [italicActive, setItalicActive] = useState<boolean>(false);
    const [underlineActive, setUnderlineActive] = useState<boolean>(false);
    const [strikethroughActive, setStrikethroughActive] = useState<boolean>(false);
    const [leftAlignActive, setLeftAlignActive] = useState<boolean>(true);
    const [centerAlignActive, setCenterAlignActive] = useState<boolean>(false);
    const [rightAlignActive, setRightAlignActive] = useState<boolean>(false);
    const [justifyAlignActive, setJustifyAlignActive] = useState<boolean>(false);
    const [fontColor, setFontColor] = useState<string>("#000000");
    const [highlightColor, setHighlightColor] = useState<string | null>(null);

    const [fontSize, setFontSize] = useState<number>(12);
    const [fontType, setFontType] = useState<FontFamilies>("times-new-roman");

    useEffect(() => {
        if (!editor) return;

        const handleUpdate = () => {
            setBoldActive(editor.isActive("bold"));
            setItalicActive(editor.isActive("italic"));
            setUnderlineActive(editor.isActive("underline"));
            setStrikethroughActive(editor.isActive("strike"));
            setFontColor(editor.getAttributes("textStyle")?.color || "#000000");
            setHighlightColor(editor.getAttributes("textStyle")?.backgroundColor || null);

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

    useEffect(() => {
        const calculateCurrentPage = () => {
            const scrollElement = scrollAreaRef.current?.querySelector(
                "[data-radix-scroll-area-viewport]"
            );

            if (!scrollElement) return;

            const scrollTop = scrollElement.scrollTop;
            const viewportHeight = scrollElement.clientHeight;

            const scaledPageHeight = pageHeight * (zoom / 100);

            const viewportCenter = scrollTop + viewportHeight / 2 - 10 * (totalPages - 1);

            const calculatedPage = Math.floor(viewportCenter / scaledPageHeight) + 1;

            setCurrentPage(Math.max(1, Math.min(calculatedPage, totalPages)));
        };

        const scrollElement = scrollAreaRef.current?.querySelector(
            "[data-radix-scroll-area-viewport]"
        );
        if (!scrollElement) return;

        const handleScroll = () => {
            calculateCurrentPage();
        };

        scrollElement.addEventListener("scroll", handleScroll);
        calculateCurrentPage();

        return () => {
            scrollElement.removeEventListener("scroll", handleScroll);
        };
    }, [zoom, pageHeight, totalPages]);

    useEffect(() => {
        const calculateTotalPages = () => {
            const editorElement = document.querySelector(".ProseMirror");

            if (!editorElement) {
                setTotalPages(1);
                return;
            }

            const contentHeight = editorElement.scrollHeight;

            const pagesCount = Math.round((contentHeight - 1123) / 1133 + 1);

            setTotalPages(Math.max(1, pagesCount));
        };

        if (editor) {
            calculateTotalPages();

            const handleUpdate = () => {
                setTimeout(calculateTotalPages, 0);
            };

            editor.on("transaction", handleUpdate);

            return () => {
                editor.off("transaction", handleUpdate);
            };
        }
    }, [editor, pageHeight, marginTop, marginBottom, zoom]);

    return (
        <Root>
            <DocumentHeader className="no-print">
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
                    fontColor={fontColor}
                    onChangeFontColor={color => editor?.chain().setColor(color).run()}
                    highlightColor={highlightColor}
                    onChangeHighlightColor={color => {
                        editor
                            ?.chain()
                            .setBackgroundColor(color || "")
                            .run();
                    }}
                />
            </DocumentHeader>

            <ScrollArea ref={scrollAreaRef}>
                <DocumentRoot className="DocumentRoot" ref={documentRootRef}>
                    <TextEditor
                        pageWidth={pageWidth}
                        pageHeight={pageHeight}
                        marginLeft={marginLeft}
                        marginRight={marginRight}
                        marginBottom={marginBottom}
                        marginTop={marginTop}
                        zoom={zoom}
                    />
                </DocumentRoot>

                <FloatContainer className="no-print">
                    <ZoomButton
                        initialZoom={zoom}
                        onZoomChange={setZoom}
                        className="custom-styles"
                        scrollAreaRef={scrollAreaRef}
                        pageWidth={pageWidth}
                    />

                    <PageContainer>
                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="black"
                            fontWeight="regular"
                        >
                            {currentPage} de {totalPages}
                        </Typography>
                    </PageContainer>
                </FloatContainer>
            </ScrollArea>
        </Root>
    );
};
