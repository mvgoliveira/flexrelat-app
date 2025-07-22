import { Button } from "@/components/features/button";
import { Spinner } from "@/components/features/loading/spinner";
import { Typography } from "@/components/features/typography";
import { ScrollArea } from "@/components/ui/scrollArea";
import { useDocumentContext } from "@/context/documentContext";
import { Theme } from "@/themes";
import { ReactElement } from "react";
import { MdCheck, MdClose, MdSend } from "react-icons/md";
import { TbRobotOff } from "react-icons/tb";

import { ChatMessage } from "../chatMessage";
import {
    ChangesHeader,
    ChangesNumberContainer,
    Fallback,
    IconContainer,
    InputContainer,
    MessageInputContainer,
    MessagesContent,
    Root,
} from "./styles";

export const AiChat = (): ReactElement => {
    const { messagesStatus, messages, changes } = useDocumentContext();

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

    return (
        <Root>
            <div>
                <ChangesHeader>
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
                            fontSize={{ xs: "fs50" }}
                            color="gray70"
                            fontWeight="regular"
                        >
                            Mudanças sem aprovação
                        </Typography>
                    </div>

                    {changes.filter(change => change.status === "pending").length > 0 && (
                        <div style={{ display: "flex", gap: 5 }}>
                            <Button height="30px" variant="secondary" padding="0 10px">
                                <MdCheck size={12} color={Theme.colors.black} />

                                <Typography
                                    tag="p"
                                    fontSize={{ xs: "fs50" }}
                                    color="gray100"
                                    fontWeight="regular"
                                    textAlign="center"
                                >
                                    Aprovar todos
                                </Typography>
                            </Button>

                            <Button height="30px" variant="secondary" padding="0 10px">
                                <MdClose size={12} color={Theme.colors.black} />

                                <Typography
                                    tag="p"
                                    fontSize={{ xs: "fs50" }}
                                    color="gray100"
                                    fontWeight="regular"
                                    textAlign="center"
                                >
                                    Descartar todos
                                </Typography>
                            </Button>
                        </div>
                    )}
                </ChangesHeader>
            </div>

            <ScrollArea>
                <MessagesContent>
                    {messages?.map((message, index) => (
                        <ChatMessage key={index} metadata={message} />
                    ))}
                </MessagesContent>
            </ScrollArea>

            <MessageInputContainer>
                <InputContainer>
                    <div style={{ display: "flex", width: "100%", height: "100%" }}></div>
                    <IconContainer>
                        <MdSend size={12} color={Theme.colors.gray70} />
                    </IconContainer>
                </InputContainer>
            </MessageInputContainer>
        </Root>
    );
};
