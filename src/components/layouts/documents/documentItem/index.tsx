import { Button } from "@/components/features/button";
import { Menu } from "@/components/features/menu";
import { Skeleton } from "@/components/features/skeleton";
import { Typography } from "@/components/features/typography";
import { ModalDeleteDocument } from "@/components/layouts/modals/modalDeleteDocument";
import { Tooltip } from "@/components/ui/tooltip";
import { DocumentDataWithUser } from "@/repositories/documentAPI";
import { Theme } from "@/themes";
import { getShortElapsedTime } from "@/utils/date";
import html2canvas from "html2canvas";
import Image from "next/image";
import { ReactElement, useEffect, useState } from "react";
import { MdDeleteOutline, MdMoreHoriz, MdOutlineEdit } from "react-icons/md";

import { Content, Dot, ImageContainer, ProfileImage, Root, TitleContainer } from "./styles";

export interface IDocumentItemProps {
    model: DocumentDataWithUser;
    onClick: (publicCode: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

export const DocumentItem = ({
    model,
    onClick,
    onDelete,
    onEdit,
}: IDocumentItemProps): ReactElement => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [previewImg, setPreviewImg] = useState<string>("");

    useEffect(() => {
        const generateThumbnail = async () => {
            if (model.content) {
                const htmlContent = model.content;

                // Replace quick-chart with img
                const filteredHtml = htmlContent.replaceAll(
                    /<quick-chart[^>]*chartdata="([^"]+)"[^>]*width="([^"]+)"[^>]*height="([^"]+)"[^>]*><\/quick-chart>/g,
                    (match, chartData, width, height) => {
                        try {
                            const url = `https://quickchart.io/chart?c=${chartData}`;
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
    
                    p:empty::before {
                        content: " ";
                        display: inline-block;
                        height: 1.2em;
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

                const el = document.createElement("div");
                el.innerHTML = finalHtml;
                el.style.position = "absolute";
                el.style.width = "794px";
                el.style.height = "1123px";
                el.style.left = "-9999px";
                el.style.top = "-9999px";
                el.style.background = "white";
                el.style.paddingTop = "113.385826772px";
                el.style.paddingBottom = "75.590551181px";
                el.style.paddingLeft = "113.385826772px";
                el.style.paddingRight = "75.590551181px";

                document.body.appendChild(el);

                try {
                    const canvas = await html2canvas(el, { scale: 1 });
                    const img = canvas.toDataURL("image/png");
                    setPreviewImg(img);
                } finally {
                    document.body.removeChild(el);
                }
            }
        };

        generateThumbnail();
    }, [model.content]);

    return (
        <>
            <ModalDeleteDocument
                open={isDeleteModalOpen}
                setOpen={setIsDeleteModalOpen}
                onConfirmDelete={() => onDelete(model.id)}
            />

            <Root key={model.id} onClick={() => onClick(model.publicCode)}>
                <ImageContainer>
                    {previewImg ? (
                        <Image
                            src={previewImg}
                            alt="Document Thumbnail"
                            width={180}
                            height={120}
                            style={{
                                objectFit: "cover",
                                objectPosition: "top",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    ) : (
                        <Skeleton width={200} height={120} color="gray30" />
                    )}
                </ImageContainer>

                <Content>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Tooltip>
                            <Tooltip.Trigger>
                                <TitleContainer>
                                    <Typography
                                        tag="p"
                                        fontSize={{ xs: "fs75" }}
                                        color="black"
                                        fontWeight="medium"
                                    >
                                        {model.name || "Sem título"}
                                    </Typography>
                                </TitleContainer>
                            </Tooltip.Trigger>
                            <Tooltip.Content>{model.name || "Sem título"}</Tooltip.Content>
                        </Tooltip>

                        <Menu>
                            <Menu.Trigger>
                                <Button
                                    height="25px"
                                    width="25px"
                                    variant="tertiary"
                                    padding="0 0px"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <MdMoreHoriz size={16} color={Theme.colors.gray80} />
                                </Button>
                            </Menu.Trigger>

                            <Menu.Content align="center">
                                <Menu.Item
                                    text="Excluir Documento"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setIsDeleteModalOpen(true);
                                    }}
                                    iconPosition="left"
                                    icon={<MdDeleteOutline size={14} color={Theme.colors.black} />}
                                />

                                <Menu.Item
                                    text="Editar Documento"
                                    onClick={e => {
                                        e.stopPropagation();
                                        onEdit(model.id);
                                    }}
                                    iconPosition="left"
                                    icon={<MdOutlineEdit size={14} color={Theme.colors.black} />}
                                />
                            </Menu.Content>
                        </Menu>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: 5,
                            alignItems: "center",
                        }}
                    >
                        <ProfileImage>
                            <Image
                                src={`https://ui-avatars.com/api/?background=random&name=${model.user.username}&bold=true`}
                                alt="organization avatar"
                                width={16}
                                height={15}
                            />
                        </ProfileImage>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                                gap: 5,
                            }}
                        >
                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs50" }}
                                color="gray80"
                                fontWeight="regular"
                            >
                                {model.user.username}
                            </Typography>

                            <Dot />

                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs50" }}
                                color="gray80"
                                fontWeight="regular"
                            >
                                {getShortElapsedTime(model.createdAt)}
                            </Typography>
                        </div>
                    </div>
                </Content>
            </Root>
        </>
    );
};
