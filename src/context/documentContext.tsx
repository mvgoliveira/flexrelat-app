import { DocumentData, getDocumentByDocumentId } from "@/repositories/documentAPI";
import {
    AiChange,
    getMessagesByChatId,
    Message,
    updateAiChangeStatus,
} from "@/repositories/flexbotApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

type Status = "error" | "success" | "pending";

type DocumentContextType = {
    messages: Message[] | undefined;
    messagesStatus: Status;
    changes: AiChange[];
    selectedChanges: AiChange[];
    updateSelectedChange: (change: AiChange) => void;
    documentData: DocumentData | undefined;
    documentStatus: Status;
    approveChange: (change: AiChange) => void;
};

const DocumentContext = createContext<DocumentContextType | null>(null);

export function DocumentProvider({ children }: { children: ReactNode }): React.ReactElement {
    const { documentId } = useParams();
    const [changes, setChanges] = useState<AiChange[]>([]);
    const [selectedChanges, setSelectedChanges] = useState<AiChange[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);

    const { status: messagesStatus } = useQuery({
        queryKey: ["get_ai_messages", documentId],
        queryFn: async (): Promise<Message[]> => {
            const response: Message[] = await getMessagesByChatId(documentId as string, "document");
            setMessages(response);
            return response;
        },
    });

    const { status: documentStatus, data: documentData } = useQuery({
        queryKey: ["get_document_data", documentId],
        queryFn: async (): Promise<DocumentData> => {
            const response: DocumentData = await getDocumentByDocumentId(documentId as string);
            return response;
        },
    });

    const updateSelectedChange = (change: AiChange): void => {
        if (change) {
            const existingChange = selectedChanges.find(prevChange => prevChange.id === change.id);

            if (existingChange) {
                setSelectedChanges(
                    selectedChanges.filter(prevChange => prevChange.id !== change.id)
                );
            } else {
                setSelectedChanges(prevState => [...prevState, change]);
            }
        }
    };

    const approveChange = async (change: AiChange): Promise<void> => {
        setSelectedChanges(selectedChanges.filter(prevChange => prevChange.id !== change.id));

        const newAiChange = await updateAiChangeStatus(change.id, "approved");

        setMessages(prevMessages =>
            prevMessages.map(message => {
                if (message.id === change.message_id) {
                    return {
                        ...message,
                        changes: message.changes.map(c => (c.id === change.id ? newAiChange : c)),
                    };
                }
                return message;
            })
        );

        setSelectedChanges(prevState =>
            prevState.filter(prevChange => prevChange.id !== change.id)
        );
    };

    useEffect(() => {
        if (messages) {
            const allChanges = messages.flatMap(message => message.changes);
            if (allChanges !== changes) {
                console.log("Setting changes", allChanges);
                setChanges(allChanges);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    return (
        <DocumentContext.Provider
            value={{
                changes,
                messages,
                messagesStatus,
                selectedChanges,
                documentData,
                documentStatus,
                updateSelectedChange,
                approveChange,
            }}
        >
            {children}
        </DocumentContext.Provider>
    );
}

export function useDocumentContext(): DocumentContextType {
    const context = useContext(DocumentContext);

    if (!context) {
        throw new Error("useDocumentContext deve ser usado dentro de DocumentProvider");
    }

    return context;
}
