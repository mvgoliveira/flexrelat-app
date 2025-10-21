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

interface IUpdateDocumentTitleResponse {
    id: string;
    title: string;
}

export const updateDocumentTitle = async (
    documentId: string,
    title: string
): Promise<IUpdateDocumentTitleResponse> => {
    return {
        id: documentId,
        title: title,
    };
};

export const updateDocumentContent = async (
    documentId: string,
    content: string
): Promise<{ id: string; content: string }> => {
    console.log("[TEST] Updating document content");

    return {
        id: documentId,
        content: content,
    };
};
