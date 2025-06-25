import { Node, mergeAttributes } from "@tiptap/core";

import { TableRowGroup } from "./TableRowGroup";

export const TablePlus = Node.create({
    name: "table",
    group: "block",
    content: "(tableRowGroup|tableRow)+",
    tableRole: "table",
    selectable: true,
    draggable: true,
    addExtensions() {
        return [TableRowGroup];
    },

    parseHTML() {
        return [{ tag: "table" }];
    },
    renderHTML({ HTMLAttributes }) {
        return [
            "table",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { border: 1 }),
            0,
        ];
    },

    addNodeView() {
        return ({ node }) => {
            const dom = document.createElement("table");

            let max = 0;
            node.forEach(child => {
                const count =
                    child.type.name === "tableRowGroup"
                        ? Math.max(
                              ...Array.from(
                                  { length: child.content.childCount },
                                  (_, i) => child.content.child(i).childCount
                              )
                          )
                        : child.childCount;
                if (count > max) max = count;
            });
            dom.style.setProperty("--cell-count", max.toString());
            return { dom, contentDOM: dom };
        };
    },
});
