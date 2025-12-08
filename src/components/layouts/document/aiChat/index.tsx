import { Button } from "@/components/features/button";
import { Spinner } from "@/components/features/loading/spinner";
import { Menu } from "@/components/features/menu";
import { Skeleton } from "@/components/features/skeleton";
import { toastError } from "@/components/features/toast";
import { Typography } from "@/components/features/typography";
import { ModalClearMessages } from "@/components/layouts/modals/modalClearMessages";
import { ScrollArea } from "@/components/ui/scrollArea";
import { useDocumentContext } from "@/context/documentContext";
import { DocumentDataResponse, getDataByDocument } from "@/repositories/documentDataAPI";
import { clearMessagesByRelatedId, sendMessage } from "@/repositories/messageAPI";
import { Theme } from "@/themes";
import { useElementSize } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { ReactElement, useRef, useState, MouseEvent } from "react";
import { GrDocumentCsv, GrDocumentExcel, GrDocumentPdf, GrDocumentTxt } from "react-icons/gr";
import { HiOutlinePaperClip } from "react-icons/hi";
import { LuFileJson2 } from "react-icons/lu";
import { MdCheck, MdClose, MdDeleteOutline, MdSend } from "react-icons/md";
import { RiBarChartBoxAiLine, RiBrainLine, RiChatAiLine } from "react-icons/ri";
import { TbRobotOff } from "react-icons/tb";

import { AiChatAttachment } from "../aiAttachment";
import { ChatMessage } from "../chatMessage";
import {
    AiLoadingIconContainer,
    ChangesHeader,
    ChangesNumberContainer,
    Fallback,
    FloatAttachContainer,
    FloatIconContainer,
    IconChangeAnimation,
    IconChangeContainer,
    IconContainer,
    InputContainer,
    MessageInputContainer,
    MessagesContent,
    Root,
    SendButton,
    StyledSplitter,
    StyledSplitterPanel,
    StyledTextArea,
    TypingAnimation,
} from "./styles";

const DataBaseTypeIconMap = {
    pdf: <GrDocumentPdf size={9} color={Theme.colors.black} />,
    text: <GrDocumentTxt size={9} color={Theme.colors.black} />,
    csv: <GrDocumentCsv size={9} color={Theme.colors.black} />,
    json: <LuFileJson2 size={9} color={Theme.colors.black} />,
    xls: <GrDocumentExcel size={9} color={Theme.colors.black} />,
    xlsx: <GrDocumentExcel size={9} color={Theme.colors.black} />,
};

