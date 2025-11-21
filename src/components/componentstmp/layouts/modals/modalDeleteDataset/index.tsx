import { Button } from "@/components/features/button";
import { Input } from "@/components/features/input";
import { Spinner } from "@/components/features/loading/spinner";
import { Typography } from "@/components/features/typography";
import { Modal } from "@/components/ui/modalRadix";
import { Theme } from "@/themes";
import { KeyboardEvent, ReactElement, useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

import { DeleteInfoContainer, StyledContent } from "./styles";

interface IDeleteDatasetModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onConfirmDelete: () => void;
    name: string;
}

export const ModalDeleteDataset = ({
    open,
    setOpen,
    onConfirmDelete,
    name,
}: IDeleteDatasetModalProps): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedName, setSelectedName] = useState<string>("");

    const handleDeleteGroup = async (): Promise<void> => {
        if (selectedName.toLocaleLowerCase() === name.toLocaleLowerCase()) {
            setIsLoading(true);
            onConfirmDelete();
            setIsLoading(false);
            setOpen(false);
            setSelectedName("");
        }
    };

    const closeModal = (): void => {
        setOpen(false);
        setIsLoading(false);
        setSelectedName("");
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            handleDeleteGroup();
        }
    };

    useEffect(() => {
        setIsLoading(false);
        return () => {
            setIsLoading(false);
        };
    }, [open]);

    return (
        <>
            <Modal open={open} onOpenChange={setOpen} width="350px" onClickOverlay={closeModal}>
                <Modal.Header>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <MdOutlineDelete size={16} color={Theme.colors.gray100} />

                        <Typography
                            tag="span"
                            fontSize={{ xs: "fs100" }}
                            color="gray100"
                            fontWeight="bold"
                        >
                            Deletar Dataset
                        </Typography>
                    </div>
                </Modal.Header>

                <Modal.Content>
                    <StyledContent onSubmit={handleDeleteGroup}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs75" }}
                                color="gray80"
                                fontWeight="regular"
                            >
                                Para remover o grupo de dispositivos, digite o nome do dataset
                                abaixo:
                            </Typography>

                            <DeleteInfoContainer>
                                <Typography
                                    tag="p"
                                    fontSize={{ xs: "fs75" }}
                                    color="red70"
                                    fontWeight="regular"
                                    textAlign="left"
                                >
                                    {name.toLocaleLowerCase()}
                                </Typography>
                            </DeleteInfoContainer>

                            <Input
                                label=""
                                placeholder="Insira o nome do dataset"
                                value={selectedName}
                                onChange={e => {
                                    setSelectedName(e.target.value);
                                }}
                                onKeyDown={handleKeyPress}
                            />
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                            <Button
                                height="30px"
                                type="button"
                                variant="secondary"
                                onClick={closeModal}
                            >
                                <Typography
                                    tag="p"
                                    fontSize={{ xs: "fs75" }}
                                    color="black"
                                    fontWeight="regular"
                                    textAlign="center"
                                >
                                    Cancelar
                                </Typography>
                            </Button>

                            <Button
                                height="30px"
                                type="submit"
                                disabled={
                                    isLoading ||
                                    selectedName.toLocaleLowerCase() !== name.toLocaleLowerCase()
                                }
                            >
                                {isLoading ? (
                                    <div style={{ transform: "scale(0.6)" }}>
                                        <Spinner />
                                    </div>
                                ) : (
                                    <Typography
                                        tag="p"
                                        fontSize={{ xs: "fs75" }}
                                        color="white"
                                        fontWeight="regular"
                                        textAlign="center"
                                    >
                                        Confirmar
                                    </Typography>
                                )}
                            </Button>
                        </div>
                    </StyledContent>
                </Modal.Content>
            </Modal>
        </>
    );
};
