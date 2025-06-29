export type ComponentChange = {
    type: "add" | "remove" | "update";
    elementId: string;
    text: string;
    properties?: Record<string, any>;
    timestamp: string;
};

export type Message = {
    text: string;
    timestamp: string;
    sender: "user" | "bot";
    changes?: ComponentChange[];
};
