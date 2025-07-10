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

                view: editorView => {
                    const { classes } = this.options;

                    const updateContentEditable = () => {
                        const dom = editorView.dom;

                        // Remove contentEditable de todos os elementos primeiro
                        // eslint-disable-next-line quotes
                        const allElements = dom.querySelectorAll('[contenteditable="false"]');
                        allElements.forEach(element => {
                            if (element !== dom) {
                                // Não remove do container principal
                                element.removeAttribute("contenteditable");
                            }
                        });

                        // Aplica contentEditable="false" apenas nos elementos com classes especificadas
                        classes.forEach(className => {
                            const elements = dom.querySelectorAll(`.${className}`);
                            elements.forEach(element => {
                                (element as HTMLElement).contentEditable = "false";
                            });
                        });
                    };

                    // Aplica inicialmente
                    updateContentEditable();

                    // Observa mudanças no DOM para aplicar contentEditable nos novos elementos
                    const observer = new MutationObserver(mutations => {
                        let shouldUpdate = false;

                        mutations.forEach(mutation => {
                            if (
                                mutation.type === "childList" ||
                                (mutation.type === "attributes" &&
                                    mutation.attributeName === "class")
                            ) {
                                shouldUpdate = true;
                            }
                        });

                        if (shouldUpdate) {
                            updateContentEditable();
                        }
                    });

                    observer.observe(editorView.dom, {
                        childList: true,
                        subtree: true,
                        attributes: true,
                        attributeFilter: ["class"],
                    });

                    // Também escuta updates do editor
                    const handleUpdate = () => {
                        updateContentEditable();
                    };

                    editorView.dom.addEventListener("DOMNodeInserted", handleUpdate);

                    return {
                        destroy: () => {
                            observer.disconnect();
                            editorView.dom.removeEventListener("DOMNodeInserted", handleUpdate);
                        },
                    };
                },
            }),
        ];
    },
});
