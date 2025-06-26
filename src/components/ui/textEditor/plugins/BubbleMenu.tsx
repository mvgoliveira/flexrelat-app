import { useFloating, autoUpdate, offset, flip } from "@floating-ui/react-dom";
import { Editor, isNodeSelection, posToDOMRect } from "@tiptap/core";
import { DOMSerializer } from "@tiptap/pm/model";
import { NodeSelection, Plugin, PluginKey, Selection, TextSelection } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { getMarkRange } from "@tiptap/react";
import { motion } from "motion/react";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";

import { SelectedContent } from "../components/TextBubbleMenu";

type Props = {
    editor: Editor;
    open: boolean;
    children: ReactNode;
    onChangeContent: (content: SelectedContent[]) => void;
};

export const ControlledBubbleMenu = ({ editor, open, children, onChangeContent }: Props) => {
    const [prevSelection, setPrevSelection] = useState<Selection[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const { view } = editor;
    const {
        x,
        y,
        strategy: position,
        refs,
    } = useFloating({
        strategy: "fixed",
        whileElementsMounted: autoUpdate,
        placement: "top-end",
        middleware: [
            offset({ mainAxis: 10, alignmentAxis: -6 }),
            flip({
                padding: 8,
                boundary: editor.options.element,
                fallbackPlacements: [
                    "bottom",
                    "top-start",
                    "bottom-start",
                    "top-end",
                    "bottom-end",
                ],
            }),
        ],
    });

    useLayoutEffect(() => {
        refs.setReference({
            getBoundingClientRect() {
                const { ranges } = editor.state.selection;

                const allSelectionsFrom = [
                    ...ranges.map(range => range.$from.pos),
                    ...prevSelection.flatMap(sel => sel.ranges.map(range => range.$from.pos)),
                ];

                const allSelectionsTo = [
                    ...ranges.map(range => range.$to.pos),
                    ...prevSelection.flatMap(sel => sel.ranges.map(range => range.$to.pos)),
                ];

                const from = Math.min(...allSelectionsFrom);
                const to = Math.max(...allSelectionsTo);

                if (isNodeSelection(editor.state.selection)) {
                    let rect: DOMRect | null = null;
                    for (let pos = from; pos <= to; ) {
                        const node = editor.view.nodeDOM(pos) as HTMLElement | null;
                        if (node && node.getBoundingClientRect) {
                            const nodeRect = node.getBoundingClientRect();
                            if (!rect) {
                                rect = nodeRect;
                            } else {
                                rect = new DOMRect(
                                    Math.min(rect.left, nodeRect.left),
                                    Math.min(rect.top, nodeRect.top),
                                    Math.max(rect.right, nodeRect.right) -
                                        Math.min(rect.left, nodeRect.left),
                                    Math.max(rect.bottom, nodeRect.bottom) -
                                        Math.min(rect.top, nodeRect.top)
                                );
                            }
                            const nodeSize = node.nodeType === 3 ? 1 : (node as any).nodeSize || 1;
                            pos += nodeSize;
                        } else {
                            pos++;
                        }
                    }
                    if (rect) {
                        return rect;
                    }
                }

                // If the clicked position a mark, create a selection from the mark range
                // When the selection is not empty, the bubble menu will be shown
                const range = getMarkRange(
                    view.state.doc.resolve(from),
                    view.state.schema.marks.link
                );

                if (range) {
                    const $start = view.state.doc.resolve(range.from);
                    const $end = view.state.doc.resolve(range.to);
                    const transaction = view.state.tr.setSelection(new TextSelection($start, $end));
                    view.dispatch(transaction);
                    return posToDOMRect(editor.view, range.from, range.to);
                }

                // Otherwise,
                return posToDOMRect(editor.view, from, to);
            },
        });
    }, [refs.reference, editor.state.selection, view, refs, editor.view]);

    useLayoutEffect(() => {
        const handler = (e: MouseEvent) => {
            const posInfo = view.posAtCoords({ left: e.clientX, top: e.clientY });
            if (!posInfo) return;
            const { pos } = posInfo;
            if (!pos) return;
            const $pos = view.state.doc.resolve(pos);
            if (!$pos) return;
            const before = $pos.before(1);
            const node = view.state.doc.nodeAt(before);
            if (!node) {
                setIsOpen(false);
                setPrevSelection([]);
                return;
            }
            const sel = NodeSelection.create(view.state.doc, before);
            if (!sel) return;

            if (sel.content().content.size > 2) {
                if (e.button !== 0 || !e.metaKey) {
                    setPrevSelection([]);
                    setIsOpen(false);
                    return;
                }

                if (e.shiftKey || prevSelection.length === 0) {
                    // setPrevSelection(prev => [...prev, sel]);

                    const exists = prevSelection.some(s => s.from === sel.from && s.to === sel.to);
                    setPrevSelection(prev =>
                        exists
                            ? prev.filter(s => !(s.from === sel.from && s.to === sel.to))
                            : [...prev, sel]
                    );
                } else {
                    setPrevSelection([sel]);
                }

                const alreadySelected = prevSelection.some(
                    s => s.from === sel.from && s.to === sel.to
                );

                if (alreadySelected) {
                    setPrevSelection(prev =>
                        prev.filter(s => !(s.from === sel.from && s.to === sel.to))
                    );

                    if (prevSelection.length === 1) {
                        setIsOpen(false);
                    }

                    view.dispatch(
                        view.state.tr.setSelection(TextSelection.create(view.state.doc, sel.from))
                    );
                    return;
                }

                view.dispatch(view.state.tr.setSelection(sel));
                setIsOpen(true);
            } else {
                view.dispatch(
                    view.state.tr.setSelection(TextSelection.create(view.state.doc, pos))
                );
                setIsOpen(false);
                setPrevSelection([]);
            }
        };

        view.dom.addEventListener("click", handler);
        return () => view.dom.removeEventListener("click", handler);
    }, [editor.state.selection]);

    useEffect(() => {
        const key = new PluginKey("multi-selection");

        const plugin = new Plugin({
            key,
            props: {
                decorations(state) {
                    if (prevSelection.length === 0) return null;

                    const decorations = prevSelection.map(sel => {
                        const $posFrom = view.state.doc.resolve(sel.from);
                        const $posTo = view.state.doc.resolve(sel.to);

                        return Decoration.node($posFrom.before(1), $posTo.before(1), {
                            class: "multi-selected",
                        });
                    });

                    return DecorationSet.create(state.doc, decorations);
                },
            },
        });

        editor.registerPlugin(plugin);

        const content = prevSelection.map(sel => {
            const slice = editor.state.doc.slice(sel.from, sel.to);
            const fragment = slice.content;

            const serializer = DOMSerializer.fromSchema(editor.schema);
            const frag = serializer.serializeFragment(slice.content);
            const div = document.createElement("div");
            div.appendChild(frag);

            fragment.forEach(node => div.appendChild(serializer.serializeNode(node)));

            return {
                html: div.innerHTML,
                json: fragment.toJSON(),
                from: sel.from,
                to: sel.to,
            };
        });

        onChangeContent(content);

        return () => {
            editor.unregisterPlugin(key);
        };
    }, [prevSelection]);

    if (!open) return null;
    if (!isOpen) return null;

    const style = { position, top: y ?? 0, left: x ?? 0, zIndex: 9999 };

    return (
        <motion.div
            ref={refs.setFloating}
            style={style}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
};