export const AiChat = (): ReactElement => {
    const {
        messagesStatus,
        messages,
        setMessages,
        changes,
        approveChange,
        rejectChange,
        documentData,
    } = useDocumentContext();

    const { ref: changesHeaderRef, height: changesHeaderHeight } = useElementSize();

    const [chatMessage, setChatMessage] = useState("");
    const [aiIsLoading, setAiIsLoading] = useState(false);
    const [activeAttachId, setActiveAttachId] = useState<string>("");
    const [selectedAttachments, setSelectedAttachments] = useState<DocumentDataResponse[]>([]);

    const [isClearModalOpen, setIsClearModalOpen] = useState<boolean>(false);

    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const attachContainerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);

    const { data: documentDataBase, refetch } = useQuery({
        queryKey: ["get_chat_document_data", documentData?.id],
        retry: false,
        queryFn: async (): Promise<DocumentDataResponse[]> => {
            if (!documentData?.id) return [];

            const response: DocumentDataResponse[] = await getDataByDocument(documentData.id);
            return response;
        },
    });

    if (messagesStatus === "pending") {
        return (
            <Fallback>
                <Spinner />
            </Fallback>
        );
    }

    if (messagesStatus === "error") {
        return (
            <Fallback>
                <TbRobotOff size={24} color={Theme.colors.gray50} />

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                        tag="span"
                        fontSize={{ xs: "fs50" }}
                        color="gray70"
                        fontWeight="semibold"
                    >
                        Chat com IA não está disponível.
                    </Typography>

                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs50" }}
                        color="gray60"
                        fontWeight="regular"
                        textAlign="center"
                    >
                        Tente novamente mais tarde.
                    </Typography>
                </div>
            </Fallback>
        );
    }

    const handleApproveAllChanges = () => {
        changes.forEach(change => {
            if (change.status === "pending") {
                approveChange(change);
            }
        });
    };

    const handleRejectAllChanges = () => {
        changes.forEach(change => {
            if (change.status === "pending") {
                rejectChange(change);
            }
        });
    };

    const handleSendMessage = async () => {
        if (chatMessage.trim().length > 0 && documentData) {
            try {
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        id: "temp-id-" + Date.now(),
                        sender_id: "current-user-id",
                        related_id: documentData.id,
                        related_type: "document",
                        text: chatMessage.trim(),
                        created_at: new Date().toISOString(),
                        changes: [],
                    },
                ]);

                setChatMessage("");

                setTimeout(() => {
                    const scrollElement = scrollAreaRef.current?.querySelector(
                        "[data-radix-scroll-area-viewport]"
                    );

                    if (scrollElement) {
                        scrollElement.scrollTo({
                            top: scrollElement.scrollHeight,
                            behavior: "smooth",
                        });
                    }
                }, 200);

                setAiIsLoading(true);

                const aiResponse = await sendMessage(
                    documentData.id,
                    "documents",
                    chatMessage.trim(),
                    selectedAttachments.map(attach => attach.value.data).join(", ")
                );

                setMessages(prevMessages => [...prevMessages, aiResponse]);
                setAiIsLoading(false);
            } catch (error) {
                console.error("Error sending message:", error);
                setAiIsLoading(false);
                toastError();
            }
        }
    };

    const handleClearMessages = async () => {
        if (documentData) {
            try {
                await clearMessagesByRelatedId(documentData.id, "documents");
                setIsClearModalOpen(false);
                setMessages([]);
            } catch (error) {
                console.error("Error clearing messages:", error);
                toastError();
            }
        }
    };

    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (attachContainerRef.current) {
            isDraggingRef.current = true;
            startXRef.current = e.pageX - attachContainerRef.current.offsetLeft;
            scrollLeftRef.current = attachContainerRef.current.scrollLeft;
        }
    };

    const handleMouseLeave = () => {
        isDraggingRef.current = false;
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current || !attachContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - attachContainerRef.current.offsetLeft;
        const walk = (x - startXRef.current) * 2;
        attachContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleChangeAttachActive = (id: string) => {
        if (activeAttachId === id) setActiveAttachId("");
        setActiveAttachId(id);
    };

    const handleRemoveAttach = (id: string) => {
        setSelectedAttachments(prev => prev.filter(item => item.id !== id));
    };

    const handleSelectAttach = (dataItem: DocumentDataResponse) => {
        setSelectedAttachments(prev => [...prev, dataItem]);
    };

    return (
        <Root>
            <ModalClearMessages
                open={isClearModalOpen}
                setOpen={setIsClearModalOpen}
                onClearMessages={handleClearMessages}
            />

            <ChangesHeader ref={changesHeaderRef}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <ChangesNumberContainer>
                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs50" }}
                                color="black"
                                fontWeight="regular"
                            >
                                {changes.filter(change => change.status === "pending").length}
                            </Typography>
                        </ChangesNumberContainer>

                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs75" }}
                            color="gray70"
                            fontWeight="regular"
                        >
                            Mudanças sem aprovação
                        </Typography>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", width: 20 }}>
                        <Button
                            height="20px"
                            variant="tertiary"
                            onClick={() => setIsClearModalOpen(true)}
                        >
                            <MdDeleteOutline size={14} color={Theme.colors.black} />
                        </Button>
                    </div>
                </div>

                {changes.filter(change => change.status === "pending").length > 0 && (
                    <div style={{ display: "flex", gap: 5 }}>
                        <Button
                            height="30px"
                            variant="secondary"
                            padding="0 10px"
                            onClick={handleApproveAllChanges}
                        >
                            <MdCheck size={12} color={Theme.colors.black} />

                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs50" }}
                                color="gray100"
                                fontWeight="regular"
                                textAlign="center"
                            >
                                Aprovar todas
                            </Typography>
                        </Button>

                        <Button
                            height="30px"
                            variant="secondary"
                            padding="0 10px"
                            onClick={handleRejectAllChanges}
                        >
                            <MdClose size={12} color={Theme.colors.black} />

                            <Typography
                                tag="p"
                                fontSize={{ xs: "fs50" }}
                                color="gray100"
                                fontWeight="regular"
                                textAlign="center"
                            >
                                Rejeitar todas
                            </Typography>
                        </Button>
                    </div>
                )}
            </ChangesHeader>

            <StyledSplitter layout="vertical" changesHeaderHeight={changesHeaderHeight}>
                <StyledSplitterPanel>
                    <ScrollArea ref={scrollAreaRef}>
                        <MessagesContent>
                            {messages?.map((message, index) => (
                                <ChatMessage key={index} metadata={message} />
                            ))}

                            {aiIsLoading && (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: 5,
                                        }}
                                    >
                                        <Skeleton width="80px" height={16} color="gray30" />
                                        <Skeleton width="100px" height={16} color="gray30" />
                                    </div>

                                    <Skeleton width="100%" height={80} color="gray30" />

                                    <div
                                        style={{
                                            display: "flex",
                                            gap: 5,
                                            marginTop: 5,
                                            alignItems: "center",
                                            height: 20,
                                        }}
                                    >
                                        <IconChangeContainer>
                                            <IconChangeAnimation>
                                                <AiLoadingIconContainer>
                                                    <RiBrainLine
                                                        size={12}
                                                        color={Theme.colors.gray60}
                                                    />
                                                </AiLoadingIconContainer>

                                                <AiLoadingIconContainer>
                                                    <RiChatAiLine
                                                        size={12}
                                                        color={Theme.colors.gray60}
                                                    />
                                                </AiLoadingIconContainer>

                                                <AiLoadingIconContainer>
                                                    <RiBarChartBoxAiLine
                                                        size={12}
                                                        color={Theme.colors.gray60}
                                                    />
                                                </AiLoadingIconContainer>

                                                <AiLoadingIconContainer>
                                                    <RiBrainLine
                                                        size={12}
                                                        color={Theme.colors.gray60}
                                                    />
                                                </AiLoadingIconContainer>

                                                <AiLoadingIconContainer>
                                                    <RiChatAiLine
                                                        size={12}
                                                        color={Theme.colors.gray60}
                                                    />
                                                </AiLoadingIconContainer>

                                                <AiLoadingIconContainer>
                                                    <RiBarChartBoxAiLine
                                                        size={12}
                                                        color={Theme.colors.gray60}
                                                    />
                                                </AiLoadingIconContainer>
                                            </IconChangeAnimation>
                                        </IconChangeContainer>

                                        <TypingAnimation>
                                            <Typography
                                                tag="p"
                                                fontSize={{ xs: "fs50" }}
                                                color="gray70"
                                                fontWeight="medium"
                                            >
                                                Obtendo respostas ...
                                            </Typography>
                                        </TypingAnimation>
                                    </div>
                                </div>
                            )}
                        </MessagesContent>
                    </ScrollArea>
                </StyledSplitterPanel>

                <StyledSplitterPanel min={120} max={300} defaultSize={120}>
                    <MessageInputContainer>
                        <InputContainer>
                            <FloatIconContainer>
                                <Menu>
                                    <Menu.Trigger>
                                        <Button
                                            variant="tertiary"
                                            onClick={() => refetch()}
                                            padding="2px"
                                        >
                                            <HiOutlinePaperClip
                                                size={12}
                                                color={Theme.colors.gray70}
                                            />
                                        </Button>
                                    </Menu.Trigger>

                                    <Menu.Content
                                        alignOffset={-5}
                                        sideOffset={10}
                                        align="start"
                                        side="top"
                                    >
                                        {documentDataBase
                                            ?.filter(item =>
                                                selectedAttachments.every(sel => sel.id !== item.id)
                                            )
                                            ?.map(dataItem => (
                                                <Menu.Item
                                                    key={dataItem.id}
                                                    text={dataItem.name}
                                                    onClick={() => handleSelectAttach(dataItem)}
                                                    iconPosition="left"
                                                    icon={DataBaseTypeIconMap[dataItem.type]}
                                                />
                                            ))}
                                    </Menu.Content>
                                </Menu>
                            </FloatIconContainer>

                            <FloatAttachContainer
                                ref={attachContainerRef}
                                onMouseDown={handleMouseDown}
                                onMouseLeave={handleMouseLeave}
                                onMouseUp={handleMouseUp}
                                onMouseMove={handleMouseMove}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 5,
                                        alignItems: "center",
                                        width: "fit-content",
                                    }}
                                >
                                    {selectedAttachments?.map(dataItem => (
                                        <AiChatAttachment
                                            key={dataItem.id}
                                            name={dataItem.name}
                                            type={dataItem.type}
                                            active={activeAttachId === dataItem.id}
                                            onClick={() => handleChangeAttachActive(dataItem.id)}
                                            onRemove={() => handleRemoveAttach(dataItem.id)}
                                        />
                                    ))}
                                </div>
                            </FloatAttachContainer>

                            <StyledTextArea
                                placeholder="Peça alterações para o FlexBot..."
                                value={chatMessage}
                                onChange={e => setChatMessage(e.target.value)}
                                maxLength={500}
                                onKeyDown={e => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />

                            <IconContainer>
                                <SendButton
                                    disabled={chatMessage.length <= 0}
                                    onClick={handleSendMessage}
                                >
                                    <MdSend
                                        size={12}
                                        color={
                                            chatMessage.length <= 0
                                                ? Theme.colors.gray70
                                                : Theme.colors.purple50
                                        }
                                    />
                                </SendButton>
                            </IconContainer>
                        </InputContainer>
                    </MessageInputContainer>
                </StyledSplitterPanel>
            </StyledSplitter>
        </Root>
    );
};
