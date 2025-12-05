import { Button } from "@/components/features/button";
import { Input } from "@/components/features/input";
import { Spinner } from "@/components/features/loading/spinner";
import { Typography } from "@/components/features/typography";
import { Modal } from "@/components/ui/modalRadix";
import { Theme } from "@/themes";
import { ReactElement, useEffect, useState } from "react";
import { ImUpload } from "react-icons/im";
import { TbDatabase } from "react-icons/tb";

import { StyledContent, StyledDragger } from "./styles";

interface ISendDataModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSendData: () => void;
}

export const ModalSendData = ({ open, setOpen, onSendData }: ISendDataModalProps): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const handleSendData = async (e: any): Promise<void> => {
        e.preventDefault();
        setIsLoading(true);
        onSendData();
    };

    const closeModal = (): void => {
        setOpen(false);
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
                        <TbDatabase size={16} color={Theme.colors.gray100} />

                        <Typography
                            tag="span"
                            fontSize={{ xs: "fs100" }}
                            color="gray100"
                            fontWeight="bold"
                        >
                            Enviar Dados
                        </Typography>
                    </div>
                </Modal.Header>

                <Modal.Content>
                    <StyledContent onSubmit={handleSendData}>
                        <Input
                            label="Nome do dado"
                            placeholder="Insira o nome do dado"
                            value={name}
                            onChange={e => {
                                setName(e.target.value);
                            }}
                        />

                        <StyledDragger
                            maxCount={1}
                            accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/json, application/pdf"
                            beforeUpload={() => false}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                    padding: 20,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <ImUpload size={20} color={Theme.colors.blue50} />

                                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                    <Typography
                                        tag="p"
                                        fontSize={{ xs: "fs75" }}
                                        color="black"
                                        fontWeight="medium"
                                        textAlign="center"
                                    >
                                        Clique ou arraste o arquivo para esta área para fazer upload
                                    </Typography>

                                    <Typography
                                        tag="p"
                                        fontSize={{ xs: "fs75" }}
                                        color="gray70"
                                        fontWeight="regular"
                                        textAlign="center"
                                    >
                                        Formatos suportados: .csv, .xls, .xlsx, .json, .pdf
                                    </Typography>
                                </div>
                            </div>
                        </StyledDragger>

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
