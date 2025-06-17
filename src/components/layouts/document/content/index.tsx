import TextEditor from "@/components/ui/textEditor";
import { ReactElement } from "react";

import { DocumentContainer, Root } from "./styles";

export const DocumentContent = (): ReactElement => {
    return (
        <Root>
            <DocumentContainer>
                <TextEditor />
            </DocumentContainer>
        </Root>
    );
};
