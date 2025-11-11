import { Button } from "@/components/features/button";
import { Spinner } from "@/components/features/loading/spinner";
import { Typography } from "@/components/features/typography";
import { Modal } from "@/components/ui/modalRadix";
import { Theme } from "@/themes";
import { ReactElement, useEffect, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

import { StyledContent } from "./styles";

interface IClearMessagesModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onClearMessages: () => void;
}

export const ModalClearMessages = ({
    open,
    setOpen,
    onClearMessages,
}: IClearMessagesModalProps): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDeleteGroup = async (e: any): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        onClearMessages();
    };

    const closeModal = (): void => {
        setOpen(false);
    };

    useEffect(() => {
        return () => {
            setIsLoading(false);
        };
    }, []);

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
                            Limpar Mensagens
                        </Typography>
                    </div>
                </Modal.Header>

                <Modal.Content>
                    <StyledContent onSubmit={handleDeleteGroup}>
                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="gray80"
                            fontWeight="regular"
                        >
                            Tem certeza que deseja limpar todas as suas mensagens com o FlexBot?
                        </Typography>

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

                            <Button height="30px" type="submit">
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
