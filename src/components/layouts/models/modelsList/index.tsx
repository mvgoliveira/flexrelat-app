import { Typography } from "@/components/features/typography";
import { deleteModel, ModelDataWithUser, getOwnModels } from "@/repositories/modelAPI";
import { Theme } from "@/themes";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";
import { MdArrowDownward, MdOutlineArrowUpward, MdOutlineDocumentScanner } from "react-icons/md";

import { ModelItem } from "../modelItem";
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

interface IModelsListProps {
    onModelClick: (publicCode: string) => void;
}

export const ModelsList = ({ onModelClick }: IModelsListProps): ReactElement => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [orderedModels, setOrderedModels] = useState<ModelDataWithUser[]>([]);
    const [orderElement, setOrderElement] = useState<"name" | "createdAt" | "updatedAt" | null>(
        null
    );
    const [order, setOrder] = useState<"desc" | "asc">("desc");

    const { status: status, data: models } = useQuery({
        queryKey: ["get_own_models"],
        queryFn: async (): Promise<ModelDataWithUser[]> => {
            const response: ModelDataWithUser[] = await getOwnModels();
            return response;
        },
        refetchInterval: 5 * 60 * 1000,
    });

    const handleDelete = async (modelId: string) => {
        const oldModelsData = orderedModels;

        try {
            setOrderedModels(prevModels => prevModels.filter(model => model.id !== modelId));

            await deleteModel(modelId);
        } catch (error) {
            setOrderedModels(oldModelsData);
        }
    };

    const handleEditModel = (modelId: string) => {
        console.log("handleEditModel", modelId);
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
        if (!models) {
            setOrderedModels([]);
            return;
        }

        if (!orderElement) {
            setOrderedModels(models);
            return;
        }

        const sorted = [...models].sort((a, b) => {
            let comparison = 0;

            if (orderElement === "name") {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                comparison = nameA.localeCompare(nameB);
            } else if (orderElement === "createdAt") {
                comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else if (orderElement === "updatedAt") {
                comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
            }

            return order === "desc" ? comparison : -comparison;
        });

        setOrderedModels(sorted);
    }, [models, orderElement, order]);

    return (
        <Root>
            <Typography tag="h2" fontSize={{ xs: "fs75" }} color="black" fontWeight="medium">
                Arquivos pessoais
            </Typography>

            <TableContainer>
                {status === "success" && orderedModels.length > 0 ? (
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
                            {orderedModels.map(model => (
                                <ModelItem
                                    key={`model-list-item-${model.id}`}
                                    model={model}
                                    onClick={onModelClick}
                                    onDelete={handleDelete}
                                    onEdit={handleEditModel}
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
                            Nenhum modelo encontrado
                        </Typography>
                    </EmptyState>
                )}
            </TableContainer>
        </Root>
    );
};
