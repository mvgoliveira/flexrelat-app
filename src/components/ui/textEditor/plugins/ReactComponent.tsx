import styled from "@emotion/styled";
import { mergeAttributes, Node } from "@tiptap/core";
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { ReactElement } from "react";

const RootStyles = styled(NodeViewWrapper)`
    background-color: ${({ theme }) => theme.colors.purple10};
    border: 2px solid ${({ theme }) => theme.colors.purple50};
    border-radius: 0.5rem;
    position: relative;
    overflow: visible;
    height: fit-content;
    padding: 10px;
    width: 100%;

    .content {
        width: 100%;

        tbody {
            width: 100%;
        }
    }
`;

const Component = (): ReactElement => {
    return (
        <RootStyles>
            <NodeViewContent className="content" />
        </RootStyles>
    );
};

export const ReactComponent = Node.create({
    name: "reactComponent",
    group: "block",
    content: "block+",

    parseHTML() {
        return [
            {
                tag: "react-component",
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["react-component", mergeAttributes(HTMLAttributes), 0];
    },

    addNodeView() {
        return ReactNodeViewRenderer(Component);
    },
});
