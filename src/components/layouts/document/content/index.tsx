import { ScrollArea } from "@/components/ui/ScrollArea";
import TextEditor from "@/components/ui/textEditor";
import { ReactElement, useState } from "react";

import { DocumentRoot, Root } from "./styles";

export const DocumentContent = (): ReactElement => {
    const [zoom, setScale] = useState<number>(0.83);
    const [pageWidth, setPageWidth] = useState<number>(794);
    const [pageHeight, setPageHeight] = useState<number>(1123);

    return (
        <Root>
            <ScrollArea>
                <DocumentRoot className="DocumentRoot">
                    <TextEditor pageWidth={pageWidth} pageHeight={pageHeight} zoom={zoom} />
                </DocumentRoot>
            </ScrollArea>
        </Root>
    );
};
