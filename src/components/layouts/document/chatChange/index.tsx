import { Typography } from "@/components/features/typography";
import { useDocumentContext } from "@/context/documentContext";
import { AiChange } from "@/repositories/changesAPI";
import { Theme } from "@/themes";
import { ReactElement } from "react";
import { MdDoneAll } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
    ColorContainer,
    Content,
    Root,
    StyledBadge,
    StyledCheckBox,
    StyledSmlButton,
} from "./styles";
import { CHANGES_BADGE_VARIANTS, CHANGES_TEXT_VARIANTS } from "./variants";

interface IChatChangeProps {
    metadata: AiChange;
}

export const ChatChange = ({ metadata }: IChatChangeProps): ReactElement => {
    const { updateSelectedChange, selectedChanges, approveChange, rejectChange } =
        useDocumentContext();

    const handleSelectChange = () => {
        if (metadata.status === "pending") {
            updateSelectedChange(metadata);
        }
    };

    return (
        <Root
            variant={metadata.type}
            active={selectedChanges.some(change => change.id === metadata.id)}
            onClick={handleSelectChange}
            status={metadata.status}
        >
            <ColorContainer variant={metadata.type} />

            <Content>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                            <StyledBadge variant={metadata.type}>
                                <Typography
                                    tag="p"
                                    fontSize={{ xs: "fs25" }}
                                    color={CHANGES_BADGE_VARIANTS[metadata.type].textColor}
                                    fontWeight="bold"
                                    textAlign="center"
                                >
                                    {CHANGES_TEXT_VARIANTS[metadata.type]}
                                </Typography>
                            </StyledBadge>

                            {metadata.status !== "pending" && (
                                <StyledBadge variant={metadata.status}>
                                    <Typography
                                        tag="p"
                                        fontSize={{ xs: "fs25" }}
                                        color={CHANGES_BADGE_VARIANTS[metadata.status].textColor}
                                        fontWeight="bold"
                                        textAlign="center"
                                    >
                                        {CHANGES_TEXT_VARIANTS[metadata.status]}
                                    </Typography>
                                </StyledBadge>
                            )}
                        </div>

                        <StyledCheckBox
                            variant={metadata.type}
                            active={selectedChanges.some(change => change.id === metadata.id)}
                            status={metadata.status}
                        />
                    </div>

                    <Typography
                        tag="p"
                        fontSize={{ xs: "fs75" }}
                        color="black"
                        fontWeight="medium"
                        textAlign="left"
                    >
                        {metadata.text}
                    </Typography>
                </div>

                {metadata.status !== "pending" && (
                    <div style={{ display: "flex", width: "100%", height: 5 }}></div>
                )}

                <div
                    style={{
                        display: metadata.status === "pending" ? "flex" : "none",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <StyledSmlButton
                        onClick={e => {
                            e.stopPropagation();
                            approveChange(metadata);
                        }}
                    >
                        <MdDoneAll size={14} color={Theme.colors.black} />
                    </StyledSmlButton>

                    <StyledSmlButton
                        onClick={e => {
                            e.stopPropagation();
                            rejectChange(metadata);
                        }}
                    >
                        <RiDeleteBin6Line size={12} color={Theme.colors.black} />
                    </StyledSmlButton>
                </div>
            </Content>
        </Root>
    );
};
