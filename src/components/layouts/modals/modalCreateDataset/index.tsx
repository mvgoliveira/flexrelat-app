import { Button } from "@/components/features/button";
import { Input } from "@/components/features/input";
import { Spinner } from "@/components/features/loading/spinner";
import { Typography } from "@/components/features/typography";
import { Modal } from "@/components/ui/modalRadix";
import { Theme } from "@/themes";
import { KeyboardEvent, ReactElement, useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

import { StyledContent } from "./styles";

interface ICreateDatasetModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onCreate: (name: string) => void;
}

export const ModalCreateDataset = ({
    open,
    setOpen,
    onCreate,
}: ICreateDatasetModalProps): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const handleCreateDataset = async (): Promise<void> => {
        if (!name) return;

        setIsLoading(true);
        onCreate(name);
        setName("");
        setOpen(false);
        setIsLoading(false);
    };

    const closeModal = (): void => {
        setOpen(false);
        setName("");
        setIsLoading(false);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            handleCreateDataset();
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
                            Criar Novo Dataset
                        </Typography>
                    </div>
                </Modal.Header>

                <Modal.Content>
                    <StyledContent onSubmit={handleCreateDataset}>
                        <Input
                            label="Nome *"
                            placeholder="Insira o nome do dataset"
                            value={name}
                            onChange={e => {
                                setName(e.target.value);
                            }}
                            onKeyDown={handleKeyPress}
                        />

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

                            <Button height="30px" type="submit" disabled={isLoading || !name}>
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
