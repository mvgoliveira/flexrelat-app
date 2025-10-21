import { Button } from "@/components/features/button";
import { DocumentDownload } from "@/components/features/documentDownload";
import { Menu } from "@/components/features/menu";
import { Typography } from "@/components/features/typography";
import { Tooltip } from "@/components/ui/tooltip";
import { useDocumentContext } from "@/context/documentContext";
import { updateDocumentTitle } from "@/repositories/documentAPI";
import { Theme } from "@/themes";
import { getFormattedDate } from "@/utils/date";
import { pdf } from "@react-pdf/renderer";
import html2pdf from "html2pdf.js";
import _ from "lodash";
import { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineFilePdf, AiOutlineFileWord } from "react-icons/ai";
import {
    MdArrowBack,
    MdHistory,
    MdMoreHoriz,
    MdOutlineAutoMode,
    MdOutlineCloudDone,
    MdOutlineCloudOff,
    MdOutlineCloudUpload,
    MdOutlineFileDownload,
} from "react-icons/md";
import { TbDatabase } from "react-icons/tb";
import { VscDebugConsole } from "react-icons/vsc";

import { ButtonsContainer, RightContainer, Root, TitleContainer, TitleContent } from "./styles";

interface IHeaderProps {
    metadata: {
        id: string;
        title: string;
        createdAt: string;
        saveStatus: "pending" | "success" | "error";
        onChangeStatus: (status: "pending" | "success" | "error") => void;
    };
}

