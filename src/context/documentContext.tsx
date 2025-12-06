import { AiChange, ChangesType, updateAiChangeStatus } from "@/repositories/changesAPI";
import {
    DocumentData,
    getDocumentByPublicCode,
    updateDocumentContent,
} from "@/repositories/documentAPI";
import { getMessagesByRelatedId, Message } from "@/repositories/messageAPI";
import { User } from "@/repositories/userAPI";
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
    selectedChange: AiChange | null;
    updateSelectedChange: (change: AiChange) => void;
    documentData: DocumentData | undefined;
    getDocumentStatus: Status;
    approveChange: (change: AiChange) => void;
    rejectChange: (change: AiChange) => void;
    loadingComponentId: string;
    updateLoadingComponentId: (componentId: string) => void;
    clearChange: (change: AiChange) => void;
    editor: Editor | null;
    setEditor: Dispatch<SetStateAction<Editor | null>>;
    getHtmlContent: () => string;
    handleChangeDocumentContent: (newContent: string) => Promise<void>;
    setMessages: Dispatch<SetStateAction<Message[]>>;
    authenticatedUser: User | null;
    setAuthenticatedUser: Dispatch<SetStateAction<User | null>>;
    selectedChangeType: ChangesType | null;
    setSelectedChangeType: Dispatch<SetStateAction<ChangesType | null>>;
};

const DocumentContext = createContext<DocumentContextType | null>(null);

