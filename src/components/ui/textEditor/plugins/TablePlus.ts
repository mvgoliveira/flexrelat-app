import { mergeAttributes } from "@tiptap/core";
import Table from "@tiptap/extension-table";
import { DOMOutputSpec } from "@tiptap/pm/model";

import { TableRowGroup } from "./TableRowGroup";
export const TablePlus = Table.extend({
    content: "(tableRowGroup|tableRow)+",
    addExtensions() {
        return [TableRowGroup];
    },
    renderHTML({ HTMLAttributes }) {
        const table: DOMOutputSpec = [
            "table",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                border: 1,
            }),
            0,
        ];
        return table;
    },
    addNodeView() {
        return ({ node }) => {
            const dom = document.createElement("table");
            let maxCellCount = 0;
            node.forEach(child => {
                if (child.type.name === "tableRowGroup") {
                    child.forEach(row => {
                        if (row.type.name === "tableRow") {
                            if (row.childCount > maxCellCount) {
                                maxCellCount = row.childCount;
                            }
                        }
                    });
                } else if (child.type.name === "tableRow") {
                    if (child.childCount > maxCellCount) {
                        maxCellCount = child.childCount;
                    }
                }
            });

            dom.style.setProperty("--cell-count", maxCellCount.toString());
            return { dom, contentDOM: dom };
        };
    },
});

export default TablePlus;
