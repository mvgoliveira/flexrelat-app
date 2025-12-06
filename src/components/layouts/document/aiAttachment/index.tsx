import { Typography } from "@/components/features/typography";
import { DocumentDataType } from "@/repositories/documentDataAPI";
import { Theme } from "@/themes";
import { ReactNode } from "react";
import { GrDocumentCsv, GrDocumentExcel, GrDocumentPdf, GrDocumentTxt } from "react-icons/gr";
import { LuFileJson2 } from "react-icons/lu";
import { MdClose } from "react-icons/md";

import { CloseButton, Root } from "./styles";

interface IAiChatAttachmentProps {
    type: DocumentDataType;
    name: string;
    active: boolean;
    onClick: () => void;
    onRemove: () => void;
}

export const AiChatAttachment = ({
    type,
    name,
    active = true,
    onClick,
    onRemove,
}: IAiChatAttachmentProps): ReactNode => {
    return (
        <Root onClick={onClick}>
            <div>
                {type === "pdf" && <GrDocumentPdf size={9} color={Theme.colors.blue60} />}
                {type === "text" && <GrDocumentTxt size={9} color={Theme.colors.blue60} />}
                {type === "csv" && <GrDocumentCsv size={9} color={Theme.colors.blue60} />}
                {type === "json" && <LuFileJson2 size={9} color={Theme.colors.blue60} />}
                {(type === "xls" || type === "xlsx") && (
                    <GrDocumentExcel size={9} color={Theme.colors.blue60} />
                )}
            </div>

            <Typography tag="p" fontSize={{ xs: "fs50" }} color="blue60" fontWeight="medium">
                {name}
            </Typography>

            <CloseButton
                active={!!active}
                onClick={e => {
                    e.stopPropagation();
                    onRemove();
                }}
            >
                <MdClose size={9} color={Theme.colors.gray90} />
            </CloseButton>
        </Root>
    );
};
