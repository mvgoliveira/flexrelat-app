import { ScrollArea } from "@/components/ui/scrollArea";
import TextEditor from "@/components/ui/textEditor";
import { ReactElement, useState } from "react";

import { DocumentToolbar } from "../documentToolbar";
import { DocumentHeader, DocumentRoot, Root } from "./styles";

export const DocumentContent = (): ReactElement => {
    const [zoom, setScale] = useState<number>(1);
    const [pageWidth, setPageWidth] = useState<number>(794);
    const [pageHeight, setPageHeight] = useState<number>(1123);

    return (
        <Root>
            <DocumentHeader>
                <DocumentToolbar />
            </DocumentHeader>

            <ScrollArea>
                <DocumentRoot className="DocumentRoot">
                    <TextEditor pageWidth={pageWidth} pageHeight={pageHeight} zoom={zoom} />
                </DocumentRoot>
            </ScrollArea>
        </Root>
    );
};
