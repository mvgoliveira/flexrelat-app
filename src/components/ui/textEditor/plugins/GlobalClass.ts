import { Extension } from "@tiptap/core";

export const GlobalClass = Extension.create({
    name: "globalClass",
    addOptions() {
        return {
            types: [
                "paragraph",
                "heading",
                "codeBlock",
                "blockquote",
                "listItem",
                "table",
                "tableRow",
                "tableCell",
                "tableHeader",
                "bulletList",
                "orderedList",
                "image",
            ],
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    class: {
                        default: null,
                        renderHTML: attrs => (attrs.class ? { class: attrs.class } : {}),
                    },
                },
            },
        ];
    },
});