export const Header = ({ metadata }: IHeaderProps): ReactElement => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [title, setTitle] = useState<string>(metadata.title);

    const { getHtmlContent } = useDocumentContext();

    const saveTitle = useMemo(
        () =>
            _.debounce(async (newTitle: string) => {
                try {
                    metadata.onChangeStatus("pending");
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    const response = await updateDocumentTitle(metadata.id, newTitle);

                    metadata.onChangeStatus("success");

                    if (titleRef && titleRef.current && newTitle !== "Relatório sem título") {
                        titleRef.current.textContent = response.title;
                        titleRef.current.style.color = Theme.colors.gray100;
                        setTitle(response.title);
                    } else if (newTitle === "Relatório sem título") {
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
                titleRef.current!.textContent = "Relatório sem título";
            }

            saveTitle(titleRef.current.textContent || "");
        }

        if (titleRef.current && titleRef.current.textContent === "" && title === "") {
            titleRef.current.style.color = Theme.colors.gray70;
            titleRef.current.textContent = "Relatório sem título";
        }
    };

    const handleChangeTitle = async () => {
        if (titleRef.current && titleRef.current.textContent !== "Relatório sem título") {
            titleRef.current.style.color = Theme.colors.gray100;
        }
    };

    const handleClickTitle = () => {
        if (titleRef.current && titleRef.current.textContent === "Relatório sem título") {
            titleRef.current.textContent = "";
        }
    };

    const handleDownloadPDF = async () => {
        const htmlContent = getHtmlContent();

        // Remove all id
        let filteredHtml = htmlContent.replaceAll(/data-id="[^"]*"/g, "");

        // Remove inline style min-width
        filteredHtml = filteredHtml.replaceAll(/style="[^"]*min-width:[^;"]*;?"/g, "");

        // Replace quick-chart with img
        filteredHtml = filteredHtml.replaceAll(
            /<quick-chart[^>]*chartdata="([^"]+)"[^>]*><\/quick-chart>/g,
            (match, chartData) => {
                try {
                    const url = `https://quickchart.io/chart?c=${chartData}`;
                    return `
                        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 9pt;">
                            <img src="${url}" style="width: 375pt;" />
                        </div>
                    `;
                } catch (e) {
                    console.error("Erro ao processar chartdata:", e);
                    return "";
                }
            }
        );

        const pdfBlob = await pdf(<DocumentDownload html={filteredHtml} />).toBlob();
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        const currentTitle = title || "Relatório sem título";
        link.download = currentTitle;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadPDFCanvas = async () => {
        const htmlContent = getHtmlContent();

        // Replace quick-chart with img
        const filteredHtml = htmlContent.replaceAll(
            /<quick-chart[^>]*chartdata="([^"]+)"[^>]*><\/quick-chart>/g,
            (match, chartData) => {
                try {
                    const url = `https://quickchart.io/chart?c=${chartData}`;
                    return `
                        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 9pt;">
                            <img src="${url}" style="width: 500px; height: 300px;" />
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
                    font-size: 16px;
                    line-height: 1.5;
                    word-wrap: break-word;
                }

                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                    font-weight: bold;
                }

                p:empty {
                    margin-bottom: 12px;
                    min-height: 24px;
                    width: 100%;
                }

                table {
                    border-collapse: collapse;
                    overflow: hidden;
                    table-layout: fixed;
                    width: 100%;
                    margin-bottom: 12px;
                    page-break-inside: auto;
                }

                table p {
                    margin-bottom: 0;
                }

                tr {
                    page-break-inside: avoid;
                    page-break-after: auto;
                }

                table tr:last-of-type { margin-bottom: 12px; }

                td, th {
                    border-right: 1px solid black;
                    border-bottom: 1px solid black;
                    box-sizing: border-box;
                    padding: 6px;
                    position: relative;
                }

                table td:first-of-type,
                table th:first-of-type {
                    border-left: 1px solid black;
                }

                table th {
                    font-weight: bold;
                    text-align: start;
                    border-top: 1px solid black;
                }

                table th p {
                    text-align: start;
                }

                ul {
                    list-style-type: disc;
                    padding-left: 40px;
                }

                ol {
                    list-style-type: decimal;
                    padding-left: 40px;
                }
            </style>
        `;

        const finalHtml = `
            <html>
                <head>${styles}</head>
                <body>${filteredHtml}</body>
            </html>
        `;

        console.log(finalHtml);

        const opt = {
            margin: [85.039, 85.039, 56.693, 56.693],
            filename: `${title || "Relatório sem título"}.pdf`,
            image: { type: "webp", quality: 0.98 },
            html2canvas: { scale: 2, dpi: 300, letterRendering: true, useCORS: true },
            jsPDF: { unit: "pt", format: "a4", orientation: "portrait", compress: true },
            pagebreak: { mode: ["css"], avoid: ["img", "h1", "h2", "h3", "h4", "h5", "h6"] },
        };

        html2pdf().set(opt).from(finalHtml).save();
    };

    const handleDownloadDOCX = async () => {};

    const handleDebugConsole = async () => {
        const htmlContent = getHtmlContent();

        // Replace quick-chart with img
        const filteredHtml = htmlContent.replaceAll(
            /<quick-chart[^>]*chartdata="([^"]+)"[^>]*><\/quick-chart>/g,
            (match, chartData) => {
                try {
                    const url = `https://quickchart.io/chart?c=${chartData}`;
                    return `
                        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 9pt;">
                            <img src="${url}" style="width: 375pt;" />
                        </div>
                    `;
                } catch (e) {
                    console.error("Erro ao processar chartdata:", e);
                    return "";
                }
            }
        );

        console.log(filteredHtml);
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
        <Root>
            <TitleContainer>
                <Button width="25px" height="25px" variant="secondary">
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
                                {title === "" ? "Relatório sem título" : title}
                            </Typography>
                        </TitleContent>

                        {metadata.saveStatus === "success" && (
                            <Tooltip>
                                <Tooltip.Trigger>
                                    <MdOutlineCloudDone size={12} color={Theme.colors.black} />
                                </Tooltip.Trigger>
                                <Tooltip.Content>Todas as alterações foram salvas</Tooltip.Content>
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
                                        <MdOutlineCloudOff size={12} color={Theme.colors.red70} />
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
                    <Button height="30px" variant="secondary" padding="0 10px">
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
                    </Button>

                    <Button height="30px" variant="secondary" padding="0 10px">
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

                    <Button height="30px" variant="secondary" padding="0 10px">
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
                    </Button>
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

                            <Menu.Item
                                text="Download em PDF Canvas"
                                onClick={handleDownloadPDFCanvas}
                                iconPosition="left"
                                icon={<AiOutlineFilePdf size={12} color={Theme.colors.black} />}
                            />

                            <Menu.Item
                                text="Download em DOCX"
                                onClick={handleDownloadDOCX}
                                iconPosition="left"
                                icon={<AiOutlineFileWord size={12} color={Theme.colors.black} />}
                            />

                            <Menu.Item
                                text="Depuração"
                                onClick={handleDebugConsole}
                                iconPosition="left"
                                icon={<VscDebugConsole size={12} color={Theme.colors.black} />}
                            />
                        </Menu.Content>
                    </Menu>

                    <Button height="30px" width="30px" variant="tertiary">
                        <MdMoreHoriz size={16} color={Theme.colors.gray100} />
                    </Button>
                </ButtonsContainer>
            </RightContainer>
        </Root>
    );
};
