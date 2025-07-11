import { useFloating, autoUpdate, offset, flip } from "@floating-ui/react-dom";
import { Editor, posToDOMRect } from "@tiptap/core";
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
    selectedContent: SelectedContent | null;
    onChangeSelectedContent: (content: SelectedContent | null) => void;
    prevSelection: Selection | null;
    onChangePrevSelection: Dispatch<SetStateAction<Selection | null>>;
};

export const ControlledBubbleMenu = ({
    editor,
    open = true,
    children,
    onChangeSelectedContent,
    selectedContent,
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
        if (!open) return;

        refs.setReference({
            getBoundingClientRect() {
                if (!selectedContent) {
                    return new DOMRect(0, 0, 0, 0);
                }

                const { from, to } = selectedContent;

                const dom = editor.view.nodeDOM(from);

                if (dom instanceof HTMLElement) {
                    return dom.getBoundingClientRect();
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
    }, [selectedContent, view, refs, editor.view]);

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
                onChangePrevSelection(null);
                return;
            }

            const sel = NodeSelection.create(view.state.doc, before);
            if (!sel) return;

            if (sel.content().content.size > 2) {
                if (e.button !== 0 || !e.metaKey) {
                    onChangePrevSelection(null);
                    setIsOpen(false);
                    return;
                }

                onChangePrevSelection(sel);

                if (
                    prevSelection &&
                    prevSelection.from === sel.from &&
                    prevSelection.to === sel.to
                ) {
                    onChangePrevSelection(null);

                    if (prevSelection) {
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
                onChangePrevSelection(null);
            }
        };

        view.dom.addEventListener("click", handler);
        return () => view.dom.removeEventListener("click", handler);
    }, [editor.state.selection]);

    useLayoutEffect(() => {
        if (!prevSelection) return;

        const key = new PluginKey("multi-selection");

        const plugin = new Plugin({
            key,
            props: {
                decorations(state) {
                    const docSize = view.state.doc.content.size;

                    if (prevSelection.from <= docSize && prevSelection.to <= docSize) {
                        const $posFrom = view.state.doc.resolve(prevSelection.from);
                        const $posTo = view.state.doc.resolve(prevSelection.to);

                        const decoration = Decoration.node($posFrom.before(1), $posTo.before(1), {
                            class: "multi-selected",
                        });

                        return DecorationSet.create(state.doc, [decoration]);
                    }
                },
            },
        });

        editor.registerPlugin(plugin);

        const slice = editor.state.doc.slice(prevSelection.from, prevSelection.to);
        const node = editor.state.doc.nodeAt(prevSelection.from);
        if (!node) return;
        const fragment = slice.content;

        const serializer = DOMSerializer.fromSchema(editor.schema);
        const frag = serializer.serializeFragment(slice.content);
        const div = document.createElement("div");
        div.appendChild(frag);

        fragment.forEach(nodeFrag => div.appendChild(serializer.serializeNode(nodeFrag)));

        const content = {
            id: node.attrs.id || node.attrs["data-id"],
            html: div.innerHTML,
            json: fragment.toJSON(),
            from: prevSelection.from,
            to: prevSelection.to,
        };

        onChangeSelectedContent(content);

        return () => {
            editor.unregisterPlugin(key);
        };
    }, [prevSelection]);

    if (!isOpen || !open) return <></>;

    const style = {
        position,
        top: y ?? 0,
        left: x ?? 0,
        zIndex: 26,
    };

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
