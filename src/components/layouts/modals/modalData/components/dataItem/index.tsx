import { Button } from "@/components/features/button";
import { Menu } from "@/components/features/menu";
import { Typography } from "@/components/features/typography";
import { Toast } from "@/components/ui/toast";
import { deleteDocumentData, DocumentDataType } from "@/repositories/documentDataAPI";
import { Theme } from "@/themes";
import { ReactNode, useRef, useState } from "react";
import { GrDocumentCsv, GrDocumentExcel, GrDocumentPdf, GrDocumentTxt } from "react-icons/gr";
import { LuFileJson2 } from "react-icons/lu";
import { MdDeleteOutline, MdMoreHoriz } from "react-icons/md";

import { ModalDeleteDocumentData } from "../../../modalDeleteDocumentData";
import { Container } from "./styles";

interface IDataItemProps extends React.HTMLAttributes<HTMLDivElement> {
    type: DocumentDataType;
    name: string;
    id: string;
    activeId: string;
    onClick: () => void;
    onDelete: () => void;
}

export const DataItem = ({
    type,
    name,
    activeId,
    id,
    onDelete,
    ...props
}: IDataItemProps): ReactNode => {
    const toastErrorRef = useRef<{ publish: () => void } | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleConfirmDelete = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await deleteDocumentData(id);
            onDelete();
        } catch (error) {
            toastErrorRef.current?.publish();
        }

        setIsLoading(false);
    };

    return (
        <div>
            <Toast>
                <Toast.Content ref={toastErrorRef} variant="error">
                    <Toast.Title>Erro na remoção do dado</Toast.Title>
                    <Toast.Description>
                        Não foi possível remover a fonte dado. Tente novamente mais tarde.
                    </Toast.Description>
                </Toast.Content>
            </Toast>

            <ModalDeleteDocumentData
                open={isDeleteModalOpen}
                setOpen={setIsDeleteModalOpen}
                name={name}
                onConfirmDelete={handleConfirmDelete}
                isLoading={isLoading}
            />

            <Container active={activeId === id} {...props}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    {type === "pdf" && <GrDocumentPdf size={12} color={Theme.colors.black} />}
                    {type === "text" && <GrDocumentTxt size={12} color={Theme.colors.black} />}
                    {type === "csv" && <GrDocumentCsv size={12} color={Theme.colors.black} />}
                    {type === "json" && <LuFileJson2 size={12} color={Theme.colors.black} />}
                    {(type === "xls" || type === "xlsx") && (
                        <GrDocumentExcel size={12} color={Theme.colors.black} />
                    )}

                    <Typography
                        tag="h1"
                        fontSize={{ xs: "fs75" }}
                        color="black"
                        fontWeight="regular"
                    >
                        {name}
                    </Typography>
                </div>

                <Menu>
                    <Menu.Trigger>
                        <Button
                            height="25px"
                            width="25px"
                            variant="tertiary"
                            padding="0 0px"
                            onClick={e => e.stopPropagation()}
                        >
                            <MdMoreHoriz size={16} color={Theme.colors.gray80} />
                        </Button>
                    </Menu.Trigger>

                    <Menu.Content align="start">
                        <Menu.Item
                            text="Excluir Dado"
                            onClick={e => {
                                e.stopPropagation();
                                setIsDeleteModalOpen(true);
                            }}
                            iconPosition="left"
                            icon={<MdDeleteOutline size={14} color={Theme.colors.black} />}
                        />
                    </Menu.Content>
                </Menu>
            </Container>
        </div>
    );
};
