import { Theme } from "@/themes";
import { Editor } from "@tiptap/core";
import { Selection } from "@tiptap/pm/state";
import { ReactElement, useState } from "react";
import { TbColumnInsertRight, TbRowInsertBottom } from "react-icons/tb";

import { BubbleMenu } from "../../plugins/BubbleMenu";
import { InsertButton, Root } from "./styles";

export type SelectedContent = {
    id: string;
    html: string;
    from: number;
    to: number;
};

interface ITableBubbleMenuProps {
    editor: Editor;
    blockClasses: string[];
    types: string[];
}

export const TableBubbleMenu = ({
    editor,
    blockClasses,
    types,
}: ITableBubbleMenuProps): ReactElement => {
    const [selectedContent, setSelectedContent] = useState<SelectedContent | null>(null);
    const [prevSelection, setPrevSelection] = useState<Selection | null>(null);

    const handleAddRowBottom = () => {
        editor.chain().focus().addRowAfter().run();
        editor.commands.createParagraphNear();
    };

    const handleAddColumnRight = () => {
        editor.chain().focus().addColumnAfter().run();
        editor.commands.createParagraphNear();
    };

    return (
        <BubbleMenu
            editor={editor}
            onChangeSelectedContent={setSelectedContent}
            selectedContent={selectedContent}
            prevSelection={prevSelection}
            onChangePrevSelection={setPrevSelection}
            blockClasses={blockClasses}
            types={types}
            placement="bottom-end"
        >
            <Root>
                <InsertButton onClick={handleAddRowBottom} top="0px" left="-25px">
                    <TbRowInsertBottom size={16} color={Theme.colors.purple50} />
                </InsertButton>

                <InsertButton onClick={handleAddColumnRight} bottom="5px" left="5px">
                    <TbColumnInsertRight size={16} color={Theme.colors.purple50} />
                </InsertButton>
            </Root>
        </BubbleMenu>
    );
};
