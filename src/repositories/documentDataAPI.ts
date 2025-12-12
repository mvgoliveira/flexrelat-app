import { client } from "@/services/client";

const PREFIX = "/documents-data";

export type DocumentDataType = "csv" | "xls" | "xlsx" | "pdf" | "text";

export type DocumentDataResponse = {
    id: string;
    name: string;
    value: {
        data: string | object;
    };
    type: DocumentDataType;
};

export const getDataByDocument = async (documentId: string): Promise<DocumentDataResponse[]> => {
    const { data } = await client.get<DocumentDataResponse[]>(`${PREFIX}/${documentId}`);
    return data;
};

export const getDataContent = async (dataId: string): Promise<string | object> => {
    const { data } = await client.get<DocumentDataResponse>(`${PREFIX}/content/${dataId}`);
    return data.value.data;
};

export const createDocumentData = async (
    documentId: string,
    name: string,
    value: string | object,
    type: DocumentDataType
): Promise<DocumentDataResponse> => {
    const { data } = await client.post<DocumentDataResponse>(`${PREFIX}`, {
        document_id: documentId,
        name,
        value: { data: value },
        type,
    });
    return data;
};

export const updateDocumentData = async (
    dataId: string,
    value: string | object
): Promise<DocumentDataResponse> => {
    const { data } = await client.patch<DocumentDataResponse>(`${PREFIX}/${dataId}`, {
        value: { data: value },
    });
    return data;
};

export const deleteDocumentData = async (dataId: string): Promise<void> => {
    await client.delete(`${PREFIX}/${dataId}`);
};

interface IParseFileResponse {
    text: string;
    fileType: DocumentDataType;
}

export const parseFileContent = async (file: File): Promise<IParseFileResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await client.post<IParseFileResponse>(`${PREFIX}/parser`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data;
};
