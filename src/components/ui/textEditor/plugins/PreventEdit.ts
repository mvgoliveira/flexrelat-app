import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

interface IPreventEditOptions {
    classes: string[];
}

export const PreventEditExtension = Extension.create<IPreventEditOptions>({
    name: "preventEditOnCertainNodes",

    addOptions() {
        return {
            classes: [],
        };
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey("preventEditOnCertainNodes"),

                filterTransaction: (tr, state) => {
                    const { classes } = this.options;

                    let blocked = false;

                    const { from, to } = tr.selection;

                    let limitedTo = to;

                    const maxPos = state.doc.content.size;
                    if (to > maxPos) limitedTo = maxPos;

                    state.doc.nodesBetween(from, limitedTo, node => {
                        if (!node) return false;

                        const nodeClass = node.attrs?.class;

                        if (classes.includes(nodeClass)) {
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
