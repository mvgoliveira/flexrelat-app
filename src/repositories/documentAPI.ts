import { client } from "@/services/client";

const PREFIX = "/documents";

export type DocumentData = {
    id: string;
    name: string | null;
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

interface ICreateDocument {
    name?: string;
    content?: string;
}

export const createDocument = async ({ name, content }: ICreateDocument): Promise<DocumentData> => {
    const { data } = await client.post<DocumentData>(`${PREFIX}`, {
        name,
        content,
    });
    return data;
};

export type DocumentDataWithUser = {
    id: string;
    name: string | null;
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

export const getOwnDocuments = async (): Promise<DocumentDataWithUser[]> => {
    const { data } = await client.get<DocumentDataWithUser[]>(`${PREFIX}/user`);
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

export const deleteDocument = async (documentId: string): Promise<void> => {
    await client.delete(`${PREFIX}/${documentId}`);
};
