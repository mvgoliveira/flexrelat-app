import { Theme } from "@/themes";
import { Editor } from "@tiptap/core";
import { Selection } from "@tiptap/pm/state";
import { motion } from "motion/react";
import { ReactElement, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

import { ControlledBubbleMenu } from "../../plugins/BubbleMenu";
import { RemovedButton } from "./styles";

export type SelectedContent = {
    html: string;
    json: any;
    from: number;
    to: number;
};

interface IChangesBubbleMenuProps {
    editor: Editor;
    enableMultiSelection?: boolean;
}

export const ChangesBubbleMenu = ({
    editor,
    enableMultiSelection = false,
}: IChangesBubbleMenuProps): ReactElement => {
    const [selectedContents, setSelectedContent] = useState<SelectedContent[]>([]);
    const [prevSelection, setPrevSelection] = useState<Selection[]>([]);

    return (
        <ControlledBubbleMenu
            editor={editor}
            onChangeContent={setSelectedContent}
            selectedContents={selectedContents}
            enableMultiSelection={enableMultiSelection}
            prevSelection={prevSelection}
            setPrevSelection={setPrevSelection}
        >
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, delay: 0.2 }}
            >
                <RemovedButton onClick={() => {}}>
                    <RiDeleteBin6Line size={14} color={Theme.colors.purple50} />
                </RemovedButton>
            </motion.div>
        </ControlledBubbleMenu>
    );
};
