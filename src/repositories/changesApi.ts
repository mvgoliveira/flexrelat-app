import { client } from "@/services/client";

const PREFIX = "/changes";

type Content = {
    id: string;
    type: "text" | "heading" | "image" | "chart" | "table" | "bulletList" | "numberedList";
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
    console.log(`Updating change status for ID: ${changeId} to ${status}`);

    if (status === "approved") {
        return {
            id: changeId,
            message_id: "4f4f4f4f-4f4f-5f5f-6f6f-7f7f7f7f7f7",
            status: status,
            type: "update",
            text: "Alteração de título aprovada.",
            old_content: {
                id: "62e714dae9",
                type: "text",
                html: `<h4 data-id='62e714dae9' class='change-remove'><span style="font-size: 18pt">Resumo</span></h4>`,
            },
            new_content: {
                id: "",
                type: "text",
                html: `<h4 style="text-align: center"><span style="font-size: 18pt">Resumo Geral do Relatório</span></h4>`,
            },
        };
    }

    return {
        id: changeId,
        message_id: "4f4f4f4f-4f4f-5f5f-6f6f-7f7f7f7f7f7",
        status: status,
        type: "update",
        text: "Alteração de título reprovada.",
        old_content: {
            id: "62e714dae9",
            type: "text",
            html: `<h4 data-id='62e714dae9' class='change-remove'><span style="font-size: 18pt">Resumo</span></h4>`,
        },
        new_content: {
            id: "",
            type: "text",
            html: `<h4 style="text-align: center"><span style="font-size: 18pt">Resumo Geral do Relatório</span></h4>`,
        },
    };
};

export const getMoreText = async (content: string): Promise<string> => {
    const { data } = await client.post(`${PREFIX}/more-text`, { content });
    return data.data;
};

export const getLessText = async (content: string): Promise<string> => {
    const { data } = await client.post(`${PREFIX}/less-text`, { content });
    return data.data;
};

export const getOrthographyFixed = async (content: string): Promise<string> => {
    const { data } = await client.post(`${PREFIX}/fix-orthography`, { content });
    return data.data;
};

export const getImproveText = async (content: string): Promise<string> => {
    const { data } = await client.post(`${PREFIX}/improve-text`, { content });
    return data.data;
};
