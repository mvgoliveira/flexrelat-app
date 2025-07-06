import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";

export const PreventEditExtension = Extension.create({
    name: "preventEditOnCertainNodes",

    addProseMirrorPlugins() {
        return [
            new Plugin({
                filterTransaction: (tr, state) => {
                    let blocked = false;

                    const { from, to } = tr.selection;

                    state.doc.nodesBetween(from, to, node => {
                        const cls = node.attrs?.class;
                        if (cls === "change-add" || cls === "change-remove") {
                            blocked = true;
                            return false;
                        }
                    });

                    return !blocked;
                },
            }),
        ];
    },
});
