import { SearchInput } from "@/components/features/searchInput";
import { Skeleton } from "@/components/features/skeleton";
import { Typography } from "@/components/features/typography";
import { deleteModel, ModelDataWithUser } from "@/repositories/modelAPI";
import { Theme } from "@/themes";
import _ from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { MdOutlineDocumentScanner } from "react-icons/md";

import { ModelItem } from "../modelItem";
import { Root, EmptyState, Container, DocumentItemEmptyState } from "./styles";

interface IModelsListProps {
    onModelClick: (publicCode: string) => void;
    name: string;
    models: ModelDataWithUser[];
    status: "pending" | "success" | "error";
}

export const ModelsList = ({
    onModelClick,
    name,
    models,
    status,
}: IModelsListProps): ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [orderedModels, setOrderedModels] = useState<ModelDataWithUser[]>([]);
    const [orderElement, setOrderElement] = useState<"name" | "createdAt" | "updatedAt" | null>(
        null
    );
    const [order, setOrder] = useState<"desc" | "asc">("desc");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleDelete = async (modelId: string) => {
        const oldModelsData = orderedModels;

        try {
            setOrderedModels(prevModels => prevModels.filter(model => model.id !== modelId));

            await deleteModel(modelId);
        } catch (error) {
            setOrderedModels(oldModelsData);
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
        if (!models) {
            setOrderedModels([]);
            return;
        }

        // if (!searchTerm) {
        //     // Se não há termo de busca, aplicar ordenação normal
        //     if (!orderElement) {
        //         setOrderedDocuments(models);
        //         return;
        //     }

        //     const sorted = [...models].sort((a, b) => {
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
        const filteredDocuments = models.filter(document => {
            const title = document.name ? document.name.toLocaleLowerCase() : "sem título";
            return title.includes(searchTerm);
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

        setOrderedModels(filteredDocuments);
    }, [searchTerm, models, orderElement, order]);

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
                    {name}
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

                {status === "success" && orderedModels.length === 0 && (
                    <EmptyState>
                        <MdOutlineDocumentScanner size={18} color={Theme.colors.gray70} />

                        <Typography
                            tag="span"
                            fontSize={{ xs: "fs75" }}
                            color="gray70"
                            fontWeight="regular"
                        >
                            Nenhum modelo encontrado
                        </Typography>
                    </EmptyState>
                )}

                {status === "success" &&
                    orderedModels.length > 0 &&
                    orderedModels.map(model => (
                        <ModelItem
                            key={model.id}
                            model={model}
                            onClick={() => onModelClick(model.publicCode)}
                            onDelete={() => handleDelete(model.id)}
                            onEdit={() => onModelClick(model.publicCode)}
                        />
                    ))}

                {status === "error" && (
                    <EmptyState>
                        <MdOutlineDocumentScanner size={18} color={Theme.colors.gray70} />

                        <Typography
                            tag="span"
                            fontSize={{ xs: "fs75" }}
                            color="gray70"
                            fontWeight="regular"
                        >
                            Nenhum modelo encontrado
                        </Typography>
                    </EmptyState>
                )}
            </Container>
        </Root>
    );
};
