import { AiChange, updateAiChangeStatus } from "@/repositories/changesApi";
import {
    DocumentData,
    getDocumentByDocumentId,
    updateDocumentContent,
} from "@/repositories/documentAPI";
import { getMessagesByChatId, Message } from "@/repositories/messageApi";
import { useQuery } from "@tanstack/react-query";
import { Editor } from "@tiptap/core";
import { useParams } from "next/navigation";
import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
} from "react";

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
    rejectChange: (change: AiChange) => void;
    loadingComponentId: string;
    updateLoadingComponentId: (componentId: string) => void;
    clearChange: (change: AiChange) => void;
    editor: Editor | null;
    setEditor: Dispatch<SetStateAction<Editor | null>>;
    getHtmlContent: () => string;
    refetchMessages: () => void;
    handleChangeDocumentContent: (newContent: string) => void;
};

const DocumentContext = createContext<DocumentContextType | null>(null);

export function DocumentProvider({ children }: { children: ReactNode }): React.ReactElement {
    const [editor, setEditor] = useState<Editor | null>(null);
    const { documentId } = useParams();
    const [changes, setChanges] = useState<AiChange[]>([]);
    const [selectedChanges, setSelectedChanges] = useState<AiChange[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loadingComponentId, setLoadingComponentId] = useState<string>("");

    const { status: messagesStatus, refetch: refetchMessages } = useQuery({
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

    const handleChangeDocumentContent = (newContent: string): void => {
        if (
            documentData?.content &&
            newContent &&
            documentData.content != newContent &&
            documentData.content !== ""
        ) {
            updateDocumentContent(documentId as string, newContent);
        }
    };

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
        if (!editor) return;

        setSelectedChanges(prevState =>
            prevState.filter(prevChange => prevChange.id !== change.id)
        );

        const newAiChange = await updateAiChangeStatus(change.id, "approved");

        const element = editor.view.dom.querySelector(`[data-id="${change.old_content.id}"]`);

        if (element) {
            const pos = editor.state.doc.resolve(editor.view.posAtDOM(element, 0)).before(1);
            const node = editor.state.doc.nodeAt(pos);

            if (node) {
                if (change.type === "update") {
                    editor
                        .chain()
                        .setNodeSelection(pos)
                        .insertContentAt(pos + node.nodeSize, change.new_content.html)
                        .setNodeSelection(pos + node.nodeSize)
                        .deleteRange({
                            from: pos,
                            to: pos + node.nodeSize,
                        })
                        .run();
                }
            }
        }

        setChanges(prevChanges =>
            prevChanges.map(prevChange => (prevChange.id === change.id ? newAiChange : prevChange))
        );

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
    };

    const clearChange = (change: AiChange): void => {
        setSelectedChanges(prevState =>
            prevState.filter(prevChange => prevChange.id !== change.id)
        );

        setMessages(prevMessages =>
            prevMessages.map(message => {
                if (message.id === change.message_id) {
                    return {
                        ...message,
                        changes: message.changes.filter(c => c.id !== change.id),
                    };
                }
                return message;
            })
        );
    };

    const rejectChange = async (change: AiChange): Promise<void> => {
        setSelectedChanges(prevState =>
            prevState.filter(prevChange => prevChange.id !== change.id)
        );

        const newAiChange = await updateAiChangeStatus(change.id, "rejected");

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
    };

    const updateLoadingComponentId = (componentId: string): void => {
        setLoadingComponentId(componentId);
    };

    const getHtmlContent = (): string => {
        if (!editor) return "";
        // const html = editor.getHTML();
        return editor.getHTML();
    };

    useEffect(() => {
        if (messages) {
            const allChanges = messages.flatMap(message => message.changes);
            if (allChanges !== changes) {
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
                rejectChange,
                loadingComponentId,
                updateLoadingComponentId,
                clearChange,
                editor,
                setEditor,
                getHtmlContent,
                refetchMessages,
                handleChangeDocumentContent,
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