export function DocumentProvider({ children }: { children: ReactNode }): React.ReactElement {
    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

    const [editor, setEditor] = useState<Editor | null>(null);
    const { publicCode } = useParams();
    const [changes, setChanges] = useState<AiChange[]>([]);
    const [selectedChange, setSelectedChange] = useState<AiChange | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loadingComponentId, setLoadingComponentId] = useState<string>("");
    const [selectedChangeType, setSelectedChangeType] = useState<ChangesType | null>(null);

    const { status: getDocumentStatus, data: documentData } = useQuery({
        queryKey: ["get_document_data", publicCode],
        retry: false,
        queryFn: async (): Promise<DocumentData> => {
            const response: DocumentData = await getDocumentByPublicCode(publicCode as string);
            return response;
        },
    });

    const { status: messagesStatus } = useQuery({
        queryKey: ["get_ai_messages", documentData?.id],
        retry: false,
        queryFn: async (): Promise<Message[]> => {
            if (!documentData) return [];

            const response: Message[] = await getMessagesByRelatedId(documentData.id, "documents");
            setMessages(response);
            return response;
        },
    });

    const handleChangeDocumentContent = async (newContent: string): Promise<void> => {
        if (
            documentData?.content &&
            newContent &&
            documentData.content != newContent &&
            documentData.content !== ""
        ) {
            await updateDocumentContent(documentData.id, newContent);
        }
    };

    const updateSelectedChange = (change: AiChange): void => {
        if (change) {
            if (selectedChange?.id === change.id) {
                setSelectedChange(null);
            } else {
                if (selectedChange && editor) {
                    const oldElement = editor.view.dom.querySelector(
                        `[data-id="${selectedChange.old_content.id}"]`
                    );

                    if (oldElement) {
                        const oldPos = editor.state.doc
                            .resolve(editor.view.posAtDOM(oldElement, 0))
                            .before(1);

                        const oldNode = editor.state.doc.nodeAt(oldPos);

                        if (oldNode) {
                            const oldElementTypeName = oldNode.type.name;

                            if (oldNode.attrs["class"] === "change-remove") {
                                editor
                                    .chain()
                                    .setNodeSelection(oldPos)
                                    .updateAttributes(oldElementTypeName, {
                                        class: "",
                                    })
                                    .setMeta("addToHistory", false)
                                    .run();
                            }

                            editor.state.doc.descendants((node, pos) => {
                                if (node.attrs["class"] === "change-add") {
                                    editor
                                        .chain()
                                        .deleteRange({
                                            from: pos,
                                            to: pos + node.nodeSize,
                                        })
                                        .setMeta("addToHistory", false)
                                        .run();
                                }
                            });
                        }
                    }
                }

                setSelectedChange(change);
            }
        }
    };

    const clearChange = (change: AiChange): void => {
        // Se a mudança que está sendo limpa é a selecionada, desseleciona
        if (selectedChange?.id === change.id) {
            setSelectedChange(null);
        }

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

    const approveChange = async (change: AiChange): Promise<void> => {
        if (!editor) return;

        // Se a mudança aprovada é a selecionada, desseleciona
        if (selectedChange?.id === change.id) {
            setSelectedChange(null);
        }

        const oldMessages = messages;

        setMessages(prevMessages =>
            prevMessages.map(message => {
                if (message.id === change.message_id) {
                    return {
                        ...message,
                        changes: message.changes.map(c =>
                            c.id === change.id ? { ...c, status: "approved" } : c
                        ),
                    };
                }
                return message;
            })
        );

        setChanges(prevChanges =>
            prevChanges.map(prevChange =>
                prevChange.id === change.id ? { ...prevChange, status: "approved" } : prevChange
            )
        );

        const element = editor.view.dom.querySelector(`[data-id="${change.old_content.id}"]`);

        if (element) {
            const pos = editor.state.doc.resolve(editor.view.posAtDOM(element, 0)).before(1);
            const node = editor.state.doc.nodeAt(pos);

            if (node) {
                const elementTypeName = node.type.name;

                if (change.type === "update") {
                    editor
                        .chain()
                        .setNodeSelection(pos)
                        .updateAttributes(elementTypeName, {
                            class: "",
                        })
                        .setMeta("addToHistory", false)
                        .run();

                    const nextPos = pos + node.nodeSize;
                    const nextNode = editor.state.doc.nodeAt(nextPos);

                    if (nextNode && nextNode.attrs["class"] === "change-add") {
                        const nextNodeType = nextNode.type.name;

                        editor
                            .chain()
                            .setNodeSelection(nextPos)
                            .updateAttributes(nextNodeType, {
                                class: "",
                            })
                            .setMeta("addToHistory", false)
                            .run();

                        editor
                            .chain()
                            .deleteRange({
                                from: nextPos,
                                to: nextPos + nextNode.nodeSize,
                            })
                            .setMeta("addToHistory", false)
                            .run();
                    }

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

                if (change.type === "delete") {
                    // Remove a classe "change-remove" antes de deletar
                    editor
                        .chain()
                        .setNodeSelection(pos)
                        .updateAttributes(elementTypeName, {
                            class: "",
                        })
                        .setMeta("addToHistory", false)
                        .run();

                    editor
                        .chain()
                        .deleteRange({
                            from: pos,
                            to: pos + node.nodeSize,
                        })
                        .run();
                }

                if (change.type === "create") {
                    const nodeType = node.type.name;
                    const insertPos = pos + node.nodeSize;

                    editor
                        .chain()
                        .setNodeSelection(insertPos)
                        .setMeta("addToHistory", false)
                        .updateAttributes(nodeType, {
                            class: "",
                        })
                        .insertContentAt(insertPos, change.new_content.html)
                        .run();
                }

                try {
                    await updateAiChangeStatus(change.id, "approved");
                } catch (error) {
                    setMessages(oldMessages);
                }
            }
        }
    };

    const rejectChange = async (change: AiChange): Promise<void> => {
        // Se a mudança rejeitada é a selecionada, desseleciona
        if (selectedChange?.id === change.id) {
            setSelectedChange(null);
        }

        const oldMessages = messages;

        setMessages(prevMessages =>
            prevMessages.map(message => {
                if (message.id === change.message_id) {
                    return {
                        ...message,
                        changes: message.changes.map(c =>
                            c.id === change.id ? { ...c, status: "rejected" } : c
                        ),
                    };
                }
                return message;
            })
        );

        try {
            await updateAiChangeStatus(change.id, "rejected");
        } catch (error) {
            setMessages(oldMessages);
        }
    };

    const updateLoadingComponentId = (componentId: string): void => {
        setLoadingComponentId(componentId);
    };

    const getHtmlContent = (): string => {
        if (!editor) return "";
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
                selectedChange,
                documentData,
                getDocumentStatus,
                updateSelectedChange,
                approveChange,
                rejectChange,
                loadingComponentId,
                updateLoadingComponentId,
                clearChange,
                editor,
                setEditor,
                getHtmlContent,
                handleChangeDocumentContent,
                setMessages,
                authenticatedUser,
                setAuthenticatedUser,
                selectedChangeType,
                setSelectedChangeType,
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
