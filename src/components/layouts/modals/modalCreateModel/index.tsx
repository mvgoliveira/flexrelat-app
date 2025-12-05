import { Button } from "@/components/features/button";
import { Spinner } from "@/components/features/loading/spinner";
import { Typography } from "@/components/features/typography";
import { Modal } from "@/components/ui/modalRadix";
import { Theme } from "@/themes";
import { ReactElement, useEffect, useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { RiAiGenerateText, RiFileTextLine } from "react-icons/ri";

import { OptionCard, StyledContent } from "./styles";

interface ICreateModelModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onCreateModel: (withAi: boolean) => void;
    isLoading: boolean;
}

export const ModalCreateModel = ({
    open,
    setOpen,
    onCreateModel,
    isLoading,
}: ICreateModelModalProps): ReactElement => {
    const [optionSelected, setOptionSelected] = useState<"withAI" | "withoutAi" | null>(null);

    const handleCreateModel = async (e: any): Promise<void> => {
        e.preventDefault();
        onCreateModel(optionSelected === "withAI");
    };

    const closeModal = (): void => {
        setOpen(false);
    };

    useEffect(() => {
        return () => {
            setOptionSelected(null);
        };
    }, [open]);

    return (
        <>
            <Modal open={open} onOpenChange={setOpen} width="350px" onClickOverlay={closeModal}>
                <Modal.Header>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <BiCopyAlt size={16} color={Theme.colors.gray100} />

                        <Typography
                            tag="span"
                            fontSize={{ xs: "fs100" }}
                            color="gray100"
                            fontWeight="bold"
                        >
                            Criar Novo Modelo
                        </Typography>
                    </div>
                </Modal.Header>

                <Modal.Content>
                    <StyledContent onSubmit={handleCreateModel}>
                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="gray80"
                            fontWeight="regular"
                        >
                            Selecione uma das opções abaixo para continuar:
                        </Typography>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 5,
                            }}
                        >
                            <OptionCard
                                isSelected={optionSelected === "withAI"}
                                onClick={() => setOptionSelected("withAI")}
                            >
                                <RiAiGenerateText size={12} color={Theme.colors.gray100} />

                                <Typography
                                    tag="p"
                                    fontSize={{ xs: "fs75" }}
                                    color="gray100"
                                    fontWeight="regular"
                                >
                                    Transformar conteúdo com IA
                                </Typography>
                            </OptionCard>

                            <OptionCard
                                isSelected={optionSelected === "withoutAi"}
                                onClick={() => setOptionSelected("withoutAi")}
                            >
                                <RiFileTextLine size={12} color={Theme.colors.gray100} />

                                <Typography
                                    tag="p"
                                    fontSize={{ xs: "fs75" }}
                                    color="gray80"
                                    fontWeight="regular"
                                >
                                    Manter o conteúdo original
                                </Typography>
                            </OptionCard>
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
                                disabled={!optionSelected || isLoading}
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
