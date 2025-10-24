import { client } from "@/services/client";

import { AiChange } from "./changesAPI";

const PREFIX = "/messages";

export type Message = {
    id: string;
    sender_id: string;
    related_id: string;
    related_type: "document" | "model";
    text: string;
    created_at: string;
    changes: AiChange[];
};

export const getMessagesByRelatedId = async (
    relatedId: string,
    relatedType: "documents" | "models"
): Promise<Message[]> => {
    const { data } = await client.get<Message[]>(`${PREFIX}/${relatedType}/${relatedId}`);
    return data;
};

export const sendMessage = async (
    relatedId: string,
    relatedType: "documents" | "models",
    text: string
): Promise<Message> => {
    const { data } = await client.post<Message>(`${PREFIX}`, {
        relatedId,
        relatedType,
        text,
    });

    return data;
};
