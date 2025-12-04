import { Button } from "@/components/features/button";
import { Menu } from "@/components/features/menu";
import { Typography } from "@/components/features/typography";
import { ModalDeleteModel } from "@/components/layouts/modals/modalDeleteModel";
import { ModelDataWithUser } from "@/repositories/modelAPI";
import { Theme } from "@/themes";
import { getShortElapsedTime } from "@/utils/date";
import Image from "next/image";
import { ReactElement, useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { MdDeleteOutline, MdMoreHoriz, MdOutlineEdit } from "react-icons/md";

import { TableRow, TableCell, IconContainer, ProfileImage } from "./styles";

export interface IModelItemProps {
    model: ModelDataWithUser;
    onClick: (publicCode: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

export const ModelItem = ({ model, onClick, onDelete, onEdit }: IModelItemProps): ReactElement => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    return (
        <>
            <ModalDeleteModel
                open={isDeleteModalOpen}
                setOpen={setIsDeleteModalOpen}
                onConfirmDelete={() => onDelete(model.id)}
            />

            <TableRow key={model.id} onClick={() => onClick(model.publicCode)}>
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
                            {model.name}
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
                                src={`https://ui-avatars.com/api/?background=random&name=${model.user.username}&bold=true`}
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
                            {model.user.username}
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
                        {getShortElapsedTime(model.createdAt)}
                    </Typography>
                </TableCell>

                <TableCell centered>
                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs75" }}
                        color="gray80"
                        fontWeight="regular"
                    >
                        {getShortElapsedTime(model.updatedAt)}
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
                                    text="Excluir Modelo"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setIsDeleteModalOpen(true);
                                    }}
                                    iconPosition="left"
                                    icon={<MdDeleteOutline size={14} color={Theme.colors.black} />}
                                />

                                <Menu.Item
                                    text="Editar Modelo"
                                    onClick={e => {
                                        e.stopPropagation();
                                        onEdit(model.id);
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
