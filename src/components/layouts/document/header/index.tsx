import { Button } from "@/components/features/button";
import { Menu } from "@/components/features/Menu";
import { Typography } from "@/components/features/typography";
import { Tooltip } from "@/components/ui/tooltip";
import { useDocumentContext } from "@/context/documentContext";
import { updateDocumentTitle } from "@/repositories/documentAPI";
import { Theme } from "@/themes";
import { getFormattedDate } from "@/utils/date";
import { Document, Page, StyleSheet, pdf } from "@react-pdf/renderer";
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
import Html from "react-pdf-html";

import { ButtonsContainer, RightContainer, Root, TitleContainer, TitleContent } from "./styles";

const styles = StyleSheet.create({
    body: {
        paddingTop: "3cm",
        paddingRight: "2cm",
        paddingBottom: "2cm",
        paddingLeft: "3cm",
    },
});

const stylesheet = {
    "> p": {
        marginBottom: 9,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
        fontWeight: "normal",
        minHeight: 17.21,
    },
    h1: {
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
        counterIncrement: "h1",
        counterReset: "h2",
    },
    h2: {
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
        counterIncrement: "h2",
        counterReset: "h3",
    },
    h3: {
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
        counterIncrement: "h3",
    },
    h4: {
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
    },
    h5: {
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
    },
    h6: {
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
    },
    "h1::before": {
        content: `counter(h1) ". "`,
    },
    "h2::before": {
        content: `counter(h1) "." counter(h2) ". "`,
    },
    "h3::before": {
        content: `counter(h1) "." counter(h2) "." counter(h3) ". "`,
    },
    table: {
        borderCollapse: "collapse",
        overflow: "hidden",
        tableLayout: "fixed",
        marginBottom: 14,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        wordBreak: "break-word",
        hyphens: "auto",
    },
    "table td": {
        borderRight: "1px solid #000",
        borderBottom: "1px solid #000",
        boxSizing: "border-box",
        padding: 6.6,
        position: "relative",
        verticalAlign: "center",
    },
    "table th": {
        borderRight: "1px solid #000",
        borderBottom: "1px solid #000",
        borderTop: "1px solid #000",
        boxSizing: "border-box",
        padding: 6.6,
        position: "relative",
        verticalAlign: "center",
        fontWeight: "bold",
    },
    "table td:first-of-type": {
        borderLeft: "1px solid #000",
    },
    "table th:first-of-type": {
        borderLeft: "1px solid #000",
    },
    ul: {
        marginTop: 0,
        marginBottom: 12,
        paddingLeft: 22,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
        gap: 10,
    },
    ol: {
        marginTop: 0,
        marginBottom: 12,
        paddingLeft: 22,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
    },
    li: {
        paddingLeft: 10,
        textAlign: "start",
        fontFamily: "Times-Roman",
        fontSize: 12,
        lineHeight: 1.5,
        wordBreak: "break-word",
        hyphens: "auto",
    },
};

interface IMyDocProps {
    html: string;
}

export const MyDoc = ({ html }: IMyDocProps): ReactElement => (
    <Document>
        <Page size="A4" style={styles.body}>
            <Html resetStyles stylesheet={stylesheet}>
                {html}
            </Html>
        </Page>
    </Document>
);

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
        filteredHtml = filteredHtml.replace(/style="[^"]*min-width:[^;"]*;?"/g, "");

        const blob = await pdf(<MyDoc html={filteredHtml} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const currentTitle = title || "Relatório sem título";
        link.download = currentTitle;
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadDOCX = async () => {
        const htmlContent = getHtmlContent();

        // Remove all id
        let filteredHtml = htmlContent.replaceAll(/data-id="[^"]*"/g, "");

        // Remove p inside table but keep the content
        const doc = new DOMParser().parseFromString(filteredHtml, "text/html");
        const tables = doc.querySelectorAll("table");
        tables.forEach(table => {
            table.querySelectorAll("p").forEach(p => {
                if (p.parentElement?.tagName === "TD" || p.parentElement?.tagName === "TH") {
                    // Replace <p> with its children (move content up)
                    while (p.firstChild) {
                        p.parentElement.insertBefore(p.firstChild, p);
                    }
                    p.remove();
                }
            });
        });

        // Convert to string
        filteredHtml = doc.documentElement.outerHTML;

        // Remains just body content
        filteredHtml = filteredHtml.replace(/<body[^>]*>([\s\S]*)<\/body>/, "$1");
        filteredHtml = filteredHtml.replace(/<html[^>]*>([\s\S]*)<\/html>/, "$1");
        filteredHtml = filteredHtml.replace(/<head[^>]*>([\s\S]*)<\/head>/, "$1");

        // Remove colgroup
        filteredHtml = filteredHtml.replace(/<colgroup[^>]*>[\s\S]*?<\/colgroup>/g, "");

        // Remove inline style min-width
        filteredHtml = filteredHtml.replace(/style="[^"]*min-width:[^;"]*;?"/g, "");
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
                                text="Download em DOCX"
                                onClick={handleDownloadDOCX}
                                iconPosition="left"
                                icon={<AiOutlineFileWord size={12} color={Theme.colors.black} />}
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
