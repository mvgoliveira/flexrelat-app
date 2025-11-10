import { client } from "@/services/client";

const PREFIX = "/changes";

type Content = {
    id: string;
    html: string;
};

export type ChangesType = "add" | "remove" | "update";

export type StatusType = "pending" | "approved" | "rejected";

export type AiChange = {
    id: string;
    message_id: string;
    status: StatusType;
    type: ChangesType;
    text: string;
    old_content: Content;
    new_content: Content;
};

export type ComponentLoading = {
    id: string;
};

export const updateAiChangeStatus = async (
    changeId: string,
    status: "approved" | "rejected"
): Promise<AiChange> => {
    const { data } = await client.patch<AiChange>(`${PREFIX}/update-status`, {
        id: changeId,
        status,
    });

    return data;
};

export const getChange = async (prompt: string): Promise<string> => {
    const { data } = await client.post(`${PREFIX}/request-change`, { prompt });
    console.log(data);
    return data;
};
