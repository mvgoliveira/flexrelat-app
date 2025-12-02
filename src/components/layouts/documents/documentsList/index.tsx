import { Typography } from "@/components/features/typography";
import { deleteDocument, DocumentDataWithUser, getOwnDocuments } from "@/repositories/documentAPI";
import { Theme } from "@/themes";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { MdArrowDownward, MdOutlineArrowUpward, MdOutlineDocumentScanner } from "react-icons/md";

import { DocumentItem } from "../documentItem";
import {
    Root,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableHeaderCell,
    EmptyState,
} from "./styles";

interface IDocumentsListProps {
    onDocumentClick: (publicCode: string) => void;
}

export const DocumentsList = ({ onDocumentClick }: IDocumentsListProps): ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [orderedDocuments, setOrderedDocuments] = useState<DocumentDataWithUser[]>([]);
    const [orderElement, setOrderElement] = useState<"name" | "createdAt" | "updatedAt" | null>(
        null
    );
    const [order, setOrder] = useState<"desc" | "asc">("desc");

    const { status: status, data: documents } = useQuery({
        queryKey: ["get_own_documents"],
        queryFn: async (): Promise<DocumentDataWithUser[]> => {
            const response: DocumentDataWithUser[] = await getOwnDocuments();
            return response;
        },
        refetchInterval: 5 * 60 * 1000,
    });

    const handleDelete = async (documentId: string) => {
        const oldDocumentsData = orderedDocuments;

        try {
            setOrderedDocuments(prevDocuments =>
                prevDocuments.filter(document => document.id !== documentId)
            );

            await deleteDocument(documentId);
        } catch (error) {
            setOrderedDocuments(oldDocumentsData);
        }
    };

    const handleEditDocument = (documentId: string) => {
        console.log("handleEditDocument", documentId);
        // Add download logic here
    };

    const updateURL = (sortBy: string, sortOrder: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sortBy", sortBy);
        params.set("sortOrder", sortOrder);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleSort = (field: "name" | "createdAt" | "updatedAt") => {
        let newOrder: "asc" | "desc" = "desc";

        if (orderElement === field) {
            newOrder = order === "asc" ? "desc" : "asc";
        }

        setOrderElement(field);
        setOrder(newOrder);
        updateURL(field, newOrder);
    };

    useEffect(() => {
        const sortBy = searchParams.get("sortBy") as "name" | "createdAt" | "updatedAt" | null;
        const sortOrder = searchParams.get("sortOrder") as "asc" | "desc" | null;

        if (sortBy && (sortBy === "name" || sortBy === "createdAt" || sortBy === "updatedAt")) {
            setOrderElement(sortBy);
        }

        if (sortOrder && (sortOrder === "asc" || sortOrder === "desc")) {
            setOrder(sortOrder);
        }
    }, [searchParams]);

    useEffect(() => {
        if (!documents) {
            setOrderedDocuments([]);
            return;
        }

        if (!orderElement) {
            setOrderedDocuments(documents);
            return;
        }

        const sorted = [...documents].sort((a, b) => {
            let comparison = 0;

            if (orderElement === "name") {
                const nameA = (a.name || "Relatório sem título").toLowerCase();
                const nameB = (b.name || "Relatório sem título").toLowerCase();
                comparison = nameA.localeCompare(nameB);
            } else if (orderElement === "createdAt") {
                comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else if (orderElement === "updatedAt") {
                comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
            }

            return order === "desc" ? comparison : -comparison;
        });

        setOrderedDocuments(sorted);
    }, [documents, orderElement, order]);

    return (
        <Root>
            <Typography tag="h2" fontSize={{ xs: "fs75" }} color="black" fontWeight="medium">
                Arquivos pessoais
            </Typography>

            <TableContainer>
                {status === "success" && orderedDocuments.length > 0 ? (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell
                                    onClick={() => handleSort("name")}
                                    onKeyDown={e => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            handleSort("name");
                                        }
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5,
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Typography
                                            tag="span"
                                            fontSize={{ xs: "fs75" }}
                                            color="gray80"
                                            fontWeight="regular"
                                        >
                                            Nome
                                        </Typography>

                                        {orderElement === "name" &&
                                            (order === "asc" ? (
                                                <MdOutlineArrowUpward color={Theme.colors.gray80} />
                                            ) : (
                                                <MdArrowDownward color={Theme.colors.gray80} />
                                            ))}
                                    </div>
                                </TableHeaderCell>

                                <TableHeaderCell>
                                    <Typography
                                        tag="span"
                                        fontSize={{ xs: "fs75" }}
                                        color="gray80"
                                        fontWeight="regular"
                                    >
                                        Autor
                                    </Typography>
                                </TableHeaderCell>

                                <TableHeaderCell
                                    centered
                                    onClick={() => handleSort("createdAt")}
                                    onKeyDown={e => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            handleSort("createdAt");
                                        }
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5,
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Typography
                                            tag="span"
                                            fontSize={{ xs: "fs75" }}
                                            color="gray80"
                                            fontWeight="regular"
                                        >
                                            Criado em
                                        </Typography>

                                        {orderElement === "createdAt" &&
                                            (order === "asc" ? (
                                                <MdOutlineArrowUpward color={Theme.colors.gray80} />
                                            ) : (
                                                <MdArrowDownward color={Theme.colors.gray80} />
                                            ))}
                                    </div>
                                </TableHeaderCell>

                                <TableHeaderCell
                                    centered
                                    onClick={() => handleSort("updatedAt")}
                                    onKeyDown={e => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            handleSort("updatedAt");
                                        }
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 5,
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Typography
                                            tag="span"
                                            fontSize={{ xs: "fs75" }}
                                            color="gray80"
                                            fontWeight="regular"
                                        >
                                            Atualizado em
                                        </Typography>

                                        {orderElement === "updatedAt" &&
                                            (order === "asc" ? (
                                                <MdOutlineArrowUpward color={Theme.colors.gray80} />
                                            ) : (
                                                <MdArrowDownward color={Theme.colors.gray80} />
                                            ))}
                                    </div>
                                </TableHeaderCell>

                                <TableHeaderCell centered maxWidth="100px">
                                    <Typography
                                        tag="span"
                                        fontSize={{ xs: "fs75" }}
                                        color="gray80"
                                        fontWeight="regular"
                                    >
                                        Ações
                                    </Typography>
                                </TableHeaderCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {orderedDocuments.map(document => (
                                <DocumentItem
                                    key={`document-list-item-${document.id}`}
                                    document={document}
                                    onClick={onDocumentClick}
                                    onDelete={handleDelete}
                                    onEdit={handleEditDocument}
                                />
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <EmptyState>
                        <MdOutlineDocumentScanner size={18} color={Theme.colors.gray70} />

                        <Typography
                            tag="span"
                            fontSize={{ xs: "fs75" }}
                            color="gray70"
                            fontWeight="regular"
                        >
                            Nenhum documento encontrado
                        </Typography>
                    </EmptyState>
                )}
            </TableContainer>
        </Root>
    );
};
