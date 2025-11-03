import styled from "@emotion/styled";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import React from "react";

const Container = styled(NodeViewWrapper)`
    width: 100%;
    display: flex;
    user-select: none;
    pointer-events: auto;
    justify-content: center;
    margin-bottom: 9pt;

    &:hover {
        background: ${props => props.theme.colors.purple10};
    }
`;

const Content = styled.div`
    width: 100%;
    border-radius: 4px;
    background: ${props => props.theme.colors.white};
    border: 2px dashed ${props => props.theme.colors.gray30};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 8px;
    color: ${props => props.theme.colors.gray60};
    cursor: text;
`;

const TextContent = styled(Content)`
    font-size: 12pt;
    height: calc(12pt * 1.8);
`;

const TitleContent = styled(Content)`
    font-size: 18pt;
    font-weight: bold;
    height: calc(18pt * 1.8);
`;

const CitationContent = styled(Content)`
    font-size: 12pt;
    height: calc(12pt * 1.8);
    border-left: 4px solid ${props => props.theme.colors.gray40};
    border-right: none;
    border-top: none;
    border-bottom: none;
    border-radius: 0;
    padding-left: 16px;
    gap: 8px;
    font-style: italic;
    background: ${props => props.theme.colors.gray10};
`;

const QuoteIcon = styled.span`
    color: ${props => props.theme.colors.gray40};
    font-size: 16pt;
    line-height: 1;
`;

const PlaceholderComponent = ({ node, editor, getPos }: any) => {
    const id = node.attrs.id;
    const type = node.attrs.type;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const pos = getPos();

        if (pos === undefined || pos === null) return;

        switch (type) {
            case "text":
                editor
                    .chain()
                    .deleteRange({ from: pos, to: pos + node.nodeSize })
                    .insertContentAt(pos, {
                        type: "paragraph",
                        content: [],
                    })
                    .setTextSelection(pos + 1)
                    .run();

                setTimeout(() => {
                    editor.commands.focus(pos + 1);
                }, 0);

                break;
            case "title":
                editor
                    .chain()
                    .deleteRange({ from: pos, to: pos + node.nodeSize })
                    .insertContentAt(pos, {
                        type: "paragraph",
                        content: [],
                    })
                    .setTextSelection(pos + 1)
                    .setFontSize("18pt")
                    .setBold()
                    .run();
                break;
            case "citation":
                editor
                    .chain()
                    .deleteRange({ from: pos, to: pos + node.nodeSize })
                    .insertContentAt(pos, {
                        type: "blockquote",
                        content: [
                            {
                                type: "paragraph",
                                content: [],
                            },
                        ],
                    })
                    .setTextSelection(pos + 2)
                    .run();

                setTimeout(() => {
                    editor.commands.focus(pos + 2);
                }, 0);
                break;
            default:
                return;
        }
    };

    if (type === "text") {
        return (
            <Container id={id} contentEditable={false} suppressContentEditableWarning={true}>
                <TextContent onClick={handleClick}>Escreva alguma coisa...</TextContent>
            </Container>
        );
    }

    if (type === "title") {
        return (
            <Container id={id} contentEditable={false} suppressContentEditableWarning={true}>
                <TitleContent onClick={handleClick}>Escreva um título...</TitleContent>
            </Container>
        );
    }

    if (type === "citation") {
        return (
            <Container id={id} contentEditable={false} suppressContentEditableWarning={true}>
                <CitationContent onClick={handleClick}>
                    <QuoteIcon>&ldquo;</QuoteIcon>
                    Escreva uma citação...
                </CitationContent>
            </Container>
        );
    }

    return null;
};

export const Placeholder = Node.create({
    name: "placeholder",
    group: "block",
    atom: true,

    addAttributes() {
        return {
            type: {
                default: "text",
            },
            id: {
                default: null,
                parseHTML: (element: any) => element.getAttribute("data-id"),
                renderHTML: (attributes: any) => {
                    if (!attributes.id) return {};
                    return {
                        "data-id": attributes.id,
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: `placeholder`,
                getAttrs: element => {
                    const type = element.getAttribute("type") || "text";

                    return {
                        type: type,
                        id: element.getAttribute("data-id") || null,
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["placeholder", mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(PlaceholderComponent);
    },
});
