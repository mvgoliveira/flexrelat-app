import { SearchInput } from "@/components/features/searchInput";
import { Skeleton } from "@/components/features/skeleton";
import { Typography } from "@/components/features/typography";
import { deleteDocument, DocumentDataWithUser, getOwnDocuments } from "@/repositories/documentAPI";
import { Theme } from "@/themes";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { MdOutlineDocumentScanner } from "react-icons/md";

import { DocumentItem } from "../documentItem";
import { Root, EmptyState, Container, DocumentItemEmptyState } from "./styles";

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
    const [searchTerm, setSearchTerm] = useState<string>("");

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

    const updateURL = (sortBy: string, sortOrder: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sortBy", sortBy);
        params.set("sortOrder", sortOrder);
        router.push(`?${params.toString()}`, { scroll: false });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSort = (field: "name" | "createdAt" | "updatedAt") => {
        let newOrder: "asc" | "desc" = "desc";

        if (orderElement === field) {
            newOrder = order === "asc" ? "desc" : "asc";
        }

        setOrderElement(field);
        setOrder(newOrder);
        updateURL(field, newOrder);
    };

    const search = useMemo(
        () =>
            _.debounce(async (value: string) => {
                setSearchTerm(value.toLocaleLowerCase());
            }, 1000),
        []
    );

    const handleSearch = (value: string): void => {
        search(value);
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
                const nameA = (a.name || "Sem título").toLowerCase();
                const nameB = (b.name || "Sem título").toLowerCase();
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

    useEffect(() => {
        if (!documents) {
            setOrderedDocuments([]);
            return;
        }

        // if (!searchTerm) {
        //     // Se não há termo de busca, aplicar ordenação normal
        //     if (!orderElement) {
        //         setOrderedDocuments(documents);
        //         return;
        //     }

        //     const sorted = [...documents].sort((a, b) => {
        //         let comparison = 0;

        //         if (orderElement === "name") {
        //             const nameA = (a.name || "Sem título").toLowerCase();
        //             const nameB = (b.name || "Sem título").toLowerCase();
        //             comparison = nameA.localeCompare(nameB);
        //         } else if (orderElement === "createdAt") {
        //             comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        //         } else if (orderElement === "updatedAt") {
        //             comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        //         }

        //         return order === "desc" ? comparison : -comparison;
        //     });

        //     setOrderedDocuments(sorted);
        //     return;
        // }

        // Aplicar filtro de busca
        const filteredDocuments = documents.filter(document => {
            const name = document.name ? document.name.toLocaleLowerCase() : "sem título";
            return name.includes(searchTerm);
        });

        // Aplicar ordenação aos resultados filtrados
        // if (orderElement) {
        //     filteredDocuments = [...filteredDocuments].sort((a, b) => {
        //         let comparison = 0;

        //         if (orderElement === "name") {
        //             const nameA = (a.name || "Sem título").toLowerCase();
        //             const nameB = (b.name || "Sem título").toLowerCase();
        //             comparison = nameA.localeCompare(nameB);
        //         } else if (orderElement === "createdAt") {
        //             comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        //         } else if (orderElement === "updatedAt") {
        //             comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        //         }

        //         return order === "desc" ? comparison : -comparison;
        //     });
        // }

        setOrderedDocuments(filteredDocuments);
    }, [searchTerm, documents, orderElement, order]);

    return (
        <Root>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    height: 40,
                }}
            >
                <Typography tag="h2" fontSize={{ xs: "fs100" }} color="black" fontWeight="medium">
                    Seus Documentos
                </Typography>

                <div style={{ width: 200, height: 30 }}>
                    <SearchInput onChange={handleSearch} />
                </div>
            </div>

            <Container>
                {status === "pending" && (
                    <>
                        <DocumentItemEmptyState>
                            <Skeleton width="100%" height={200} color="gray20" />
                        </DocumentItemEmptyState>
                        <DocumentItemEmptyState>
                            <Skeleton width="100%" height={200} color="gray20" />
                        </DocumentItemEmptyState>
                        <DocumentItemEmptyState>
                            <Skeleton width="100%" height={200} color="gray20" />
                        </DocumentItemEmptyState>
                        <DocumentItemEmptyState>
                            <Skeleton width="100%" height={200} color="gray20" />
                        </DocumentItemEmptyState>
                        <DocumentItemEmptyState>
                            <Skeleton width="100%" height={200} color="gray20" />
                        </DocumentItemEmptyState>
                        <DocumentItemEmptyState>
                            <Skeleton width="100%" height={200} color="gray20" />
                        </DocumentItemEmptyState>
                        <DocumentItemEmptyState>
                            <Skeleton width="100%" height={200} color="gray20" />
                        </DocumentItemEmptyState>
                        <DocumentItemEmptyState>
                            <Skeleton width="100%" height={200} color="gray20" />
                        </DocumentItemEmptyState>
                    </>
                )}

                {status === "success" &&
                    orderedDocuments.length > 0 &&
                    orderedDocuments.map(model => (
                        <DocumentItem
                            key={model.id}
                            model={model}
                            onClick={() => onDocumentClick(model.publicCode)}
                            onDelete={() => handleDelete(model.id)}
                            onEdit={() => onDocumentClick(model.publicCode)}
                        />
                    ))}

                {status === "success" && orderedDocuments.length === 0 && (
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

                {status === "error" && (
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
            </Container>
        </Root>
    );
};
