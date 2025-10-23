import { client } from "@/services/client";

const PREFIX = "/documents";

export type DocumentData = {
    id: string;
    name: string;
    isPublic: boolean;
    publicCode: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

export const getDocumentByPublicCode = async (publicCode: string): Promise<DocumentData> => {
    const { data } = await client.get<DocumentData>(`${PREFIX}/public/${publicCode}`);
    return data;
};

export type UpdateDocumentData = {
    id: string;
    name: string;
    content: string;
    updatedAt: string;
};

export const updateDocumentTitle = async (
    documentId: string,
    title: string
): Promise<UpdateDocumentData> => {
    const { data } = await client.patch<UpdateDocumentData>(`${PREFIX}/${documentId}`, {
        name: title,
    });

    return data;
};

export const updateDocumentContent = async (
    documentId: string,
    content: string
): Promise<UpdateDocumentData> => {
    const { data } = await client.patch<UpdateDocumentData>(`${PREFIX}/${documentId}`, {
        content,
    });

    return data;
};
