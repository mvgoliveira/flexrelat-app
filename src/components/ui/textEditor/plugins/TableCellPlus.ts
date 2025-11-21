import { mergeAttributes } from "@tiptap/core";
import { TableCell } from "@tiptap/extension-table";

export const TableCellPlus = TableCell.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            backgroundColor: {
                default: null,
                parseHTML: element => element.style.backgroundColor || null,
                renderHTML: attributes => {
                    if (!attributes.backgroundColor) {
                        return {};
                    }
                    return {
                        style: `background-color: ${attributes.backgroundColor}`,
                    };
                },
            },
            borderColor: {
                default: null,
                parseHTML: element => element.style.borderColor || null,
                renderHTML: attributes => {
                    if (!attributes.borderColor) {
                        return {};
                    }
                    return {
                        style: `border-color: ${attributes.borderColor}`,
                    };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: "td",
                getAttrs: dom => {
                    const element = dom as HTMLElement;
                    return {
                        colspan: element.getAttribute("colspan") || 1,
                        rowspan: element.getAttribute("rowspan") || 1,
                        colwidth: element.getAttribute("colwidth") || null,
                        backgroundColor: element.style.backgroundColor || null,
                        borderColor: element.style.borderColor || null,
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const attrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes);

        // Aplica os estilos customizados
        const styles: string[] = [];

        // Adiciona grid-column para colspan
        const colspan = attrs.colspan || 1;
        if (colspan > 1) {
            styles.push(`grid-column: auto / span ${colspan}`);
        }

        if (attrs.backgroundColor) {
            styles.push(`background-color: ${attrs.backgroundColor}`);
        }
        if (attrs.borderColor) {
            styles.push(`border-color: ${attrs.borderColor}`);
        }

        if (styles.length > 0) {
            attrs.style = styles.join("; ");
        }

        // Remove atributos que já foram processados
        delete attrs.backgroundColor;
        delete attrs.borderColor;

        return ["td", attrs, 0];
    },
});

export default TableCellPlus;
