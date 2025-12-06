import { Button } from "@/components/features/button";
import { Input } from "@/components/features/input";
import { Spinner } from "@/components/features/loading/spinner";
import { Typography } from "@/components/features/typography";
import { Modal } from "@/components/ui/modalRadix";
import { Toast } from "@/components/ui/toast";
import { parseFileContent } from "@/repositories/documentDataAPI";
import { Theme } from "@/themes";
import { ReactElement, RefObject, useEffect, useState } from "react";
import { ImUpload } from "react-icons/im";
import { TbDatabase } from "react-icons/tb";

import { StyledContent, StyledDragger } from "./styles";

interface ICreateDataModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onCreateData: (name: string, dataValue: string | object) => void;
    isLoading: boolean;
    toastErrorRef: RefObject<{
        publish: () => void;
    } | null>;
}

export const ModalCreateData = ({
    open,
    setOpen,
    onCreateData,
    isLoading,
    toastErrorRef,
}: ICreateDataModalProps): ReactElement => {
    const [name, setName] = useState<string>("");
    const [fileData, setFileData] = useState<string | object>("");

    const handleCreateData = async (e: any): Promise<void> => {
        e.preventDefault();
        onCreateData(name, fileData);
    };

    const handleSendFile = async (file: File) => {
        const text = await parseFileContent(file);
        setFileData(text);
    };

    const closeModal = (): void => {
        setOpen(false);
    };

    useEffect(() => {
        if (!open) {
            setName("");
            setFileData("");
        }

        return () => {
            setName("");
            setFileData("");
        };
    }, [open]);

    return (
        <>
            <Toast>
                <Toast.Content ref={toastErrorRef} variant="error">
                    <Toast.Title>Erro na criação do dado</Toast.Title>
                    <Toast.Description>
                        Não foi possível criar uma nova fonte dado. Tente novamente mais tarde.
                    </Toast.Description>
                </Toast.Content>
            </Toast>

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
                    <StyledContent onSubmit={handleCreateData}>
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
                            name="file"
                            customRequest={async ({ file, onSuccess, onError }) => {
                                try {
                                    await handleSendFile(file as File);
                                    onSuccess?.("ok");
                                } catch (error) {
                                    onError?.(error as Error);
                                }
                            }}
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
