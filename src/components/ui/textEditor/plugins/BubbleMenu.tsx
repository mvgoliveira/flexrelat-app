import { useFloating, autoUpdate, offset, flip } from "@floating-ui/react-dom";
import { Editor, isNodeSelection, posToDOMRect } from "@tiptap/core";
import { DOMSerializer } from "@tiptap/pm/model";
import { NodeSelection, Plugin, PluginKey, Selection, TextSelection } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { getMarkRange } from "@tiptap/react";
import { motion } from "motion/react";
import {
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    useLayoutEffect,
    useState,
} from "react";

import { SelectedContent } from "../components/TextBubbleMenu";

type Props = {
    editor: Editor;
    open?: boolean;
    children: ReactNode;
    selectedContents: SelectedContent[];
    onChangeSelectedContent: (content: SelectedContent[]) => void;
    enableMultiSelection?: boolean;
    prevSelection: Selection[];
    onChangePrevSelection: Dispatch<SetStateAction<Selection[]>>;
};

export const ControlledBubbleMenu = ({
    editor,
    open = true,
    children,
    onChangeSelectedContent,
    enableMultiSelection = true,
    selectedContents,
    prevSelection,
    onChangePrevSelection,
}: Props): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);

    const { view } = editor;

    const {
        x,
        y,
        strategy: position,
        refs,
    } = useFloating({
        strategy: "absolute",
        transform: false,
        whileElementsMounted: autoUpdate,
        placement: "top-end",
        middleware: [
            offset({ mainAxis: 10, alignmentAxis: -6 }),
            flip({
                padding: 8,
                boundary: editor.options.element,
                fallbackPlacements: ["top-end"],
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
                    const node = editor.view.nodeDOM(from) as HTMLElement;

                    if (node) {
                        return node.getBoundingClientRect();
                    }
                }

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
                const rect = posToDOMRect(editor.view, from, to);
                return new DOMRect(rect.x, rect.y - 5, rect.width, rect.height);
            },
        });
    }, [selectedContents, view, refs, editor.view]);

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
                onChangePrevSelection([]);
                return;
            }
            const sel = NodeSelection.create(view.state.doc, before);
            if (!sel) return;

            if (sel.content().content.size > 2) {
                if (e.button !== 0 || !e.metaKey) {
                    onChangePrevSelection([]);
                    setIsOpen(false);
                    return;
                }

                if (enableMultiSelection && (e.shiftKey || prevSelection.length === 0)) {
                    const exists = prevSelection.some(s => s.from === sel.from && s.to === sel.to);
                    onChangePrevSelection(prev =>
                        exists
                            ? prev.filter(s => !(s.from === sel.from && s.to === sel.to))
                            : [...prev, sel]
                    );
                } else {
                    onChangePrevSelection([sel]);
                }

                const alreadySelected = prevSelection.some(
                    s => s.from === sel.from && s.to === sel.to
                );

                if (alreadySelected) {
                    onChangePrevSelection(prev =>
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
                onChangePrevSelection([]);
            }
        };

        view.dom.addEventListener("click", handler);
        return () => view.dom.removeEventListener("click", handler);
    }, [editor.state.selection]);

    useLayoutEffect(() => {
        const key = new PluginKey("multi-selection");

        const plugin = new Plugin({
            key,
            props: {
                decorations(state) {
                    if (prevSelection.length === 0) return null;

                    const docSize = view.state.doc.content.size;

                    const decorations = prevSelection
                        .filter(sel => sel.from <= docSize && sel.to <= docSize)
                        .map(sel => {
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

        onChangeSelectedContent(content);

        return () => {
            editor.unregisterPlugin(key);
        };
    }, [prevSelection]);

    if (!selectedContents || selectedContents.length === 0 || !isOpen || !open) return <></>;

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
