import { Button } from "@/components/features/button";
import { Spinner } from "@/components/features/loading/spinner";
import { Typography } from "@/components/features/typography";
import { Modal } from "@/components/ui/modal";
import { Tooltip } from "@/components/ui/tooltip";
import {
    createDocumentData,
    DocumentDataResponse,
    getDataByDocument,
    getDataContent,
    updateDocumentData,
} from "@/repositories/documentDataAPI";
import { Theme } from "@/themes";
import { useQuery } from "@tanstack/react-query";
import ReactCodeMirror from "@uiw/react-codemirror";
import _ from "lodash";
import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    MdAddCircle,
    MdOutlineCloudDone,
    MdOutlineCloudOff,
    MdOutlineCloudUpload,
} from "react-icons/md";
import { TbDatabase } from "react-icons/tb";

import { ModalCreateData } from "../modalCreateData";
import { DataItem } from "./components/dataItem";
import { CUSTOM_THEME } from "./editorTheme";
import {
    DataContainer,
    DataContent,
    ConfigurationContainer,
    ConfigurationContent,
    Divider,
    TopContainer,
    DataFooter,
} from "./styles";

interface IModalDataProps {
    isOpen: boolean;
    close: () => void;
    documentId: string;
}

export const ModalData = ({ isOpen, close, documentId }: IModalDataProps): ReactElement => {
    const toastErrorRef = useRef<{ publish: () => void } | null>(null);

    const [isModalCreateDataOpen, setIsModalCreateDataOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");
    const [activeId, setActiveId] = useState<string>("");
    const [isCreateLoading, setIsCreateLoading] = useState<boolean>(false);
    const [saveStatus, setSaveStatus] = useState<"pending" | "success" | "error">("success");

    const { status, data, refetch } = useQuery({
        queryKey: ["get_document_data", documentId, isOpen],
        retry: false,
        queryFn: async (): Promise<DocumentDataResponse[]> => {
            if (!documentId || !isOpen) return [];

            const response: DocumentDataResponse[] = await getDataByDocument(documentId);
            return response;
        },
    });

    const { status: contentStatus } = useQuery({
        queryKey: ["get_document_data_content", isOpen, activeId],
        retry: false,
        queryFn: async (): Promise<string | object> => {
            if (!isOpen || !activeId) return "";

            const response = await getDataContent(activeId);
            setValue(response as string);
            return response;
        },
    });

    const handleChangeActiveId = (id: string) => {
        if (activeId === id) setActiveId("");
        else setActiveId(id);
    };

    const handleCreateData = async (
        dataName: string,
        dataValue: string | object
    ): Promise<void> => {
        setIsCreateLoading(true);

        try {
            await createDocumentData(documentId, dataName, dataValue, "text");
            await refetch();
            setIsModalCreateDataOpen(false);
        } catch (error) {
            toastErrorRef.current?.publish();
        }

        setIsCreateLoading(false);
    };

    const saveChange = useMemo(
        () =>
            _.debounce(async (newData: string) => {
                setSaveStatus("pending");
                if (data) {
                    try {
                        await updateDocumentData(activeId, newData);
                        setSaveStatus("success");
                    } catch (error) {
                        setSaveStatus("error");
                    }
                }
            }, 2000),

        [activeId, data]
    );

    const onChange = useCallback(
        (val: string) => {
            setValue(val);
            saveChange(val);
        },
        [saveChange]
    );

    const handleDeleteData = (): void => {
        setActiveId("");
        setValue("");
        refetch();
    };

    useEffect(() => {
        setSaveStatus("success");
        setValue("");
        setActiveId("");

        return () => {
            setSaveStatus("success");
            setValue("");
            setActiveId("");
        };
    }, [isOpen]);

    return (
        <>
            <ModalCreateData
                open={isModalCreateDataOpen}
                setOpen={setIsModalCreateDataOpen}
                onCreateData={handleCreateData}
                isLoading={isCreateLoading}
                toastErrorRef={toastErrorRef}
            />

            <Modal
                isOpen={isOpen}
                onClose={close}
                title="Dados"
                icon={<TbDatabase size={12} color={Theme.colors.gray100} />}
            >
                <TopContainer>
                    <ConfigurationContainer>
                        <Button
                            height="35px"
                            width="100%"
                            onClick={() => setIsModalCreateDataOpen(true)}
                            hasShadow
                        >
                            <MdAddCircle size={12} color={Theme.colors.white} />

                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs75" }}
                                color="white"
                                fontWeight="regular"
                                textAlign="left"
                            >
                                Adicionar Novo Dado
                            </Typography>
                        </Button>

                        <Divider />

                        <ConfigurationContent>
                            {status === "pending" && (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <div style={{ transform: "scale(0.8)" }}>
                                        <Spinner />
                                    </div>
                                </div>
                            )}

                            {status === "success" &&
                                data.length > 0 &&
                                data.map(item => (
                                    <DataItem
                                        key={item.id}
                                        id={item.id}
                                        type={item.type}
                                        name={item.name}
                                        activeId={activeId}
                                        onClick={() => handleChangeActiveId(item.id)}
                                        onDelete={handleDeleteData}
                                    />
                                ))}
                        </ConfigurationContent>
                    </ConfigurationContainer>

                    <DataContainer>
                        <DataContent>
                            {contentStatus === "pending" && activeId && (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <div style={{ transform: "scale(0.8)" }}>
                                        <Spinner />
                                    </div>
                                </div>
                            )}

                            {contentStatus === "success" && activeId && (
                                <ReactCodeMirror
                                    value={value}
                                    theme={CUSTOM_THEME}
                                    height="100%"
                                    extensions={[]}
                                    onChange={onChange}
                                />
                            )}
                        </DataContent>

                        {!activeId && <DataFooter></DataFooter>}

                        {activeId && (
                            <DataFooter>
                                {saveStatus === "success" && (
                                    <Tooltip>
                                        <Tooltip.Trigger>
                                            <MdOutlineCloudDone
                                                size={12}
                                                color={Theme.colors.black}
                                            />
                                        </Tooltip.Trigger>
                                        <Tooltip.Content>
                                            Todas as alterações foram salvas
                                        </Tooltip.Content>
                                    </Tooltip>
                                )}

                                {saveStatus === "pending" && (
                                    <Tooltip>
                                        <Tooltip.Trigger>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "5px",
                                                }}
                                            >
                                                <MdOutlineCloudUpload
                                                    size={12}
                                                    color={Theme.colors.black}
                                                />

                                                <Typography
                                                    tag="p"
                                                    fontSize={{ xs: "fs50" }}
                                                    color="black"
                                                    fontWeight="medium"
                                                    textAlign="left"
                                                >
                                                    Salvando...
                                                </Typography>
                                            </div>
                                        </Tooltip.Trigger>
                                        <Tooltip.Content>Salvando alterações...</Tooltip.Content>
                                    </Tooltip>
                                )}

                                {saveStatus === "error" && (
                                    <Tooltip>
                                        <Tooltip.Trigger>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "5px",
                                                }}
                                            >
                                                <MdOutlineCloudOff
                                                    size={12}
                                                    color={Theme.colors.red70}
                                                />
                                            </div>
                                        </Tooltip.Trigger>
                                        <Tooltip.Content>
                                            Erro ao salvar as alterações
                                        </Tooltip.Content>
                                    </Tooltip>
                                )}
                            </DataFooter>
                        )}
                    </DataContainer>
                </TopContainer>
            </Modal>
        </>
    );
};
