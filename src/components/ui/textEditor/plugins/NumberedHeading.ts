import { mergeAttributes } from "@tiptap/core";
import Heading from "@tiptap/extension-heading";

function getHeadingNumber(doc: any, pos: number, level: number, className: string): string {
    const counters: number[] = new Array(6).fill(0); // Para níveis H1-H6
    let lastNumber: string = "";

    doc.descendants((node: any, offset: number) => {
        if (offset >= pos) return false;

        // Ignora nodes com className "change-add" na contagem, mas ainda atualiza lastNumber
        if (node.type.name === "heading" || node.type.name === "numberedHeading") {
            const nodeLevel = node.attrs.level;
            const nodeClass = node.attrs.class;

            // Só conta se não for "change-add"
            if (nodeClass !== "change-add") {
                counters[nodeLevel - 1]++;
                for (let i = nodeLevel; i < 6; i++) {
                    counters[i] = 0;
                }
            }

            // Salva o número anterior se for do mesmo nível
            if (nodeLevel === level) {
                const activeLevels = [];
                for (let i = 0; i < level; i++) {
                    if (counters[i] > 0) {
                        activeLevels.push(counters[i]);
                    }
                }
                lastNumber = activeLevels.join(".");
            }
        }
    });

    // Se for "change-add", retorna o número anterior
    if (className === "change-add") {
        return lastNumber || "1";
    }

    counters[level - 1]++;

    for (let i = level; i < 6; i++) {
        counters[i] = 0;
    }

    const activeLevels = [];
    for (let i = 0; i < level; i++) {
        if (counters[i] > 0) {
            activeLevels.push(counters[i]);
        }
    }

    return activeLevels.join(".");
}

export const NumberedHeading = Heading.extend({
    name: "numberedHeading",

    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: null,
                parseHTML: element => element.getAttribute("class"),
                renderHTML: attributes => {
                    return {
                        class: attributes.class,
                    };
                },
            },
            id: {
                default: null,
                parseHTML: element => element.getAttribute("id"),
                renderHTML: attributes => {
                    if (!attributes.id) {
                        return {};
                    }
                    return { id: attributes.id };
                },
            },
        };
    },

    addNodeView() {
        return ({ node, getPos, editor }) => {
            const level = node.attrs.level;

            const dom = document.createElement(`h${level}`);
            dom.setAttribute("data-level", level.toString());

            if (node.attrs.class) {
                dom.className = node.attrs.class;
            }

            if (node.attrs.id) {
                dom.id = node.attrs.id;
            }

            const numberSpan = document.createElement("span");
            numberSpan.contentEditable = "false";
            numberSpan.className = "heading-number";
            numberSpan.style.marginRight = "8px";

            const contentDOM = document.createElement("span");

            // Função para atualizar o número
            const updateNumber = () => {
                const pos = getPos();
                if (pos !== undefined) {
                    const number = getHeadingNumber(editor.state.doc, pos, level, node.attrs.class);

                    numberSpan.textContent = `${number}. `;
                }
            };

            // Atualiza o número inicialmente
            updateNumber();

            // Atualiza quando o documento muda
            const handleUpdate = () => {
                requestAnimationFrame(() => {
                    updateNumber();
                });
            };

            // Escuta mudanças no editor
            editor.on("update", handleUpdate);
            editor.on("selectionUpdate", handleUpdate);

            dom.appendChild(numberSpan);
            dom.appendChild(contentDOM);

            return {
                dom,
                contentDOM,
                destroy: () => {
                    editor.off("update", handleUpdate);
                    editor.off("selectionUpdate", handleUpdate);
                },
            };
        };
    },

    renderHTML({ node, HTMLAttributes }) {
        return [`h${node.attrs.level}`, mergeAttributes(HTMLAttributes), 0];
    },

    // Adiciona comando para atualizar numeração
    addCommands() {
        return {
            ...this.parent?.(),
            updateHeadingNumbers:
                () =>
                (editor: import("@tiptap/core").Editor): boolean => {
                    // Força uma atualização da view
                    editor.view.updateState(editor.state);
                    return true;
                },
        };
    },
});
