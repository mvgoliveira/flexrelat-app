import { Button } from "@/components/features/button";
import { Menu } from "@/components/features/menu";
import { Typography } from "@/components/features/typography";
import { ModalDeleteDocument } from "@/components/layouts/modals/modalDeleteDocument";
import { DocumentDataWithUser } from "@/repositories/documentAPI";
import { Theme } from "@/themes";
import { getShortElapsedTime } from "@/utils/date";
import Image from "next/image";
import { ReactElement, useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { MdDeleteOutline, MdMoreHoriz, MdOutlineEdit } from "react-icons/md";

import { TableRow, TableCell, IconContainer, ProfileImage } from "./styles";

export interface IDocumentItemProps {
    document: DocumentDataWithUser;
    onClick: (publicCode: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

export const DocumentItem = ({
    document,
    onClick,
    onDelete,
    onEdit,
}: IDocumentItemProps): ReactElement => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    return (
        <>
            <ModalDeleteDocument
                open={isDeleteModalOpen}
                setOpen={setIsDeleteModalOpen}
                onConfirmDelete={() => onDelete(document.id)}
            />

            <TableRow key={document.id} onClick={() => onClick(document.publicCode)}>
                <TableCell>
                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                        }}
                    >
                        <IconContainer>
                            <CgFileDocument size={12} color="gray80" />
                        </IconContainer>

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="gray80"
                            fontWeight="regular"
                        >
                            {document.name || "Relatório sem título"}
                        </Typography>
                    </div>
                </TableCell>

                <TableCell>
                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                        }}
                    >
                        <ProfileImage>
                            <Image
                                src={`https://ui-avatars.com/api/?background=random&name=${document.user.username}&bold=true`}
                                alt="organization avatar"
                                width={20}
                                height={20}
                            />
                        </ProfileImage>

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="gray80"
                            fontWeight="regular"
                        >
                            {document.user.username}
                        </Typography>
                    </div>
                </TableCell>

                <TableCell centered>
                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs75" }}
                        color="gray80"
                        fontWeight="regular"
                    >
                        {getShortElapsedTime(document.createdAt)}
                    </Typography>
                </TableCell>

                <TableCell centered>
                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs75" }}
                        color="gray80"
                        fontWeight="regular"
                    >
                        {getShortElapsedTime(document.updatedAt)}
                    </Typography>
                </TableCell>

                <TableCell centered maxWidth="100px">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
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

                            <Menu.Content align="center">
                                <Menu.Item
                                    text="Excluir Documento"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setIsDeleteModalOpen(true);
                                    }}
                                    iconPosition="left"
                                    icon={<MdDeleteOutline size={14} color={Theme.colors.black} />}
                                />

                                <Menu.Item
                                    text="Editar Documento"
                                    onClick={e => {
                                        e.stopPropagation();
                                        onEdit(document.id);
                                    }}
                                    iconPosition="left"
                                    icon={<MdOutlineEdit size={14} color={Theme.colors.black} />}
                                />
                            </Menu.Content>
                        </Menu>
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
};
