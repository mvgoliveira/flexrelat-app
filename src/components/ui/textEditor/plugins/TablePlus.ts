import Table, { createColGroup } from "@tiptap/extension-table";

import { TableRowGroup } from "./TableRowGroup";

export const TablePlus = Table.extend({
    content: "(tableRowGroup|tableRow)+",

    addAttributes() {
        // Pega TODOS os atributos da extensão pai
        const parentAttributes = this.parent?.() || {};

        return {
            ...parentAttributes,
            class: {
                default: null,
                parseHTML: element => element.getAttribute("class"),
                renderHTML: attributes => {
                    if (!attributes.class) return {};
                    return {
                        class: attributes.class,
                    };
                },
            },
            // Suporte explícito para id (o TipTap converte automaticamente para data-id no HTML)
            id: {
                default: null,
                parseHTML: element => element.getAttribute("data-id"),
                renderHTML: attributes => {
                    if (!attributes.id) return {};
                    return {
                        "data-id": attributes.id,
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

    // Remove o renderHTML customizado para usar o padrão da extensão pai
    // renderHTML({ HTMLAttributes }) {
    //     return [
    //         "table",
    //         mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { border: 1 }),
    //         0,
    //     ];
    // },

    addNodeView() {
        return ({ node }) => {
            const wrapper = document.createElement("div");
            const table = document.createElement("table");

            // Aplica TODOS os atributos do nó
            Object.entries(node.attrs).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    if (key === "class") {
                        // Aplica class tanto no wrapper quanto na table
                        wrapper.className = value;
                        table.className = value;
                    } else if (key === "id") {
                        // Converte id para data-id no HTML
                        table.setAttribute("data-id", value);
                    } else {
                        table.setAttribute(key, value);
                    }
                }
            });

            // Adiciona border se não estiver presente
            if (!table.hasAttribute("border")) {
                table.setAttribute("border", "1");
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
                contentDOM: table,
            };
        };
    },
});

export default TablePlus;
