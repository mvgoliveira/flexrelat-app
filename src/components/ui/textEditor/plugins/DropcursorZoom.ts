import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

export interface IDropcursorZoomOptions {
    color: string;
    height: number;
    zoom: number;
    zoomRef?: { current: number };
    marginLeft?: number;
    marginRight?: number;
}

export const DropcursorZoom = Extension.create<IDropcursorZoomOptions>({
    name: "dropcursorZoom",

    addOptions() {
        return {
            color: "currentColor",
            height: 2,
            zoom: 100,
            zoomRef: undefined,
            marginLeft: 0,
            marginRight: 0,
        };
    },

    addProseMirrorPlugins() {
        const pluginKey = new PluginKey("dropcursorZoom");
        const { color, height, marginLeft = 0, marginRight = 0 } = this.options;

        return [
            new Plugin({
                key: pluginKey,
                state: {
                    init() {
                        return DecorationSet.empty;
                    },
                    apply(tr, set, _oldState, newState) {
                        const dropPos = tr.getMeta(pluginKey);
                        if (dropPos !== undefined) {
                            if (dropPos === null) {
                                return DecorationSet.empty;
                            }

                            const line = document.createElement("div");
                            line.className = "ProseMirror-dropcursor-line";
                            line.style.cssText = `
                                position: absolute;
                                left: ${marginLeft}px;
                                right: ${marginRight}px;
                                height: ${height}px;
                                background-color: ${color};
                                pointer-events: none;
                                margin-top: -${height / 2}px;
                            `;

                            const $pos = newState.doc.resolve(dropPos);
                            return DecorationSet.create(newState.doc, [
                                Decoration.widget($pos.pos, line, { side: -1 }),
                            ]);
                        }
                        return set.map(tr.mapping, tr.doc);
                    },
                },
                props: {
                    decorations(state) {
                        return pluginKey.getState(state);
                    },
                    handleDOMEvents: {
                        dragover: (view, event) => {
                            const coords = view.posAtCoords({
                                left: event.clientX,
                                top: event.clientY,
                            });

                            if (!coords) {
                                const tr = view.state.tr;
                                tr.setMeta(pluginKey, null);
                                view.dispatch(tr);
                                return false;
                            }

                            const $pos = view.state.doc.resolve(coords.pos);
                            let targetPos = coords.pos;

                            for (let d = $pos.depth; d > 0; d--) {
                                const node = $pos.node(d);
                                if (node.isBlock) {
                                    const nodeStart = $pos.start(d);
                                    const nodeMid = nodeStart + Math.floor(node.nodeSize / 2);

                                    if (coords.pos < nodeMid) {
                                        targetPos = $pos.before(d);
                                    } else {
                                        targetPos = $pos.after(d);
                                    }
                                    break;
                                }
                            }

                            const tr = view.state.tr;
                            tr.setMeta(pluginKey, targetPos);
                            view.dispatch(tr);

                            return false;
                        },
                        dragleave: view => {
                            const tr = view.state.tr;
                            tr.setMeta(pluginKey, null);
                            view.dispatch(tr);
                            return false;
                        },
                        drop: view => {
                            const tr = view.state.tr;
                            tr.setMeta(pluginKey, null);
                            view.dispatch(tr);
                            return false;
                        },
                    },
                },
            }),
        ];
    },
});
