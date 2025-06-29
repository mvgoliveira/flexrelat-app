import { Typography } from "@/components/features/typography";
import { ComponentChange } from "@/repositories/flexbotApi";
import { Theme } from "@/themes";
import { getElapsedTime } from "@/utils/date";
import { ReactElement } from "react";
import { MdAutoAwesome, MdPerson } from "react-icons/md";

import { ProfileContainer, ProfilePicture, Root } from "./styles";

interface IChatMessageProps {
    metadata: {
        text: string;
        timestamp: string;
        sender: "user" | "bot";
        changes?: ComponentChange[];
    };
}

export const ChatMessage = ({ metadata }: IChatMessageProps): ReactElement => {
    return (
        <Root>
            <ProfileContainer
                style={{ flexDirection: metadata.sender === "user" ? "row-reverse" : "row" }}
            >
                {metadata.sender === "user" && (
                    <ProfilePicture>
                        <MdPerson size={12} color={Theme.colors.white} />
                    </ProfilePicture>
                )}

                {metadata.sender === "bot" && (
                    <MdAutoAwesome size={12} color={Theme.colors.black} />
                )}

                <Typography
                    tag="p"
                    fontSize={{ xs: "fs50" }}
                    color="gray100"
                    fontWeight="bold"
                    textAlign="center"
                >
                    {metadata.sender === "user" ? "Você" : "FlexBot"}
                </Typography>

                <Typography
                    tag="p"
                    fontSize={{ xs: "fs50" }}
                    color="gray70"
                    fontWeight="regular"
                    textAlign="center"
                >
                    {getElapsedTime(metadata.timestamp)}
                </Typography>
            </ProfileContainer>

            <Typography
                tag="p"
                fontSize={{ xs: "fs50" }}
                color="gray100"
                fontWeight="medium"
                textAlign={metadata.sender === "user" ? "right" : "left"}
            >
                {metadata.text}
            </Typography>
        </Root>
    );
};
