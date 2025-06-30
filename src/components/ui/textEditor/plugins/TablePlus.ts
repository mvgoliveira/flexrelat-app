import { mergeAttributes } from "@tiptap/core";
import Table, { createColGroup } from "@tiptap/extension-table";
import { DOMOutputSpec } from "@tiptap/pm/model";

import { TableRowGroup } from "./TableRowGroup";

export const TablePlus = Table.extend({
    content: "(tableRowGroup|tableRow)+",

    addOptions() {
        return {
            ...this.parent?.(),
            resizable: true,
        };
    },

    addExtensions() {
        return [TableRowGroup];
    },

    renderHTML({ HTMLAttributes }) {
        const table: DOMOutputSpec = [
            "table",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { border: 1 }),
            0,
        ];
        return table;
    },

    addNodeView() {
        return ({ node }) => {
            const dom = document.createElement("table");
            const { colgroup } = createColGroup(node, this.options.cellMinWidth);
            if (colgroup instanceof HTMLElement) {
                dom.appendChild(colgroup);
            }

            let maxCellCount = 0;
            node.forEach(child => {
                if (child.type.name === "tableRowGroup") {
                    child.forEach(row => {
                        if (row.type.name === "tableRow" && row.childCount > maxCellCount) {
                            maxCellCount = row.childCount;
                        }
                    });
                } else if (child.type.name === "tableRow" && child.childCount > maxCellCount) {
                    maxCellCount = child.childCount;
                }
            });

            dom.style.setProperty("--cell-count", maxCellCount.toString());
            return { dom, contentDOM: dom };
        };
    },
});

export default TablePlus;
