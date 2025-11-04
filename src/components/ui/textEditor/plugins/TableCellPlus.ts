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
        };
    },

    addNodeView() {
        return ({ node }) => {
            const dom = document.createElement("td");
            let colspan = node.attrs.colspan;
            const rowspan = node.attrs.rowspan;
            const backgroundColor = node.attrs.backgroundColor;

            const updateGrid = (updatedColspan: number, updatedRowspan: number) => {
                dom.style.gridColumn = `auto / span ${updatedColspan || 1}`;
                dom.rowSpan = updatedRowspan || 1;
                dom.setAttribute("colspan", `${updatedColspan || 1}`);
            };

            const updateBackgroundColor = (color: string | null) => {
                if (color) {
                    dom.style.backgroundColor = color;
                } else {
                    dom.style.backgroundColor = "";
                }
            };

            updateGrid(colspan, rowspan);
            updateBackgroundColor(backgroundColor);

            return {
                dom,
                contentDOM: dom,

                update(updatedNode) {
                    if (updatedNode.type.name !== "tableCell") {
                        return false;
                    }
                    const updatedColspan = updatedNode.attrs.colspan;
                    const updatedBackgroundColor = updatedNode.attrs.backgroundColor;

                    if (updatedColspan !== colspan) {
                        colspan = updatedColspan;
                        updateGrid(updatedColspan, rowspan);
                    }

                    if (updatedBackgroundColor !== backgroundColor) {
                        updateBackgroundColor(updatedBackgroundColor);
                    }

                    return true;
                },
            };
        };
    },
});

export default TableCellPlus;
