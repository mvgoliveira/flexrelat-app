import { useFloating, autoUpdate, offset, flip } from "@floating-ui/react-dom";
import { Editor, posToDOMRect } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";
import { getMarkRange } from "@tiptap/react";
import { motion } from "motion/react";
import { ReactElement, ReactNode, useEffect } from "react";

export type SelectedChange = {
    from: number;
    to: number;
    type: "add" | "remove";
};

type Props = {
    editor: Editor;
    open?: boolean;
    children: ReactNode;
    selectedContent: SelectedChange | null;
};

export const AiChangesControlledBubbleMenu = ({
    editor,
    open = true,
    children,
    selectedContent,
}: Props): ReactElement => {
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
        placement: "top-start",
        middleware: [
            offset({ mainAxis: -41, alignmentAxis: -30 }),
            flip({
                padding: 8,
                boundary: editor.options.element || undefined,
                fallbackPlacements: ["top-end"],
            }),
        ],
        open,
    });

    useEffect(() => {
        if (!open) return;

        requestAnimationFrame(() => {
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
                        const transaction = view.state.tr.setSelection(
                            new TextSelection($start, $end)
                        );
                        view.dispatch(transaction);
                        return posToDOMRect(editor.view, range.from, range.to);
                    }

                    // Otherwise,
                    const rect = posToDOMRect(editor.view, from, to);
                    return new DOMRect(rect.x, rect.y - 5, rect.width, rect.height);
                },
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedContent, view, refs, editor.view]);

    if (!open) return <></>;

    const style = {
        position,
        top: y,
        left: x,
        zIndex: 25,
    };

    return (
        <motion.div
            ref={refs.setFloating}
            style={style}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay: 0.2 }}
        >
            {children}
        </motion.div>
    );
};
