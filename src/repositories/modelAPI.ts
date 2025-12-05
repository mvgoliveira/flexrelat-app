import { client } from "@/services/client";

const PREFIX = "/models";

export type ModelData = {
    id: string;
    name: string;
    userId: string;
    description: string;
    keywords: string[] | null;
    isPublic: boolean;
    publicCode: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

export const getModelByPublicCode = async (publicCode: string): Promise<ModelData> => {
    const { data } = await client.get<ModelData>(`${PREFIX}/public/${publicCode}`);
    return data;
};

interface ICreateModelProps {
    documentId: string;
    name: string;
    description: string;
    withAi: boolean;
}

export const createModel = async ({
    documentId,
    name,
    description,
    withAi,
}: ICreateModelProps): Promise<ModelData> => {
    const { data } = await client.post<ModelData>(`${PREFIX}`, {
        document_id: documentId,
        name,
        description,
        ai_generation: withAi,
    });
    return data;
};

export type ModelDataWithUser = {
    id: string;
    name: string;
    description: string | null;
    keywords: string[] | null;
    isPublic: boolean;
    publicCode: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
};

export const getOwnModels = async (): Promise<ModelDataWithUser[]> => {
    const { data } = await client.get<ModelDataWithUser[]>(`${PREFIX}/user`);
    return data;
};

export type UpdateModelData = {
    id: string;
    name: string;
    content: string;
    updatedAt: string;
};

export const updateModelTitle = async (
    modelId: string,
    title: string
): Promise<UpdateModelData> => {
    const { data } = await client.patch<UpdateModelData>(`${PREFIX}/${modelId}`, {
        name: title,
    });

    return data;
};

export const updateModelContent = async (
    modelId: string,
    content: string
): Promise<UpdateModelData> => {
    const { data } = await client.patch<UpdateModelData>(`${PREFIX}/${modelId}`, {
        content,
    });

    return data;
};

export const deleteModel = async (modelId: string): Promise<void> => {
    await client.delete(`${PREFIX}/${modelId}`);
};
