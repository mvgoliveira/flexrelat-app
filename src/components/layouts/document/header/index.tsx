import { Button } from "@/components/features/button";
import { Menu } from "@/components/features/menu";
import { Typography } from "@/components/features/typography";
import { ModalData } from "@/components/layouts/modals/modalData";
import { Toast } from "@/components/ui/toast";
import { Tooltip } from "@/components/ui/tooltip";
import { useDocumentContext } from "@/context/documentContext";
import { deleteDocument, updateDocumentTitle } from "@/repositories/documentAPI";
import { createModel } from "@/repositories/modelAPI";
import { Theme } from "@/themes";
import { getFormattedDate } from "@/utils/date";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { BiCopyAlt } from "react-icons/bi";
import { LiaFileDownloadSolid, LiaSave } from "react-icons/lia";
import {
    MdArrowBack,
    MdDeleteOutline,
    MdMoreHoriz,
    MdOutlineCloudDone,
    MdOutlineCloudOff,
    MdOutlineCloudUpload,
    MdOutlineFileDownload,
    MdSaveAlt,
} from "react-icons/md";
import { TbDatabase } from "react-icons/tb";

import { ModalCreateModel } from "../../modals/modalCreateModel";
import {
    AiLoadingIconContainer,
    ButtonsContainer,
    IconChangeAnimation,
    IconChangeContainer,
    LoadingContainer,
    RightContainer,
    Root,
    TitleContainer,
    TitleContent,
} from "./styles";

interface IHeaderProps {
    metadata: {
        id: string;
        title: string | null;
        createdAt: string;
        saveStatus: "pending" | "success" | "error";
        onChangeStatus: (status: "pending" | "success" | "error") => void;
    };
}

