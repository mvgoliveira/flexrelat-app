type Content = {
    id: string;
    type: "text" | "heading" | "image" | "chart" | "table" | "bulletList" | "numberedList";
    html: string;
};

export type ChangesType = "add" | "remove" | "update";

export type AiChange = {
    id: string;
    message_id: string;
    status: "pending" | "approved" | "rejected";
    type: ChangesType;
    text: string;
    old_content: Content;
    new_content: Content;
};

export type ComponentLoading = {
    id: string;
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
            text: "Gostaria de alterar um elemento do meu relatório.",
            sender_id: "7c51f6db-107e-46c5-a6e1-b8063dc0e57b",
            related_id: "475e8658-4866-4012-b990-cd577eb71dd1",
            related_type: "document",
            created_at: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
            changes: [],
        },
        {
            id: "2e2ebdb1f-d2c2-4cb5-9c00-cb6df5b1290334",
            text: "Claro! qual elemento você gostaria de alterar e qual vai ser a alteração?",
            sender_id: "flexbot",
            related_id: "475e8658-4866-4012-b990-cd577eb71dd1",
            related_type: "document",
            created_at: new Date(Date.now() - 19 * 60 * 1000).toISOString(),
            changes: [],
        },
        {
            id: "3f3f3f3f-3f3f-4f4f-5f5f-6f6f6f6f6f6",
            text: "Gostaria de alterar meu título para algo maior e com mais descrição.",
            sender_id: "7c51f6db-107e-46c5-a6e1-b8063dc0e57b",
            related_id: "475e8658-4866-4012-b990-cd577eb71dd1",
            related_type: "document",
            created_at: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
            changes: [],
        },
        {
            id: "4f4f4f4f-4f4f-5f5f-6f6f-7f7f7f7f7f7",
            text: "Entendi! Vou fazer a alteração do título.",
            sender_id: "flexbot",
            related_id: "475e8658-4866-4012-b990-cd577eb71dd1",
            related_type: "document",
            created_at: new Date(Date.now() - 17 * 60 * 1000).toISOString(),
            changes: [
                {
                    id: "dbd57046-c6b7-4d47-87fe-e08cae528894",
                    message_id: "4f4f4f4f-4f4f-5f5f-6f6f-7f7f7f7f7f7",
                    status: "pending",
                    type: "update",
                    text: "Alterando o título para um mais descritivo.",
                    old_content: {
                        id: "62e714dae9",
                        type: "text",
                        html: "<h1 data-id='62e714dae9' class='change-remove'>Você já conferiu nossas tabelas? Elas são impressionantes!</h1>",
                    },
                    new_content: {
                        id: "52e714dae1",
                        type: "chart",
                        html: "<h1>Você já conferiu nossas tabelas? Elas são impressionantes! Desenvolvidas com precisão e elegância, oferecem tanto funcionalidade quanto estilo à sua interface.</h1>",
                    },
                },
            ],
        },
    ];
};

export const updateAiChangeStatus = async (
    changeId: string,
    status: "pending" | "approved" | "rejected"
): Promise<AiChange> => {
    console.log(`Updating change status for ID: ${changeId} to ${status}`);

    // Simulate an API call to update the change status
    return {
        id: changeId,
        message_id: "4f4f4f4f-4f4f-5f5f-6f6f-7f7f7f7f7f7",
        status: status,
        type: "update",
        text: "Alteração de título aprovada.",
        old_content: {
            id: "62e714dae9",
            type: "text",
            html: "<h1 data-id='62e714dae9' class='change-remove'>Você já conferiu nossas tabelas? Elas são impressionantes!</h1>",
        },
        new_content: {
            id: "52e714dae1",
            type: "chart",
            html: "<h1>Você já conferiu nossas tabelas? Elas são impressionantes! Desenvolvidas com precisão e elegância, oferecem tanto funcionalidade quanto estilo à sua interface.</h1>",
        },
    };
};

export const removeAiChange = async (changeId: string): Promise<void> => {
    console.log(`Removing AI change with ID: ${changeId}`);

    // Simulate an API call to remove the change
    // In a real application, you would make an API call here
    return Promise.resolve();
};

export const getMakeLonger = async (content: string): Promise<string> => {
    console.log(`Generating longer content for: ${content}`);

    const html = `
            <ul>
                <li>
                    <p>
                        Fully customizable tables with structured layouts, supporting multiple rows, individual cells, and optional headers for better data organization and readability.
                    </p>
                </li>
                <li>
                    <p>
                        Includes advanced table features like <code>colgroup</code> for grouping columns and <code>rowspan</code> to allow cells to span across multiple rows, enhancing table flexibility.
                    </p>
                </li>
                <li>
                    <p>
                        Support for resizable columns, giving users the ability to dynamically adjust widths for a better viewing experience and improved content control.
                    </p>
                </li>
            </ul>
        `;

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(html);
        }, 5000);
    });
};
