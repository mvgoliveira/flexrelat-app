import { TableCell } from "@tiptap/extension-table";

export const TableCellPlus = TableCell.extend({
    addNodeView() {
        return ({ node }) => {
            const dom = document.createElement("td");
            let colspan = node.attrs.colspan;
            const rowspan = node.attrs.rowspan;
            const updateGrid = (updatedColspan: number, updatedRowspan: number) => {
                dom.style.gridColumn = `auto / span ${updatedColspan || 1}`;
                dom.rowSpan = updatedRowspan || 1;
                dom.setAttribute("colspan", `${updatedColspan || 1}`);
            };

            updateGrid(colspan, rowspan);

            return {
                dom,
                contentDOM: dom,

                update(updatedNode) {
                    if (updatedNode.type.name !== "tableCell") {
                        return false;
                    }
                    const updatedColspan = updatedNode.attrs.colspan;
                    if (updatedColspan !== colspan) {
                        colspan = updatedColspan;
                        updateGrid(updatedColspan, rowspan);
                    }
                    return true;
                },
            };
        };
    },
});

export default TableCellPlus;
