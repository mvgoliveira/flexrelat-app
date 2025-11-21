import { Table, createColGroup } from "@tiptap/extension-table";

export const TablePlus = Table.extend({
    content: "tableRow+",

    addAttributes() {
        // Pega TODOS os atributos da extensão pai
        const parentAttributes = this.options?.HTMLAttributes;

        return {
            ...parentAttributes,
            class: {
                default: null,
                parseHTML: (element: any) => element.getAttribute("class"),
                renderHTML: (attributes: any) => {
                    if (!attributes.class) return {};
                    return {
                        class: attributes.class,
                    };
                },
            },
            // Suporte explícito para id (o TipTap converte automaticamente para data-id no HTML)
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

    addOptions() {
        return {
            ...this.options?.HTMLAttributes,
            resizable: true,
        };
    },

    addNodeView() {
        return ({ node }: { node: any }) => {
            const wrapper = document.createElement("div");
            const table = document.createElement("table");

            // Aplica TODOS os atributos do nó
            Object.entries(node.attrs).forEach(([key, value]) => {
                wrapper.setAttribute("class", "table-wrapper");
                if (value !== null && value !== undefined) {
                    if (key === "class") {
                        // Aplica class tanto no wrapper quanto na table
                        wrapper.className = String(value);
                        table.className = String(value);
                    } else if (key === "id") {
                        // Converte id para data-id no HTML
                        table.setAttribute("data-id", String(value));
                    } else {
                        table.setAttribute(key, String(value));
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
            node.forEach((child: any) => {
                if (child.type.name === "tableRow" && child.childCount > maxCellCount) {
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
