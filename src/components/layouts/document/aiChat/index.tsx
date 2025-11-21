import { Button } from "@/components/features/button";
import { Spinner } from "@/components/features/loading/spinner";
import { Skeleton } from "@/components/features/skeleton";
import { toastError } from "@/components/features/toast";
import { Typography } from "@/components/features/typography";
import { ModalClearMessages } from "@/components/layouts/modals/modalClearMessages";
import { ScrollArea } from "@/components/ui/scrollArea";
import { useDocumentContext } from "@/context/documentContext";
import { clearMessagesByRelatedId, sendMessage } from "@/repositories/messageAPI";
import { Theme } from "@/themes";
import { useElementSize } from "@mantine/hooks";
import { ReactElement, useRef, useState } from "react";
import { MdCheck, MdClose, MdDeleteOutline, MdSend } from "react-icons/md";
import { RiBarChartBoxAiLine, RiBrainLine, RiChatAiLine } from "react-icons/ri";
import { TbRobotOff } from "react-icons/tb";

import { ChatMessage } from "../chatMessage";
import {
    AiLoadingIconContainer,
    ChangesHeader,
    ChangesNumberContainer,
    Fallback,
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

    const [isClearModalOpen, setIsClearModalOpen] = useState<boolean>(false);

    const scrollAreaRef = useRef<HTMLDivElement>(null);

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
                    chatMessage.trim()
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

                <StyledSplitterPanel min={80} max={300} defaultSize={110}>
                    <MessageInputContainer>
                        <InputContainer>
                            <StyledTextArea
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
