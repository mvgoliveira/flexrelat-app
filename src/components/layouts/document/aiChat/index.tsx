import { Button } from "@/components/features/button";
import { Typography } from "@/components/features/typography";
import { Message, ComponentChange } from "@/repositories/flexbotApi";
import { Theme } from "@/themes";
import { ReactElement, useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";

import { ChatMessage } from "../chatMessage";
import { ChangesHeader, ChangesNumberContainer, MessagesContent, Root } from "./styles";

export const AiChat = (): ReactElement => {
    const [changes, setChanges] = useState<ComponentChange[]>([
        {
            type: "add",
            elementId: "element1",
            text: "Adicionou um novo elemento",
            properties: { color: "blue", size: "large" },
            timestamp: new Date().toISOString(),
        },
        {
            type: "update",
            elementId: "element2",
            text: "Atualizou o texto do elemento",
            properties: { text: "Novo texto" },
            timestamp: new Date().toISOString(),
        },
        {
            type: "remove",
            elementId: "element3",
            text: "Removeu um elemento existente",
            timestamp: new Date().toISOString(),
        },
    ]);

    const [messages, setMessages] = useState<Message[]>([
        {
            text: "Gostaria de adicionar um novo elemento ao meu relatório.",
            timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
            sender: "user",
        },
        {
            text: "Claro! Que tipo de elemento você gostaria de adicionar?",
            timestamp: new Date(Date.now() - 19 * 60 * 1000).toISOString(),
            sender: "bot",
        },
    ]);

    return (
        <Root>
            <ChangesHeader>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <ChangesNumberContainer>
                        <Typography
                            tag="p"
                            fontSize={{ xs: "fs50" }}
                            color="black"
                            fontWeight="regular"
                        >
                            {changes.length}
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
            </ChangesHeader>

            <MessagesContent>
                {messages.map((message, index) => (
                    <ChatMessage key={index} metadata={message} />
                ))}
            </MessagesContent>
        </Root>
    );
};
