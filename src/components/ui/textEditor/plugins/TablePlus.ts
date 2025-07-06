import { mergeAttributes } from "@tiptap/core";
import Table, { createColGroup } from "@tiptap/extension-table";

import { TableRowGroup } from "./TableRowGroup";

export const TablePlus = Table.extend({
    content: "(tableRowGroup|tableRow)+",

    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: null,
                parseHTML: element => element.getAttribute("class"),
                renderHTML: attributes => {
                    return {
                        class: attributes.class,
                    };
                },
            },
        };
    },

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
        return [
            "table",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { border: 1 }),
            0,
        ];
    },

    addNodeView() {
        return ({ node }) => {
            const wrapper = document.createElement("div");
            const table = document.createElement("table");

            if (node.attrs.class) {
                wrapper.className = node.attrs.class;
            }

            const { colgroup } = createColGroup(node, this.options.cellMinWidth);

            if (colgroup instanceof HTMLElement) {
                table.appendChild(colgroup);
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

            table.style.setProperty("--cell-count", maxCellCount.toString());

            wrapper.appendChild(table);

            return {
                dom: wrapper,
                contentDOM: table, // <tr> e <tbody> vão ser injetados aqui
            };
        };
    },
});

export default TablePlus;
