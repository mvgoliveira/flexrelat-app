import { Typography } from "@/components/features/typography";
import { AiChange, Message } from "@/repositories/flexbotApi";
import { Theme } from "@/themes";
import { getElapsedTime } from "@/utils/date";
import { ReactElement } from "react";
import { MdAutoAwesome, MdPerson } from "react-icons/md";

import { ChatChanges } from "../chatChanges";
import { ChangesContainer, ProfileContainer, ProfilePicture, Root } from "./styles";

interface IChatMessageProps {
    metadata: Message;
    activeChange: AiChange | null;
    onUpdateActiveChange: (change: AiChange | null) => void;
}

export const ChatMessage = ({
    metadata,
    activeChange,
    onUpdateActiveChange,
}: IChatMessageProps): ReactElement => {
    return (
        <Root>
            <ProfileContainer
                style={{ flexDirection: metadata.sender_id !== "flexbot" ? "row-reverse" : "row" }}
            >
                {metadata.sender_id !== "flexbot" && (
                    <ProfilePicture>
                        <MdPerson size={12} color={Theme.colors.white} />
                    </ProfilePicture>
                )}

                {metadata.sender_id === "flexbot" && (
                    <MdAutoAwesome size={12} color={Theme.colors.black} />
                )}

                <Typography
                    tag="p"
                    fontSize={{ xs: "fs50" }}
                    color="gray100"
                    fontWeight="bold"
                    textAlign="center"
                >
                    {metadata.sender_id !== "flexbot" ? "Você" : "FlexBot"}
                </Typography>

                <Typography
                    tag="p"
                    fontSize={{ xs: "fs50" }}
                    color="gray70"
                    fontWeight="regular"
                    textAlign="center"
                >
                    {getElapsedTime(metadata.created_at)}
                </Typography>
            </ProfileContainer>

            <Typography
                tag="p"
                fontSize={{ xs: "fs50" }}
                color="gray100"
                fontWeight="medium"
                textAlign={metadata.sender_id !== "flexbot" ? "right" : "left"}
            >
                {metadata.text}
            </Typography>

            <ChangesContainer>
                {metadata.changes?.map(change => (
                    <ChatChanges
                        key={change.id}
                        metadata={change}
                        activeChange={activeChange}
                        onUpdateActiveChange={onUpdateActiveChange}
                    />
                ))}
            </ChangesContainer>
        </Root>
    );
};