export const Header = ({ metadata }: IHeaderProps): ReactElement => {
    const router = useRouter();
    const { documentData } = useDocumentContext();

    const toastErrorRef = useRef<{ publish: () => void } | null>(null);
    const toastDeleteErrorRef = useRef<{ publish: () => void } | null>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    const [title, setTitle] = useState<string>(metadata.title || "Sem título");
    const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false);
    const [isDataModalOpen, setIsDataModalOpen] = useState<boolean>(false);
    const [isCreateModelModalOpen, setIsCreateModelModalOpen] = useState<boolean>(false);
    const [isCreateModelLoading, setIsCreateModelLoading] = useState<boolean>(false);

    const { getHtmlContent } = useDocumentContext();

    const saveTitle = useMemo(
        () =>
            _.debounce(async (newTitle: string) => {
                try {
                    metadata.onChangeStatus("pending");
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    if (newTitle === title) {
                        return;
                    }

                    const response = await updateDocumentTitle(metadata.id, newTitle);

                    metadata.onChangeStatus("success");

                    if (titleRef && titleRef.current && newTitle !== "Sem título") {
                        titleRef.current.textContent = response.name;
                        titleRef.current.style.color = Theme.colors.gray100;
                        setTitle(response.name);
                    } else if (newTitle === "Sem título") {
                        setTitle("");
                    }
                } catch (error) {
                    if (titleRef) {
                        if (titleRef.current) {
                            titleRef.current.textContent = title;
                        }
                    }

                    metadata.onChangeStatus("error");
                }
            }, 500),
        [metadata, title]
    );

    const handleBlurTitle = async () => {
        if (titleRef.current && titleRef.current.textContent !== title) {
            if (!titleRef.current.textContent) {
                titleRef.current!.style.color = Theme.colors.gray70;
                titleRef.current!.textContent = "Sem título";
            }

            saveTitle(titleRef.current.textContent || "");
        }

        if (titleRef.current && titleRef.current.textContent === "" && title === "") {
            titleRef.current.style.color = Theme.colors.gray70;
            titleRef.current.textContent = "Sem título";
        }
    };

    const handleChangeTitle = async () => {
        if (titleRef.current && titleRef.current.textContent !== "Sem título") {
            titleRef.current.style.color = Theme.colors.gray100;
        }
    };

    const handleClickTitle = () => {
        if (titleRef.current && titleRef.current.textContent === "Sem título") {
            titleRef.current.textContent = "";
        }
    };

    const handleDownloadPDF = async () => {
        setIsDownloadLoading(true);

        const html2pdf = (await import("html2pdf.js")).default;

        const htmlContent = getHtmlContent();

        // Replace quick-chart with img
        const filteredHtml = htmlContent.replaceAll(
            /<quick-chart[^>]*chartdata="([^"]+)"[^>]*width="([^"]+)"[^>]*height="([^"]+)"[^>]*><\/quick-chart>/g,
            (match, chartData, width, height) => {
                try {
                    const url = `https://quickchart.io/chart?c=${chartData}&w=${width * 1.3}&h=${height * 1.3}`;
                    return `
                        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 9pt;">
                            <img src="${url}" style="width: ${width}px; height: ${height}px;" />
                        </div>
                    `;
                } catch (e) {
                    console.error("Erro ao processar chartdata:", e);
                    return "";
                }
            }
        );

        const styles = `
            <style>
                h1,
                h2,
                h3,
                h4,
                h5,
                h6,
                p {
                    margin-bottom: 12px;
                    text-align: start;
                    font-family: "Times New Roman, serif";
                    font-size: 12pt;
                    line-height: 1.5;
                    word-wrap: normal;
                }

                p:empty::before {
                    content: " ";
                    display: inline-block;
                    height: 12pt;
                }

                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                    font-weight: bold;
                }

                hr {
                    margin-bottom: 12px;
                    border: none;
                    border-bottom: 1px solid #373737;
                }

                .layout h1,
                .layout h2,
                .layout h3,
                .layout h4,
                .layout h5,
                .layout h6,
                .layout p {
                    margin-bottom: 0px;
                }

                table {
                    border-collapse: collapse;
                    overflow: hidden;
                    table-layout: fixed;
                    width: 100%;
                    margin-bottom: 12px;
                }

                table p {
                    white-space: pre-wrap;
                    line-height: 1;
                }

                table p:empty {
                    white-space: normal;
                }

                table tr:last-of-type {
                    margin-bottom: 12px;
                }

                table tr:first-of-type td,
                table tr:first-of-type th {
                    border-top: 1px solid #000000;
                }

                table td,
                table th {
                    border-right: 1px solid #000000;
                    border-bottom: 1px solid #000000;
                    box-sizing: border-box;
                    padding: 6px;
                    position: relative;
                }

                table td > *,
                table th > * {
                    margin-bottom: 0 !important;
                }

                table td:first-of-type,
                table th:first-of-type {
                    border-left: 1px solid #000000;
                }

                table th {
                    font-weight: bold;
                    text-align: center;
                }

                table th p {
                    text-align: start;
                    line-height: 1;
                }

                ul {
                    list-style-type: disc;
                    padding-left: 40px;
                }

                ol {
                    list-style-type: decimal;
                    padding-left: 40px;
                }

                blockquote {
                    border-left: 4px solid #d1d5db;
                    padding-left: 16px;
                    margin-left: 0;
                    margin-bottom: 12px;
                    font-style: italic;
                    background: rgba(249, 250, 251, 0.5);
                    padding-top: 8px;
                    padding-bottom: 8px;
                }

                blockquote p {
                    margin-bottom: 0;
                }

                pre {
                    background-color: #171717;
                    background: #171717;
                    color: #F6F6F6;
                    font-family: monospace;
                    padding: 16px;
                    border-radius: 4px;
                    margin-bottom: 12px;
                    overflow-x: auto;
                    line-height: 1.5;
                }

                pre code {
                    background: none;
                    color: inherit;
                    font-size: 11pt;
                    padding: 0;
                }
            </style>
        `;

        const finalHtml = `
            <html>
                <head>${styles}</head>
                <body>${filteredHtml}</body>
            </html>
        `;

        const opt = {
            margin: [85.039, 85.039, 56.693, 56.693] as [number, number, number, number],
            filename: `${title || "Sem título"}.pdf`,
            image: { type: "webp" as const, quality: 0.98 },
            html2canvas: {
                allowTaint: true,
                letterRendering: true,
                logging: false,
                dpi: 300,
                scale: 2,
                useCORS: true,
            },
            jsPDF: {
                unit: "pt" as const,
                format: "a4",
                orientation: "portrait" as const,
                compress: true,
            },
            autoPaging: "text",
            pagebreak: { mode: ["css"], avoid: ["img", "h1", "h2", "h3", "h4", "h5", "h6"] },
        };

        await html2pdf().set(opt).from(finalHtml).save();
        setIsDownloadLoading(false);
    };

    const handleBackToDocuments = () => {
        router.push(`/documents`);
    };

    const handleCreateModel = async (withAi: boolean) => {
        try {
            setIsCreateModelLoading(true);
            const newModel = await createModel({
                documentId: metadata.id,
                name: `[MODELO] ${title}`,
                description: "Sem descrição",
                withAi,
            });
            router.push(`/models/${newModel.publicCode}`);
        } catch (error) {
            if (toastErrorRef.current) toastErrorRef.current.publish();
        }
        setIsCreateModelLoading(false);
    };

    const handleDeleteDocument = async () => {
        try {
            if (documentData) {
                await deleteDocument(documentData?.id);
                router.push(`/documents`);
            } else {
                throw new Error("Documento não encontrado");
            }
        } catch (error) {}
    };

    useEffect(() => {
        if (metadata.title) {
            setTitle(metadata.title);
        }

        return () => {
            setTitle("");
            setTitle("");
        };
    }, [metadata.title]);

    return (
        <>
            <Toast>
                <Toast.Content ref={toastDeleteErrorRef} variant="error">
                    <Toast.Title>Erro ao Excluir o Documento</Toast.Title>
                    <Toast.Description>
                        Não foi possível excluir o documento agora. Tente novamente mais tarde.
                    </Toast.Description>
                </Toast.Content>
            </Toast>

            <Toast>
                <Toast.Content ref={toastErrorRef} variant="error">
                    <Toast.Title>Erro na Criação do Modelo</Toast.Title>
                    <Toast.Description>
                        Não foi possível criar um documento a partir do modelo. Tente novamente mais
                        tarde.
                    </Toast.Description>
                </Toast.Content>
            </Toast>

            <ModalData
                isOpen={isDataModalOpen}
                close={() => setIsDataModalOpen(false)}
                documentId={metadata.id}
            />

            <ModalCreateModel
                open={isCreateModelModalOpen}
                setOpen={setIsCreateModelModalOpen}
                onCreateModel={handleCreateModel}
                isLoading={isCreateModelLoading}
            />

            <Root>
                {isDownloadLoading && (
                    <LoadingContainer>
                        <IconChangeContainer>
                            <IconChangeAnimation>
                                <AiLoadingIconContainer>
                                    <LiaFileDownloadSolid size={20} color={Theme.colors.white} />
                                </AiLoadingIconContainer>

                                <AiLoadingIconContainer>
                                    <LiaSave size={20} color={Theme.colors.white} />
                                </AiLoadingIconContainer>

                                <AiLoadingIconContainer>
                                    <MdSaveAlt size={20} color={Theme.colors.white} />
                                </AiLoadingIconContainer>

                                <AiLoadingIconContainer>
                                    <LiaFileDownloadSolid size={20} color={Theme.colors.white} />
                                </AiLoadingIconContainer>

                                <AiLoadingIconContainer>
                                    <LiaSave size={20} color={Theme.colors.white} />
                                </AiLoadingIconContainer>

                                <AiLoadingIconContainer>
                                    <MdSaveAlt size={20} color={Theme.colors.white} />
                                </AiLoadingIconContainer>
                            </IconChangeAnimation>
                        </IconChangeContainer>

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="white"
                            fontWeight="medium"
                            textAlign="left"
                        >
                            Preparando Arquivo
                        </Typography>
                    </LoadingContainer>
                )}

                <TitleContainer>
                    <Button
                        width="25px"
                        height="25px"
                        variant="secondary"
                        onClick={handleBackToDocuments}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <MdArrowBack size={12} color={Theme.colors.gray90} />
                        </div>
                    </Button>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <TitleContent hasTitle={title !== ""}>
                                <Typography
                                    tag="h1"
                                    fontSize={{ xs: "fs75" }}
                                    color="black"
                                    fontWeight="medium"
                                    textAlign="left"
                                    contentEditable={
                                        metadata.saveStatus !== "pending" ? "plaintext-only" : false
                                    }
                                    onBlur={handleBlurTitle}
                                    onChange={handleChangeTitle}
                                    onClick={handleClickTitle}
                                    ref={titleRef}
                                >
                                    {title === "" ? "Sem título" : title}
                                </Typography>
                            </TitleContent>

                            {metadata.saveStatus === "success" && (
                                <Tooltip>
                                    <Tooltip.Trigger>
                                        <MdOutlineCloudDone size={12} color={Theme.colors.black} />
                                    </Tooltip.Trigger>
                                    <Tooltip.Content>
                                        Todas as alterações foram salvas
                                    </Tooltip.Content>
                                </Tooltip>
                            )}

                            {metadata.saveStatus === "pending" && (
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

                            {metadata.saveStatus === "error" && (
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
                                    <Tooltip.Content>Erro ao salvar as alterações</Tooltip.Content>
                                </Tooltip>
                            )}
                        </div>

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs50" }}
                            color="gray70"
                            fontWeight="regular"
                            textAlign="left"
                        >
                            Criado em {getFormattedDate(metadata.createdAt)}
                        </Typography>
                    </div>
                </TitleContainer>

                <RightContainer>
                    <ButtonsContainer>
                        <Button
                            height="30px"
                            width="120px"
                            variant="secondary"
                            padding="0 10px"
                            onClick={() => setIsCreateModelModalOpen(true)}
                        >
                            <BiCopyAlt size={12} color={Theme.colors.gray100} />

                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs75" }}
                                color="gray100"
                                fontWeight="regular"
                                textAlign="left"
                            >
                                Criar Modelo
                            </Typography>
                        </Button>

                        <Button
                            height="30px"
                            variant="secondary"
                            padding="0 10px"
                            onClick={() => setIsDataModalOpen(true)}
                        >
                            <TbDatabase size={12} color={Theme.colors.gray100} />

                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs75" }}
                                color="gray100"
                                fontWeight="regular"
                                textAlign="left"
                            >
                                Dados
                            </Typography>
                        </Button>

                        {/* <Button height="30px" variant="secondary" padding="0 10px">
                            <MdOutlineAutoMode size={12} color={Theme.colors.gray100} />

                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs75" }}
                                color="gray100"
                                fontWeight="regular"
                                textAlign="left"
                            >
                                Automações
                            </Typography>
                        </Button> */}

                        {/* <Button height="30px" variant="secondary" padding="0 10px">
                            <MdHistory size={13} color={Theme.colors.gray100} />

                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs75" }}
                                color="gray100"
                                fontWeight="regular"
                                textAlign="left"
                            >
                                Histórico
                            </Typography>
                        </Button> */}
                    </ButtonsContainer>

                    <ButtonsContainer>
                        <Menu>
                            <Menu.Trigger>
                                <Button height="30px" variant="primary" padding="0 10px">
                                    <MdOutlineFileDownload size={12} color={Theme.colors.white} />

                                    <Typography
                                        tag="p"
                                        fontSize={{ xs: "fs75" }}
                                        color="white"
                                        fontWeight="regular"
                                        textAlign="left"
                                    >
                                        Download
                                    </Typography>
                                </Button>
                            </Menu.Trigger>

                            <Menu.Content>
                                <Menu.Item
                                    text="Download em PDF"
                                    onClick={handleDownloadPDF}
                                    iconPosition="left"
                                    icon={<AiOutlineFilePdf size={12} color={Theme.colors.black} />}
                                />
                            </Menu.Content>
                        </Menu>

                        <Menu>
                            <Menu.Trigger>
                                <Button height="30px" width="30px" variant="tertiary">
                                    <MdMoreHoriz size={16} color={Theme.colors.gray100} />
                                </Button>
                            </Menu.Trigger>

                            <Menu.Content>
                                <Menu.Item
                                    text="Excluir Documento"
                                    onClick={handleDeleteDocument}
                                    iconPosition="left"
                                    icon={<MdDeleteOutline size={12} color={Theme.colors.black} />}
                                />
                            </Menu.Content>
                        </Menu>
                    </ButtonsContainer>
                </RightContainer>
            </Root>
        </>
    );
};
