export type DocumentData = {
    id: string;
    user_id: string;
    name: string;
    is_public: boolean;
    public_code: string;
    created_at: string;
    updated_at: string;
};

export const getDocumentByDocumentId = async (documentId: string): Promise<DocumentData> => {
    return {
        id: documentId,
        user_id: "user123",
        name: "Sample Document",
        is_public: false,
        public_code: "ABCD1234",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
};
