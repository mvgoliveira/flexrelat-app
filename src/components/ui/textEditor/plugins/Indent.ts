import { Command, Extension } from "@tiptap/core";
import { Node } from "prosemirror-model";
import { TextSelection, AllSelection, Transaction } from "prosemirror-state";

type IndentOptions = {
    types: string[];
    indentLevels: number[];
    defaultIndentLevel: number;
};

declare module "@tiptap/core" {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Commands {
        indent: {
            /**
             * Set the indent attribute
             */
            indent: () => Command;
            /**
             * Unset the indent attribute
             */
            outdent: () => Command;
        };
    }
}

export function clamp(val: number, min: number, max: number): number {
    if (val < min) {
        return min;
    }
    if (val > max) {
        return max;
    }
    return val;
}

export enum IndentProps {
    min = 0,
    max = 210,

    more = 30,
    less = -30,
}

export function isBulletListNode(node: Node): boolean {
    return node.type.name === "bullet_list";
}

export function isOrderedListNode(node: Node): boolean {
    return node.type.name === "order_list";
}

export function isTodoListNode(node: Node): boolean {
    return node.type.name === "todo_list";
}

export function isListNode(node: Node): boolean {
    return isBulletListNode(node) || isOrderedListNode(node) || isTodoListNode(node);
}

function setNodeIndentMarkup(tr: Transaction, pos: number, delta: number): Transaction {
    if (!tr.doc) return tr;

    const node = tr.doc.nodeAt(pos);
    if (!node) return tr;

    const minIndent = IndentProps.min;
    const maxIndent = IndentProps.max;

    const indent = clamp((node.attrs.indent || 0) + delta, minIndent, maxIndent);

    if (indent === node.attrs.indent) return tr;

    const nodeAttrs = {
        ...node.attrs,
        indent,
    };

    return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
}

function updateIndentLevel(tr: Transaction, delta: number): Transaction {
    const { doc, selection } = tr;

    if (!doc || !selection) return tr;

    if (!(selection instanceof TextSelection || selection instanceof AllSelection)) {
        return tr;
    }

    const { from, to } = selection;

    doc.nodesBetween(from, to, (node, pos) => {
        const nodeType = node.type;

        if (nodeType.name === "paragraph" || nodeType.name === "heading") {
            tr = setNodeIndentMarkup(tr, pos, delta);
            return false;
        }

        return true;
    });

    return tr;
}

export const Indent = Extension.create<IndentOptions>({
    name: "indent",

    defaultOptions: {
        types: ["heading", "paragraph"],
        indentLevels: [0, 30, 60, 90, 120, 150, 180, 210],
        defaultIndentLevel: 0,
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    indent: {
                        default: this.options.defaultIndentLevel,
                        renderHTML: attributes => ({
                            style: `margin-left: ${Number(attributes.indent)}px!important;`,
                        }),
                        parseHTML: element =>
                            parseInt(element.style.marginLeft) || this.options.defaultIndentLevel,
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            indent:
                () =>
                ({ tr, state, dispatch }) => {
                    const { selection } = state;
                    tr = tr.setSelection(selection);
                    tr = updateIndentLevel(tr, IndentProps.more);

                    if (tr.docChanged) {
                        if (dispatch) {
                            dispatch(tr);
                        }
                        return true;
                    }

                    return false;
                },
            outdent:
                () =>
                ({ tr, state, dispatch }) => {
                    const { selection } = state;
                    tr = tr.setSelection(selection);
                    tr = updateIndentLevel(tr, IndentProps.less);

                    if (tr.docChanged) {
                        if (dispatch) {
                            dispatch(tr);
                        }
                        return true;
                    }

                    return false;
                },
        };
    },

    addKeyboardShortcuts() {
        return {
            Tab: () => {
                const { state, view } = this.editor;
                const { selection } = state;
                const node = view.state.doc.nodeAt(selection.$from.before(1));

                if (
                    selection.empty &&
                    selection.$from.parentOffset === 0 &&
                    (node?.type.name == "paragraph" || node?.type.name == "heading")
                ) {
                    this.editor.commands.indent();
                    return true;
                }
                return false;
            },
            "Shift-Tab": () => {
                const { state } = this.editor;
                const { selection } = state;
                // Only outdent if selection is empty and at the start of a word
                if (selection.empty && selection.$from.parentOffset === 0) {
                    this.editor.commands.outdent();
                    return true;
                }
                return false;
            },
        };
    },
});
