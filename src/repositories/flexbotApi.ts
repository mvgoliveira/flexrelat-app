type Content = {
    id: string;
    type: "text" | "image" | "chart" | "table";
    html: string;
    position: number;
};

export type AiChange = {
    id: string;
    type: "add" | "remove" | "update";
    old_content: Content;
    new_content: Content;
    created_at: string;
};

export type Message = {
    id: string;
    sender_id: string;
    related_id: string;
    related_type: "document" | "model";
    text: string;
    created_at: string;
    changes: AiChange[];
};

export const getMessagesByChatId = async (
    related_id: string,
    related_type: "document" | "model"
): Promise<Message[]> => {
    console.log(`Fetching messages for related ID: ${related_id} ${related_type}`);

    return [
        {
            id: "bdbf1f85-fd07-40b7-8427-42d53eff573f",
            text: "Gostaria de adicionar um novo elemento ao meu relatório.",
            sender_id: "7c51f6db-107e-46c5-a6e1-b8063dc0e57b",
            related_id: "475e8658-4866-4012-b990-cd577eb71dd1",
            related_type: "document",
            created_at: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
            changes: [],
        },
        {
            id: "2e2ebdb1f-d2c2-4cb5-9c00-cb6df5b1290334",
            text: "Claro! Que tipo de elemento você gostaria de adicionar?",
            sender_id: "flexbot",
            related_id: "475e8658-4866-4012-b990-cd577eb71dd1",
            related_type: "document",
            created_at: new Date(Date.now() - 19 * 60 * 1000).toISOString(),
            changes: [],
        },
        {
            id: "3f3f3f3f-3f3f-4f4f-5f5f-6f6f6f6f6f6",
            text: "Gostaria de adicionar um gráfico de barras com os dados de vendas do último trimestre.",
            sender_id: "7c51f6db-107e-46c5-a6e1-b8063dc0e57b",
            related_id: "475e8658-4866-4012-b990-cd577eb71dd1",
            related_type: "document",
            created_at: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
            changes: [],
        },
        {
            id: "4f4f4f4f-4f4f-5f5f-6f6f-7f7f7f7f7f7",
            text: "Entendi! Vou adicionar o gráfico de barras com os dados de vendas do último trimestre.",
            sender_id: "flexbot",
            related_id: "475e8658-4866-4012-b990-cd577eb71dd1",
            related_type: "document",
            created_at: new Date(Date.now() - 17 * 60 * 1000).toISOString(),
            changes: [
                {
                    id: "dbd57046-c6b7-4d47-87fe-e08cae528894",
                    type: "add",
                    old_content: {
                        id: "oldContent1",
                        type: "text",
                        html: "<p>Texto antigo</p>",
                        position: 1,
                    },
                    new_content: {
                        id: "newContent1",
                        type: "chart",
                        html: "<div>Gráfico de barras</div>",
                        position: 1,
                    },
                    created_at: new Date(Date.now() - 16 * 60 * 1000).toISOString(),
                },
            ],
        },
    ];
};
