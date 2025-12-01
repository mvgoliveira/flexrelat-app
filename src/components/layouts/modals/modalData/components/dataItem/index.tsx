import { Typography } from "@/components/features/typography";
import { Theme } from "@/themes";
import { ReactNode } from "react";
import { GrDocumentPdf } from "react-icons/gr";

import { Container } from "./styles";

interface IDataItemProps extends React.HTMLAttributes<HTMLDivElement> {
    type: "txt" | "pdf" | "docx" | "csv" | "xlsx";
    name: string;
    id: string;
    activeId: string;
    onClick?: () => void;
}

export const DataItem = ({ type, name, activeId, id, ...props }: IDataItemProps): ReactNode => {
    return (
        <Container active={activeId === id} {...props}>
            {type === "pdf" && <GrDocumentPdf size={12} color={Theme.colors.black} />}

            <Typography tag="h1" fontSize={{ xs: "fs75" }} color="black" fontWeight="regular">
                {name}
            </Typography>
        </Container>
    );
};
