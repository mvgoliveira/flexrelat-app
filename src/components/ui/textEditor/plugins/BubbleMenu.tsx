import { useFloating, autoUpdate, offset, flip } from "@floating-ui/react-dom";
import { Editor, isNodeSelection, posToDOMRect } from "@tiptap/core";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import { getMarkRange } from "@tiptap/react";
import { motion } from "motion/react";
import { ReactNode, useLayoutEffect, useState } from "react";

type Props = {
    editor: Editor;
    open: boolean;
    children: ReactNode;
};

export const ControlledBubbleMenu = ({ editor, open, children }: Props) => {
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
                const from = Math.min(...ranges.map(range => range.$from.pos));
                const to = Math.max(...ranges.map(range => range.$to.pos));

                // If the selection is a node selection, return the node's bounding rect
                if (isNodeSelection(editor.state.selection)) {
                    const domInfo = editor.view.domAtPos(from + 1);
                    const tableEl = (domInfo.node as HTMLElement).closest("table");
                    if (tableEl) {
                        const cells = Array.from(
                            tableEl.querySelectorAll("th, td")
                        ) as HTMLElement[];
                        const rects = cells.map(c => c.getBoundingClientRect());
                        const top = Math.min(...rects.map(r => r.top));
                        const left = Math.min(...rects.map(r => r.left));
                        const bottom = Math.max(...rects.map(r => r.bottom));
                        const right = Math.max(...rects.map(r => r.right));
                        console.log({
                            top,
                            left,
                            bottom,
                            right,
                            width: right - left,
                            height: bottom - top,
                            x: left,
                            y: top,
                        });

                        return {
                            top,
                            left,
                            bottom,
                            right,
                            width: right - left,
                            height: bottom - top,
                            x: left,
                            y: top,
                        };
                    }

                    const node = editor.view.nodeDOM(from) as HTMLElement;

                    if (node) {
                        return node.getBoundingClientRect();
                    }
                }

                // If the clicked position a mark, create a selection from the mark range
                // When the selection is not empy, the bubble menu will be shown
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
        setIsOpen(false);

        if (!open) return;
        const handler = (e: MouseEvent) => {
            if (!(e.metaKey && e.button === 0)) {
                setIsOpen(false);
                return;
            } // ⌘ + left click

            const posInfo = view.posAtCoords({ left: e.clientX, top: e.clientY });
            if (!posInfo) return;
            const { pos } = posInfo;
            const $pos = view.state.doc.resolve(pos);

            if ($pos.before) {
                const sel = NodeSelection.create(view.state.doc, $pos.before(1));
                view.dispatch(view.state.tr.setSelection(sel));
                setIsOpen(true);
                return;
            }
        };
        view.dom.addEventListener("click", handler);
        return () => view.dom.removeEventListener("click", handler);
    }, [view, open]);

    // useLayoutEffect(() => {
    //     const lastPos = { x: window.scrollX, y: window.scrollY };
    //     const handleScroll = () => {
    //         const newY = window.scrollY;
    //         if (newY !== lastPos.y) {
    //             const { $from } = editor.state.selection;
    //             const tr = editor.state.tr.setSelection(new TextSelection($from, $from));
    //             view.dispatch(tr);
    //         }
    //         lastPos.y = newY;
    //         lastPos.x = window.scrollX;
    //     };

    //     window.addEventListener("scroll", handleScroll, true);
    //     return () => window.removeEventListener("scroll", handleScroll, true);
    // }, [editor, view]);

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
